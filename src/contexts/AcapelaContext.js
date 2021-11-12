import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Hashids from "hashids";

export const AcapelaContext = createContext();

const AcapelaContextProvider = (props) => {
  const [deleteAcapelaPlayer, setDeleteAcapelaPlayer] = useState(false);
  const hashids = new Hashids();
  // logs in to acapela when render the first page, log out acapela when user close the window application
  useEffect(() => {
    console.log("login");
    loginAcapela();
  }, []);

  // logs out Acapela when a user closed the browser window
  useEffect(() => {
    window.addEventListener("beforeunload", logoutAcapela);
    // should return for avoid memory leak
    return () => window.removeEventListener("beforeunload", logoutAcapela);
  });

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
      // encode acapela token
      const encodeToken = hashids.encodeHex(`${result.token}`);
      // saves token in cookies
      Cookies.set("acapelaToken", encodeToken);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  /* ---- Logout Acapela ---- */
  const logoutAcapela = async () => {
    const decodedToken = decodeTokenAcapela();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ACAPELA_URL}/logout/`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${decodedToken}`,
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

  // gets and decodes the encoded token that was stored in the cookies
  const decodeTokenAcapela = () => {
    return hashids.decodeHex(Cookies.get("acapelaToken"));
  };
  const values = {
    loginAcapela,
    logoutAcapela,
    deleteAcapelaPlayer,
    setDeleteAcapelaPlayer,
    decodeTokenAcapela,
  };

  return (
    <AcapelaContext.Provider value={values}>
      {props.children}
    </AcapelaContext.Provider>
  );
};

export default AcapelaContextProvider;
