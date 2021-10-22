import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AcapelaContext = createContext();

const AcapelaContextProvider = (props) => {
  const [acapelaToken, setAcapelaToken] = useState(null);
  const [acapelaUrl, setAcapelaUrl] = useState(null);

  const [activeSound, setActiveSound] = useState(true);

  useEffect(() => {
    loginAcapela();
  }, []);

  const loginAcapela = async () => {
    const email = process.env.REACT_APP_ACAPELA_EMAIL;
    const password = process.env.REACT_APP_ACAPELA_PASSWORD;

    try {
      // send post request to local server
      const response = await axios.post(
        `${process.env.REACT_APP_ACAPELA_URL}/login/`,
        {
          email: email,
          password: password,
        }
      );
      const result = await response.data;
      setAcapelaToken(result.token);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getVoiceUrl = async (stringToSay) => {
    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(stringToSay);
    // const src_type = "audio/wav";
    const volume = "&volume=32768";

    let url;
    if (activeSound) {
      url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${acapelaToken}`;
    } else {
      console.log("muted");
      url =
        "https://github.com/anars/blank-audio/blob/master/250-milliseconds-of-silence.mp3?raw=true";
    }
    setAcapelaUrl(url);
  };

  const logoutAcapela = async () => {
    try {
      // send post request to local server
      const response = await axios.get(
        `${process.env.REACT_APP_ACAPELA_URL}/logout/`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${acapelaToken}`,
          },
        }
      );
      const result = await response.data;
      console.log("logout acapela", result.success);
      setAcapelaToken(null);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handelSound = (e) => {
    e.preventDefault();
    setActiveSound(!activeSound);
    if (activeSound) {
      logoutAcapela();
    } else {
      loginAcapela();
    }
  };

  const values = {
    playAcapela: getVoiceUrl,
    loginAcapela,
    acapelaUrl,
    logoutAcapela,
    handelSound,
    activeSound,
  };

  return (
    <AcapelaContext.Provider value={values}>
      {props.children}
    </AcapelaContext.Provider>
  );
};

export default AcapelaContextProvider;
