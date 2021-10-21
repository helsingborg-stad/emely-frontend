import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AcapelaContext = createContext();

const AcapelaContextProvider = (props) => {
  const [acapelaToken, setAcapelaToken] = useState(null);
  const [acapelaUrl, setAcapelaUrl] = useState(null);

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

  const playAcapela = async (stringToSay) => {
    console.log("acapela speech", stringToSay);
    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(stringToSay);
    // const src_type = "audio/wav";
    const volume = "&volume=32768";

    const url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${acapelaToken}`;
    setAcapelaUrl(url);
  };
  const values = {
    playAcapela,
    acapelaUrl,
  };

  return (
    <AcapelaContext.Provider value={values}>
      {props.children}
    </AcapelaContext.Provider>
  );
};

export default AcapelaContextProvider;
