import React, { useState, useEffect } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

import useWindowDimensions from '../../customHooks/useWindowDimensions'

export default function ChatInput() {
  const MEDIUM_WIDTH = 600;

  const [activeMicro, setActiveMicro] = useState(true);
  const [activeSound, setActiveSound] = useState(true);
  const [isRecording, setRecording] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const { currentWidth } = useWindowDimensions();

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
