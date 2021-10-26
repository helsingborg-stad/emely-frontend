import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AcapelaContext = createContext();

const AcapelaContextProvider = (props) => {
  const [acapelaToken, setAcapelaToken] = useState(null);
  const [activeSound, setActiveSound] = useState(true);

  useEffect(() => {
    loginAcapela();
  }, []);

  /* ---- Login Acapela ---- */
  const loginAcapela = async () => {
    const email = process.env.REACT_APP_ACAPELA_EMAIL;
    const password = process.env.REACT_APP_ACAPELA_PASSWORD;

    try {
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

  /* Logout Acapela */
  const logoutAcapela = async () => {
    try {
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

  /* ---- Logout  Acapela if the sound button is off ---- */
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
    loginAcapela,
    logoutAcapela,
    handelSound,
    activeSound,
    acapelaToken,
  };

  return (
    <AcapelaContext.Provider value={values}>
      {props.children}
    </AcapelaContext.Provider>
  );
};

export default AcapelaContextProvider;
