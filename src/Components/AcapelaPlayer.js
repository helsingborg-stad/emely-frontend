import React, { useEffect, useRef, useContext } from "react";
import Cookies from "js-cookie";

import { ConversationContext } from "../contexts/ConversationContext";
import { AcapelaContext } from "../contexts/AcapelaContext";

const AcapelaPlayer = ({ message }) => {
  const acapelaToken = Cookies.get("acapelaToken");
  const {
    deleteAcapelaPlayer,
    setDeleteAcapelaPlayer,
    decodeTokenAcapela,
  } = useContext(AcapelaContext);
  const elementRef = useRef();

  const { currentSpeed, setCurrentSpeed } = useContext(ConversationContext);

  /* ---- Plays Acapela only in case if Emely message is exist and acapela token known ---- */
  useEffect(() => {
    if (acapelaToken) {
      renderPlayer();
    }
  }, [message]);

  // delete <audio></audio> if state is true (user pressed the mute btn or close the browser window)
  useEffect(() => {
    if (deleteAcapelaPlayer) {
      const divElement = elementRef.current;
      divElement.remove();
    }
    setDeleteAcapelaPlayer(false);
  }, [deleteAcapelaPlayer]);

  const renderPlayer = () => {
    const decodedToken = decodeTokenAcapela();

    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(message);
    const volume = "&volume=32768";
    const speed = "&speed=" + currentSpeed;
    /* ---- Collecting the url to get a Emely voice ---- */
    const url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${speed}${volume}&token=${decodedToken}`;
    return (
      <div style={{ height: "60px", opacity: "0" }}>
        <audio
          controls="controls"
          autobuffer="autobuffer"
          autoPlay="autoplay"
          ref={elementRef}
        >
          <source src={acapelaToken ? url : ""} type="audio/wav" />
        </audio>
      </div>
    );
  };
  return <>{renderPlayer()}</>;
};

export default AcapelaPlayer;
