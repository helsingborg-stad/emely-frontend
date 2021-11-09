import React, { useState, useEffect } from "react";

const useLiveTextDisplaying = (text) => {
  const [message, setMessage] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [click, setClick] = useState(false)

  let timeout;
  useEffect(() => {
    const words = text.replace(/([ ]+)/g, "§").split("");
    setMessage(words);
  }, [text]);

  useEffect(() => {
    // Move on to the next message every `n` milliseconds

    if (message && messageIndex < message.length - 1) {
      timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 100);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [message, messageIndex]);

  useEffect(() => {
    /* ---- Stops timeout, renders the entire message ---- */
    function handleClick() {
      clearTimeout(timeout);
      setClick(true);
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const renderWords = () => {
    if (click) {
      return text;
    } 
    if (message && !click) {
      return message.map((word, index) => {
        if (index <= messageIndex) return word.replace(/([§]+)/g, " ");
      });
    }
  };

  return { renderWords, click };
};

export default useLiveTextDisplaying;
