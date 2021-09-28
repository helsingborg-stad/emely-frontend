import React, { useState } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

export default function ChatInput() {
  const [activeMicro, setActiveMicro] = useState(true);
  const [activeSound, setActiveSound] = useState(true);

  return (
    <div className="chat-input-wrapper">
      <div className="btn_wrapper">
        <button
          onClick={() => setActiveSound(!activeSound)}
          className="sound_btn navigation_btn"
        >
          {activeSound ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}
        </button>
        <button
          onClick={() => setActiveMicro(!activeMicro)}
          className="microphone_btn navigation_btn"
        >
          {activeMicro ? <BiMicrophone /> : <BiMicrophoneOff />}
        </button>
      </div>

      <div className="input-wrapper">
        <input
          className="user-message_input"
          type="text"
          placeholder="Skriv ditt meddelande"
        ></input>
        <button className="send_message_btn">
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
