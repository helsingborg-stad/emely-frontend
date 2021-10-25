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
import TextareaAutosize from "react-textarea-autosize";
import { AcapelaContext } from "../../contexts/AcapelaContext";

export default function ChatInput({
  persona,
  setFocused,
  isFocused,
  setValidationError,
}) {
  // states for layout
  const MEDIUM_WIDTH = 800;
  const [activeMicro, setActiveMicro] = useState(true);

  const { currentWidth } = useWindowDimensions();
  // states && functions for interactive actions with BE
  const {
    userMessage,
    setUserMessage,
    getContinueСonversation,
    isLoading,
    isError,
  } = useContext(ConversationContext);

  const { handelSound, activeSound } = useContext(AcapelaContext);

  // states && functions for translating voice to text
  const {
    isListening,
    recordingNote,
    setIsListening,
    setRecordingNote,
    isBrowserSupportsSpeechApi,
  } = useVoiceToText();

  /* ---- Send user message to BE ----*/
  const handleSendClick = (e) => {
    e.preventDefault();
    // don't allow clicking send btn if  the recording is in progress
    if (!isListening) {
      // simple validation
      if (
        userMessage.trim().length > 0 &&
        userMessage.trim().match(/^[^><#@*&«»{}]+$/)
      ) {
        getContinueСonversation(persona, userMessage);
        setValidationError(false);
      } else {
        // if user's message contains "< > @ # « » & * {} " symbols
        setValidationError(true);
        console.log("failed validation", userMessage);
      }
      setUserMessage("");
      setFocused(false);
    }
  };

  /* ---- Sets the recordings button active ----*/
  const handleClickRecordingBtn = (e) => {
    e.preventDefault();
    // set input onFocus
    setFocused((prevState) => !prevState);
    setIsListening((prevState) => !prevState);
    // overwriting userMessage if recording button works
    setUserMessage(recordingNote);

    setRecordingNote("");
  };

  /* ---- Sends user's message by clicking "enter" key-button ----*/
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendClick(e);
    }
  };

  return (
    <div className="chat-input-wrapper">
      {/* ---- Class "chat-input_overlay" blokes all buttons and input fields if is loading or error on the page ---- */}
      <div className={isLoading || isError ? "chat-input_overlay" : ""}></div>
      <div className="container chat-input_container-wrapper">
        {/* ---- Recording button, hides in all browsers except Chrome ----- */}
        {isBrowserSupportsSpeechApi && activeMicro && (
          <button
            className={
              isListening
                ? "navigation_btn recording_btn_active"
                : "navigation_btn recording_btn"
            }
            onClick={(e) => handleClickRecordingBtn(e)}
          >
            {isListening ? (
              <FaStop size={"2rem"} />
            ) : (
              <FaPlay className="faPlay-icon" size={"2rem"} />
            )}
          </button>
        )}

        {/* ---- Input filed ---- */}
        <div className="buttons-wrapper">
          <form
            onSubmit={(e) => handleSendClick(e)}
            className={isFocused ? "input-wrapper expand" : "input-wrapper"}
            onFocus={() => {
              setFocused(true);
              setValidationError(false);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          >
            <TextareaAutosize
              onChange={(e) => {
                setUserMessage(e.target.value);
              }}
              className="user-message_input"
              type="text"
              minRows={1}
              maxRows={3}
              placeholder={isLoading ? "" : "Skriv meddelande"}
              value={isListening ? recordingNote : userMessage}
              onKeyDown={(e) => handleKeyDown(e)}
            ></TextareaAutosize>
            <button disabled={isLoading} className="send_message_btn">
              <IoIosSend size={"1.5rem"} />
            </button>
          </form>

          {/* ---- Sound button ---- */}
          <button
            onClick={(e) => handelSound(e)}
            className={
              isFocused && currentWidth.width < MEDIUM_WIDTH
                ? "hide"
                : "sound_btn navigation_btn"
            }
          >
            {activeSound ? (
              <IoMdVolumeHigh size={"2rem"} />
            ) : (
              <IoMdVolumeOff size={"2rem"} />
            )}
          </button>

          {/* ---- Microphone button, hides in all browsers except Chrome ---- */}
          {isBrowserSupportsSpeechApi && (
            <button
              onClick={() => setActiveMicro(!activeMicro)}
              className={
                isFocused && currentWidth.width < MEDIUM_WIDTH
                  ? "hide"
                  : "microphone_btn navigation_btn"
              }
            >
              {activeMicro ? (
                <BiMicrophone size={"2rem"} />
              ) : (
                <BiMicrophoneOff size={"2rem"} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
