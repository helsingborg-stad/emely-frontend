import axios from "axios";
import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
  // state for Emely first message
  const [firstBotMessage, setFirstBotMessage] = useState(null);
  // state for occupational buttons
  const [jobButtons, setJobButtons] = useState(null);
  // chosen occupation by user
  const [currentJob, setCurrentJob] = useState(null)

  const initConversation = async (userName, job = null, date, persona) => {
    try {
      // send post request to local server
      const response = await axios.post(
        "http://localhost:3001/api/v1/conversation/init",
        {
          name: `${userName}`,
          job: `${job}`,
          created_at: `${date}`,
          persona: `${persona}`,
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
      setFirstBotMessage(result.message);
    } catch (err) {
      console.log("Error: ", err);
      return false;
    }
  };

  const getContinueСonversation = async () => {
     try {
       // send post request to local server
       const response = await axios.post(
         "http://localhost:3001/api/v1/conversation/itervju",
         {
           message: "This is a test message you can change",
           conversation_id: "__CHANGE_ME__",
           response_time: -1,
           created_at: "1999-04-07 18:59:24.584658",
           recording_used: false,
           lang: "sv",
           password: "KYgZfDG6P34H56WJM996CKKcNG4",
         }
       );
       const result = await response.data;
       setFirstBotMessage(result.message);
     } catch (err) {
       console.log("Error: ", err);
       return false;
     }
  }

  const getButtons = async () => {
    try {
      // send post request to local server
      const response = await axios.get(
        "http://localhost:3001/api/v1/conversation/joblist"
      );

      const result = await response.data;
      setJobButtons(result);
    } catch (err) {
      console.log("Error: ", err);
      return false;
    }
  };

   const formatedTimestamp = () => {
     const d = new Date();
     const date = d.toISOString().split("T")[0];
     const time = d.toTimeString().split(" ")[0];
     return `${date} ${time}`;
   };

  const values = {
    initConversation,
    firstBotMessage,
    getButtons,
    jobButtons,
    setCurrentJob,
    currentJob,
    formatedTimestamp,
  };

  return (
    <ConversationContext.Provider value={values}>
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
