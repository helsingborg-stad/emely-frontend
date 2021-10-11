import { useState, useEffect } from "react";

// window js object, should be outside the function
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "sv-SV";

const useVoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [recordingNote, setRecordingNote] = useState("");

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      // get voices transcript
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setRecordingNote(transcript);
      // in error case
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  return {
    isListening,
    recordingNote,
    setIsListening,
    setRecordingNote,
  };
};

export default useVoiceToText;
