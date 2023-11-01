import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import { Container, Result } from "./styles";

const VoiceRecognition = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true });
    };
    startListening();
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [resetTranscript]);

  return (
    <Container>
      <Result>{transcript}</Result>
    </Container>
  );
};

export default VoiceRecognition;
