import React, { useEffect, useRef, useContext } from "react";
import Hashids from "hashids";
import Cookies from "js-cookie";

import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const {
    deleteAcapelaPlayer,
    setDeleteAcapelaPlayer,
    decodeTokenAcapela,
  } = useContext(AcapelaContext);
  const elementRef = useRef();
  
  /* ---- Plays Acapela only in case if Emely message is exist and acapela token known ---- */
  useEffect(() => {
    renderPlayer();
  }, [message]);

  // delete <audio></audio> if state is true (user pressed the mute btn or close the browser window)
  useEffect(() => {
    if (deleteAcapelaPlayer) {
      const divElement = elementRef.current;
      divElement.remove();
    }
    setDeleteAcapelaPlayer(false)
  }, [deleteAcapelaPlayer]);

  
  const renderPlayer = () => {
    const decodedToken = decodeTokenAcapela();

    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(message);
    const volume = "&volume=32768";
    /* ---- Collecting the url to get a Emely voice ---- */
    const url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${decodedToken}`;
    return (
      <div style={{ height: "60px" }}>
        <audio
          controls="controls"
          autobuffer="autobuffer"
          autoPlay="autoplay"
          ref={elementRef}
        >
          <source src={url} type="audio/wav" />
        </audio>
      </div>
    );
  };
  return <>{renderPlayer()}</>;
};

export default AcapelaPlayer;
