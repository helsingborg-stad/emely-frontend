import React, { useEffect, useContext, useState } from "react";
import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const { playAcapela, acapelaUrl, activeSound } = useContext(AcapelaContext);

  
  useEffect(() => {
    playAcapela(message);
  }, [message, activeSound]);

  return (
    <div>
      <audio controls="controls" autobuffer="autobuffer" autoPlay="autoplay">
        <source src={acapelaUrl} type="audio/wav" />
      </audio>
    </div>
  );
};

export default AcapelaPlayer;
