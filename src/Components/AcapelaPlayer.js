import React, { useEffect, useContext } from "react";
import {AcapelaContext} from '../contexts/AcapelaContext'

const AcapelaPlayer = ({message}) => {

const { playAcapela, acapelaUrl } = useContext(AcapelaContext);

  useEffect(() => {
    console.log('message from acapelaPlayer', message);
    playAcapela(message);
  }, [message]);

  return (
    <div>
      <audio controls="controls" autobuffer="autobuffer" autoPlay="autoplay">
        <source src={acapelaUrl} type="audio/wav" />
      </audio>
    </div>
  );
};

export default AcapelaPlayer;
