from playsound import playsound
from korean_word_relay import WordRelay
import speech_recognition as sr
import sys
import random
import time

start_words = [
    "사과",
    "과일",
    "바나나",
    "강아지",
    "고양이",
    "오이",
    "냉장고",
    "원숭이",
    "복숭아",
    "수박",
    "포도",
    "양말",
    "치약",
    "김치",
    "고기",
    "아기",
    "국수",
]

num = random.randint(0, len(start_words) - 1)

suggestion = start_words[num]
print("suggestion >" + suggestion, flush=True)

word_relay = WordRelay(import_default=False, words_path="data/korean_words.txt")

playsound("voice/wordChain_start.mp3")

# 음성 인식기와 마이크 설정
r = sr.Recognizer()
mic = sr.Microphone()

# 배경 소음에 대한 미세 조정을 위해 초기 2 초간 음성을 듣습니다.
with mic as source:
    r.adjust_for_ambient_noise(source, duration=2)

# 음성 인식 시작
print("Recognition Start", flush=True)

count = 0

print("count >" + str(count), flush=True)

start_time = time.time()  # 프로그램 시작 시간
while count < 3:
    current_time = time.time()  # 현재 시간
    if (current_time - start_time) > 60:  # 60초 초과 확인
        print("mission failed", flush=True)
        playsound("voice/mission_fail.mp3")
        sys.exit()  # 프로그램 종료

    with mic as source:
        try:
            audio = r.listen(source, phrase_time_limit=3)
            answer = r.recognize_google(audio, language="ko-KR")

            print("result" + answer, flush=True)

            is_continue = word_relay.check_continue(suggestion, answer)
            if is_continue:
                print("answer >" + answer, flush=True)
                count += 1
                print("count >" + str(count), flush=True)
                if count <= 2:
                    suggestion = word_relay.get_next(answer)
                    print("suggestion >" + suggestion, flush=True)

                    playsound("voice/wordChain_correct.mp3")

                continue
            else:
                playsound("voice/wordChain_fail.mp3")

        except sr.UnknownValueError:  # 음성 인식에 실패한 경우
            print("do not recognize anyting", flush=True)

        except sr.RequestError:  # API 요청에 실패한 경우
            print("HTTP Request Error", flush=True)
            break

        except sr.WaitTimeoutError:  # 대기 시간 초과
            print("timeout", flush=True)

        except Exception as e:  # 이어갈 단어가 없을 경우
            print(e, flush=True)
            print("no word , mission success", flush=True)
            break

print("mission success", flush=True)

playsound("voice/wordChain_success.mp3")
sys.exit()  # 프로그램 종료
