import React, { useEffect, useContext } from "react";
import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const { acapelaToken } = useContext(AcapelaContext);

  /* ---- Plays Acapela only in case if Emely message is exist and acapela token known ---- */
  useEffect(() => {
    if (acapelaToken) {
      renderPlayer();
    }
  }, [message]);

  const renderPlayer = () => {
    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(message);
    const volume = "&volume=32768";
    /* ---- Collecting the url to get a Emely voice ---- */
    const url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${acapelaToken}`;

    return (
      <div style={{ height: "60px", opacity: 0 }}>
          <audio
            id="player"
            controls="controls"
            autobuffer="autobuffer"
            autoPlay="autoplay"
          >
            <source src={url} type="audio/wav" />
          </audio>
        
      </div>
    );
  };
  return <>{renderPlayer()}</>;
};

export default AcapelaPlayer;
