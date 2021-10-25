import React, { useEffect, useContext, useState } from "react";
import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const { playAcapela, acapelaUrl, activeSound } = useContext(AcapelaContext);

  useEffect(() => {
    if (activeSound) {
      playAcapela(message);
      renderPlayer();
    }
  }, [message, activeSound]);

  const renderPlayer = () => {
    return (
      <div style={{height: "60px", visibility: "hidden"}}>
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
