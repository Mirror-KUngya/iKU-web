import { Container, Title } from "./styles";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useEffect } from "react";
import React from "react";

const MainPage = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true });
    };
    startListening();

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);
  const userName = "미러쿵야";

  return (
    <Container>
      <Title>{userName}님, 좋은 하루 입니다!</Title>
      <p>{transcript}</p>
    </Container>
  );
};

export default MainPage;
