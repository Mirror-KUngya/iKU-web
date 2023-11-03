from flask import Flask, render_template
import speech_recognition as sr

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/voice")
def voice():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Say something:")
        audio = r.listen(source)
    try:
        text = r.recognize_google(audio, language="ko-KR")
        return render_template("result.html", result=text)
    except sr.UnknownValueError:
        return "Could not understand audio"
    except sr.RequestError as e:
        return "Could not request results; {0}".format(e)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
