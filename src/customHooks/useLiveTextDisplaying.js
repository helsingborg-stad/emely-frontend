import React, { useState, useEffect } from "react";


const useLiveTextDisplaying = (message) => {
  console.log(message);

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    console.log("run");
    // Move on to the next message every `n` milliseconds
    let timeout;
    if (message && messageIndex < message.length - 1) {
      timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 100);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [message, messageIndex]);

  const renderWords = () => {
    console.log(message);
    if (message) {
      return message.map((word, index) => {
        if (index <= messageIndex) return word.replace(/([§]+)/g, " ");
      });
    }
  };
  return { renderWords };
};

export default useLiveTextDisplaying;
