import React, { useState, useContext } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

import useWindowDimensions from "../../customHooks/useWindowDimensions";
import useVoiceToText from "../../customHooks/useVoiceToText";
import { ConversationContext } from "../../contexts/ConversationContext";

export default function ChatInput({ persona }) {
  // states for layout
  const MEDIUM_WIDTH = 800;
  const [activeMicro, setActiveMicro] = useState(true);
  const [activeSound, setActiveSound] = useState(true);
  const [isFocused, setFocused] = useState(false);
  const { currentWidth } = useWindowDimensions();
  // states && functions for interactive actions with BE
  const {
    userMessage,
    setUserMessage,
    getContinueСonversation,
    isLoading,
  } = useContext(ConversationContext);

  // states && functions for translating voice to text
  const {
    isListening,
    recordingNote,
    setIsListening,
    setRecordingNote,
  } = useVoiceToText();

  // send user message to BE
  const handleSendClick = (e) => {
    e.preventDefault();
    if (userMessage.trim().length > 0) {
      getContinueСonversation(persona, userMessage);
      setUserMessage("");
      setFocused(false)
    }
  };

  // sets the recordings button active
  const handleClickRecordingBtn = (e) => {
    e.preventDefault();
    setUserMessage("");
    // set input onFocus
    setFocused(true);
    setUserMessage(recordingNote);
    console.log("recordingNote", recordingNote);
    setIsListening((prevState) => !prevState);
  };
  return (
    <div className="chat-input-wrapper">
      <div className={isLoading ? "chat-input_overlay" : ""}></div>
      <div className="container chat-input_container-wrapper">
        <button
          className={
            isListening
              ? "navigation_btn recording_btn_active"
              : "navigation_btn recording_btn"
          }
          onClick={(e) => handleClickRecordingBtn(e)}
        >
          {isListening ? <FaStop /> : <FaPlay className="faPlay-icon" />}
        </button>
        <div className="buttons-wrapper">
          <form
            onSubmit={(e) => handleSendClick(e)}
            className={isFocused ? "input-wrapper expand" : "input-wrapper"}
          >
            <input
              onChange={(e) => {
                setUserMessage(e.target.value);
              }}
              className="user-message_input"
              type="text"
              placeholder={isLoading ? "" : "Skriv meddelande"}
              value={isLoading ? "" : userMessage}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            ></input>
            <button disabled={isLoading} className="send_message_btn">
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
    </div>
  );
}
