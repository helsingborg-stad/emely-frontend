import React, { useState, useEffect, useContext } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { ConversationContext } from "../../contexts/ConversationContext";

export default function ChatInput({ persona }) {
  // states for layout
  const MEDIUM_WIDTH = 600;
  const [activeMicro, setActiveMicro] = useState(true);
  const [activeSound, setActiveSound] = useState(true);
  const [isRecording, setRecording] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const { currentWidth } = useWindowDimensions();
  // states && functions for interactive actions
  const { userMessage, setUserMessage, getContinueСonversation } = useContext(
    ConversationContext
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (userMessage.length > 0) {
      getContinueСonversation(persona, userMessage);
      setUserMessage("");
    }

  };

  return (
    <div className="chat-input-wrapper">
      <button
        className={
          isRecording
            ? "navigation_btn recording_btn_active"
            : "navigation_btn recording_btn"
        }
        onClick={() => setRecording(!isRecording)}
      >
        {isRecording ? <FaStop /> : <FaPlay />}
      </button>
      <div className="buttons-wrapper">
        <form
          onSubmit={(e) => handleClick(e)}
          className={isFocused ? "input-wrapper expand" : "input-wrapper"}
        >
          <input
            onChange={(e) => setUserMessage(e.target.value)}
            className="user-message_input"
            type="text"
            placeholder="Skriv meddelande"
            value={userMessage}
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
            isFocused && currentWidth.width < MEDIUM_WIDTH
              ? "hide"
              : "sound_btn navigation_btn"
          }
        >
          {activeSound ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}
        </button>

        <button
          onClick={() => setActiveMicro(!activeMicro)}
          className={
            isFocused && currentWidth.width < MEDIUM_WIDTH
              ? "hide"
              : "microphone_btn navigation_btn"
          }
        >
          {activeMicro ? <BiMicrophone /> : <BiMicrophoneOff />}
        </button>
      </div>
    </div>
  );
}
