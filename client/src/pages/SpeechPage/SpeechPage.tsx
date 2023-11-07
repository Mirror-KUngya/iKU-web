import { useState } from "react";

const SpeechPage = () => {
  const TextToSpeech = () => {
    const [text, setText] = useState("");

    const speak = () => {
      if (text !== "") {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      }
    };

    return (
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to read..."
        />
        <button onClick={speak}>Speak</button>
      </div>
    );
  };

  return <TextToSpeech />;
};

export default SpeechPage;
