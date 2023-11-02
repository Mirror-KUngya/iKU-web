import { useEffect } from "react";

const SpeechPage = () => {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      console.log(recognition);
      recognition.lang = "ko-KR"; // 한국어로 설정
      recognition.continuous = true; // 연속적인 음성 인식 활성화

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript;
            console.log("당신이 말한 것: ", text);
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("음성 인식 오류", event);
      };

      recognition.start();

      // 컴포넌트가 언마운트될 때 음성 인식을 중지
      return () => {
        recognition.stop();
      };
    } else {
      console.error(
        "이 브라우저에서는 SpeechRecognition API를 사용할 수 없습니다."
      );
    }
  }, []);
  return (
    <div>
      <p>왜왜</p>
    </div>
  );
};

export default SpeechPage;
