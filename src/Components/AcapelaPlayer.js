import React, { useEffect } from "react";
import Hashids from "hashids";
import Cookies from "js-cookie";

const AcapelaPlayer = ({ message }) => {
  const hashids = new Hashids();
  /* ---- Plays Acapela only in case if Emely message is exist and acapela token known ---- */
  useEffect(() => {
      renderPlayer();
  }, [message]);

  const renderPlayer = () => {
    // gets the encoded token that was stored in the cookies
    const acapelaToken = Cookies.get("acapelaToken");
    // decodes this token
    const decodeToken = hashids.decodeHex(acapelaToken);

    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(message);
    const volume = "&volume=32768";
    /* ---- Collecting the url to get a Emely voice ---- */
    const url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${decodeToken}`;

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
