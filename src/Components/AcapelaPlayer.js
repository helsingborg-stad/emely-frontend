import React, { useEffect, useContext, useState } from "react";
import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const {  getVoiceUrl, acapelaUrl, activeSound } = useContext(AcapelaContext);

  /* ---- Plays Acapela only in case sound is on and Emely message is exist ---- */
  useEffect(() => {
    if (activeSound) {
      getVoiceUrl(message);
      renderPlayer();
    }
  }, [message, activeSound]);

  const renderPlayer = () => {
    return (
      <div style={{height: "60px", visibility: "hidden"}}>
        {/* ---- Renders audio control only in case sound is on ---- */}
        {activeSound && (
          <audio
            controls="controls"
            autobuffer="autobuffer"
            autoPlay="autoplay"
          >
            <source src={acapelaUrl} type="audio/wav" />
          </audio>
        )}
      </div>
    );
  };
  return <>{renderPlayer()}</>;
};

export default AcapelaPlayer;
