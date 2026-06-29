import React, { useState } from "react";

const VoiceInput = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      onVoiceResult(transcript);

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <button
      onClick={startListening}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
    >
      {isListening ? "🎙 Listening..." : "🎤 Speak"}
    </button>
  );
};

export default VoiceInput;