import React, { useEffect, useContext, useState } from "react";
import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const { activeSound, acapelaToken } = useContext(AcapelaContext);
  const [audio] = useState(new Audio());

  /* ---- Plays Acapela only in case sound is on and Emely message is exist ---- */
  useEffect(() => {
    if (activeSound && acapelaToken) {
      renderPlayer();
    }
  }, [message]);

  // const handleLoadMetadata = async (meta) => {
  //   const { duration } = meta.target;
  //   if (duration) {
  //     console.log("duration time", duration);
  //   }
  // };

  const renderPlayer = () => {
    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(message);
    const volume = "&volume=32768";
    /* ---- Collecting the url to get a Emely voice ---- */
    const url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${acapelaToken}`;

    console.log("runs", message, url);
    // audio.pause();
    // audio.currentTime = 0;

    // audio.load();
    // audio.src = url;
    // audio.play();

    return (
      // <div style={{ height: "60px", opacity: 0 }}>
      <div>
        {/* ---- Renders audio control only in case sound is on ---- */}
        {activeSound && (
          <audio
            controls="controls"
            autobuffer="autobuffer"
            autoPlay="autoplay"
            // onLoadedMetadata={handleLoadMetadata}
          >
            <source src={url} type="audio/wav" />
          </audio>
        )}
      </div>
    );
  };
  return <>{renderPlayer()}</>;
};

export default AcapelaPlayer;
