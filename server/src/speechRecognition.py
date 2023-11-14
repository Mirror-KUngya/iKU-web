from playsound import playsound
import speech_recognition as sr
import sys

# 음성 인식기와 마이크 설정
r = sr.Recognizer()
mic = sr.Microphone()

# 배경 소음에 대한 미세 조정을 위해 초기 2 초간 음성을 듣습니다.
with mic as source:
    r.adjust_for_ambient_noise(source, duration=2)

# 음성 인식 시작
print("Recognition Start", flush=True)
listening_for_activation = True  # '거울아'를 기다리는 상태
listening_for_function = True  # '거울아' 감지 후 명령을 기다리는 상태

keywords = [
    [
        "박수",
        "박수치기",
        "박수 치기",
        "박수 칠래",
        "박수치고 싶어",
        "손뼉",
        "clap",
        "박수 짝짝",
    ],
    ["웃기", "활짝 웃기", "스마일"],
    ["옆구리운동", "옆구리", "옆구리스트레칭", "옆구리 운동"],
    ["끝말잇기", "끝말잇기게임", "게임", "끝말"],
]

keyword_links = ["clap", "smile", "side", "wordChain"]

while True:
    with mic as source:
        try:
            print("Say Anything!", flush=True)  # 인식 시작

            audio = r.listen(source, phrase_time_limit=3)
            result = r.recognize_google(audio, language="ko-KR")

            print("In Progress...", flush=True)  # 처리 시작

            if listening_for_activation:
                if result.find("거울아") != -1:
                    print("Routing Start", result, flush=True)  # 제어(라우팅) 시작
                    playsound("voice/recognitionStart.mp3")
                    listening_for_activation = False  # '거울아'가 감지되었으므로 명령을 기다림
                else:
                    print(result, "is not call mirror", flush=True)
            else:
                print("In Progress...", flush=True)  # 처리 시작
                trimResult = result.strip()
                for i in range(0, 4):
                    if trimResult.find(keywords[i]):
                        print(
                            keyword_links[i],
                            "> is defined function, result: >",
                            trimResult,
                        )
                        listening_for_function = False
                        break
                if listening_for_function:
                    print(trimResult, "> is not defined function", flush=True)
                    playsound("voice/recognitionFail.mp3")
            if listening_for_function == False:
                break

        except sr.UnknownValueError:  # 음성 인식에 실패한 경우
            print("In Progress...", flush=True)  # 처리 시작
            print("do not recognize anyting", flush=True)

        except sr.RequestError:  # API 요청에 실패한 경우
            print("HTTP Request Error", flush=True)
            break

        except sr.WaitTimeoutError:  # 대기 시간 초과
            print("timeout", flush=True)

        except Exception as e:  # 기타 예외 처리
            print(f"An error occurred: {e}", flush=True)
            break

sys.exit()  # 프로그램 종료
