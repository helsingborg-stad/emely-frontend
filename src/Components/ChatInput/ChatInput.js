import React, { useState, useContext, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { BiMicrophone } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaStop } from "react-icons/fa";

import { ConversationContext } from "../../contexts/ConversationContext";
import TextareaAutosize from "react-textarea-autosize";
import { AcapelaContext } from "../../contexts/AcapelaContext";

export default function ChatInput({
  persona,
  setFocused,
  isFocused,
  setValidationError,
}) {
  // state to turn on/of the sound
  const [activeSound, setActiveSound] = useState(true);

  // states && functions for interactive actions with BE
  const {
    userMessage,
    setUserMessage,
    getContinueСonversation,
    isLoading,
    isError,
  } = useContext(ConversationContext);

  // function for connecting/disconnecting Acapela
  const { loginAcapela, logoutAcapela } = useContext(AcapelaContext);

  // states && functions for translating voice to text
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "sv-SV",
      });
      console.log(transcript);
    } else {
      SpeechRecognition.stopListening();
    }
    // overwriting userMessage if recording button works
    setUserMessage(transcript);
    resetTranscript();
  }, [isListening]);

  //! get element for removing it when sound is off
  const player = document.getElementById("player");

  /* ---- Send user message to BE ----*/
  const handleSendClick = (e) => {
    e.preventDefault();
    // remove the current audio control (by ID) so that the voice tracks do not overlap
    if (player) {
      player.remove();
    }
    // don't allow clicking send btn if  the recording is in progress
    if (!listening) {
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

  /* ---- Sends user's message by clicking "enter" key-button ----*/
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendClick(e);
    }
  };

  /* ---- Logout  Acapela if the sound button is off ---- */
  const handelSound = (e) => {
    e.preventDefault();
    setActiveSound(!activeSound);
    if (activeSound) {
      logoutAcapela();
      // remove element by id if sound is off
      if (player) {
        player.remove();
      }
    } else {
      loginAcapela();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    console.log("Browser doesn't support speech recognition.");
  }

  return (
    <div className="chat-input-wrapper">
      {/* ---- Class "chat-input_overlay" blokes all buttons and input fields if is loading or error on the page ---- */}
      <div className={isLoading || isError ? "chat-input_overlay" : ""}></div>
      <div className="container chat-input_container-wrapper">
        {/* ---- Input filed ---- */}
        <div className="buttons-wrapper">
          <form
            onSubmit={(e) => handleSendClick(e)}
            className={"input-wrapper"}
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
              value={listening ? transcript : userMessage}
              onKeyDown={(e) => handleKeyDown(e)}
              disabled={isLoading}
            ></TextareaAutosize>
            <button type="submit" className="send_message_btn">
              <IoIosSend size={"1.5rem"} />
            </button>
          </form>

          {/* ---- Sound button ---- */}
          <button
            onClick={(e) => handelSound(e)}
            className={"sound_btn navigation_btn"}
          >
            {activeSound ? (
              <IoMdVolumeHigh size={"2rem"} />
            ) : (
              <IoMdVolumeOff size={"2rem"} />
            )}
          </button>
        </div>
        {/* ---- Recording button, hides in all browsers except Chrome ----- */}
        {browserSupportsSpeechRecognition && (
          <div>
            <button
              className={
                isListening
                  ? "navigation_btn recording_btn_active"
                  : "navigation_btn recording_btn"
              }
              onClick={() => {
                setIsListening((prevState) => !prevState);
              }}
            >
              {listening ? (
                <FaStop size={"2rem"} />
              ) : (
                <BiMicrophone size={"2rem"} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
