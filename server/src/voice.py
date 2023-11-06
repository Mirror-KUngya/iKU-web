import speech_recognition as sr

r = sr.Recognizer()
mic = sr.Microphone()

with mic as source:
    r.adjust_for_ambient_noise(source)

while True:
    with mic as source:
        print("Speak now")
        audio = r.listen(source, timeout=2, phrase_time_limit=2)

    try:
        result = r.recognize_google(audio, language="ko-KR")
        print("인식된 결과:", result)
        if result == "거울아":
            print("음성인식을 시작합니다.")
    except sr.UnknownValueError:
        print("음성 인식 실패")
    except sr.RequestError:
        print("HTTP Request Error 발생")
    except sr.WaitTimeoutError:
        print("WaitTimeout Error 발생")
    except Exception as e:
        print(f"An error occurred: {e}")
