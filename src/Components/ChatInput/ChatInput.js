import React, { useState, useEffect } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

export default function ChatInput() {
  const [activeMicro, setActiveMicro] = useState(true);
  const [activeSound, setActiveSound] = useState(true);
  const [isFocused, setFocused] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(getWindowDimensions());

  //   get the current browser width
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return { width };
  }

  // recalculates the width on every render
  useEffect(() => {
    function handleResize() {
      setCurrentWidth(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    // should return for avoid memory leak
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="chat-input-wrapper">
      <button
        onClick={() => setActiveMicro(!activeMicro)}
        className="microphone_btn navigation_btn"
      >
        {activeMicro ? <BiMicrophone /> : <BiMicrophoneOff />}
      </button>

      <div className="buttons-wrapper">
        <form className={isFocused ? "input-wrapper expand" : "input-wrapper"}>
          <input
            className="user-message_input"
            type="text"
            placeholder="Skriv meddelande"
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          ></input>
          <button className="send_message_btn">
            <IoIosSend />
          </button>
        </form>

        <button
          onClick={() => setActiveSound(!activeSound)}
          className={
            isFocused && currentWidth.width < 600
              ? "hide"
              : "sound_btn navigation_btn"
          }
        >
          {activeSound ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}
        </button>
      </div>
    </div>
  );
}
