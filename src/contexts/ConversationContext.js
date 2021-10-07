import axios from "axios";
import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
  const [botMessage, setBotMessage] = useState(null);

  const initConversation = async () => {
    try {
      // send post request to local server
      const response = await axios.post(
        "http://localhost:3001/api/v1/conversation/init",
        {
          name: "test",
          job: "test",
          created_at: "1999-04-07 18:59:24.584658",
          persona: "fika",
          development_testing: true,
          webapp_local: true,
          webapp_url: "swaggerdocs",
          webapp_version: "NA",
          brain_url: "NA",
          lang: "sv",
          password: "KYgZfDG6P34H56WJM996CKKcNG4",
          user_ip_number: "127.0.0.1",
        }
      );
      const result = await response.data;
      setBotMessage(result.message);
    } catch (err) {
      console.log("error from BE", err);
      return false;
    }
  };

  const values = {
    initConversation,
    botMessage,
  };
  return (
    <ConversationContext.Provider value={values}>
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
