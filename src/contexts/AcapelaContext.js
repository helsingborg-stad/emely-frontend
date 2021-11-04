import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AcapelaContext = createContext();

const AcapelaContextProvider = (props) => {
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
      Cookies.set("acapelaToken", `${result.token}`);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  /* ---- Logout Acapela ---- */
  const logoutAcapela = async () => {
    const acapelaToken = Cookies.get("acapelaToken");
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
      Cookies.remove("acapelaToken");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const values = {
    loginAcapela,
    logoutAcapela,
  };

  return (
    <AcapelaContext.Provider value={values}>
      {props.children}
    </AcapelaContext.Provider>
  );
};

export default AcapelaContextProvider;
