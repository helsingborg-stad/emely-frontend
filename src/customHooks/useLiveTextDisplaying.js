import React, { useState, useEffect, useRef } from "react";

const useLiveTextDisplaying = (text) => {
  const [message, setMessage] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [click, setClick] = useState(false);

  const ref = useRef();
  const jobbRef = useRef();

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
    function handleClick(e) {
      // stopps the timeout, provided that the click was not made on the buttons
      if (
        ref.current !== e.target.closest(".clickBtn") &&
        jobbRef.current !== e.target.closest(".clickBtn")
      ) {
        clearTimeout(timeout);
        setClick(true);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", (e) => handleClick(e));
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", (e) => handleClick(e));
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

  return { renderWords, click, ref, jobbRef };
};

export default useLiveTextDisplaying;
