from gtts import gTTS
from playsound import playsound


def text_to_speech(text, lang="ko"):
    tts = gTTS(text=text, lang=lang)
    filename = "wordChain_success.mp3"
    tts.save(filename)
    playsound(filename)


# 사용 예시
text_to_speech("축축하합니다. 끝말잇기 미션에 성공하셨습니다.")
