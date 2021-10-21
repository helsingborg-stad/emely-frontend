import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AcapelaContext = createContext();

const AcapelaContextProvider = (props) => {
  // todo delete variables
  const [test, setTest] = useState("text from Acapela Context");
  const [acapelaToken, setAcapelaToken] = useState(null);

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
    const voice = "?voice=Mia22k_HQ";
    const output = "&output=stream";
    const type = "&type=mp3";
    const text = encodeURIComponent(stringToSay);
    const src_type = "audio/wav";
    // const src_type = "mp3";
    const volume = "&volume=32768";

    console.log(stringToSay);
    let url = `
       ${process.env.REACT_APP_ACAPELA_URL}/command/${voice}&text=${text}${output}${type}${volume}&token=${acapelaToken}`;
    try {
      var output2 =
        '<audio controls="controls" autobuffer="autobuffer" autoplay="autoplay"><source src="' +
        url +'" type="' +src_type +'" /></audio>';
        document.getElementById("player").innerHTML = output2;
    } catch (err) {
      console.log("Error: ", err);
      return false;
    }
  };
  const values = {
    playAcapela,
  };

  return (
    <AcapelaContext.Provider value={values}>
      {props.children}
    </AcapelaContext.Provider>
  );
};

export default AcapelaContextProvider;
