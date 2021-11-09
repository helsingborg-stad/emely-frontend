import React, { useState, useEffect } from "react";

const useLiveTextDisplaying = (text) => {
  const [message, setMessage] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const words = text.replace(/([ ]+)/g, "§").split("");
    setMessage(words);
  }, [text]);

  useEffect(() => {
  
    // Move on to the next message every `n` milliseconds
    let timeout;
    if (message && messageIndex < message.length - 1) {
      timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 60);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [message, messageIndex]);

  const renderWords = () => {
    if (message) {
      return message.map((word, index) => {
        if (index <= messageIndex) return word.replace(/([§]+)/g, " ");
      });
    }
  };
  return { renderWords };
};

export default useLiveTextDisplaying;
