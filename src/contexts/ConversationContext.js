import axios from "axios";
import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
  // state for Emely's first init message
  const [firstBotMessage, setFirstBotMessage] = useState(null);
  // state for  Emely's follow-up messages
  const [botMessage, setBotMessage] = useState([]);
  // state for user's message (invokes in onChange case)
  const [userMessage, setUserMessage] = useState("");
  //  state for show user message
  const [showUserMessage, setShowUserMessage] = useState([]);
  // state for conversation id
  const [conversationId, setConversationId] = useState(null);
  // state for occupational buttons
  const [jobButtons, setJobButtons] = useState(null);
  // chosen occupation by user
  const [currentJob, setCurrentJob] = useState(null);
  // to determine the loading for disabling the "send" button when the request is pending
  const [isLoading, setIsLoading] = useState(false);

  const initConversation = async (
    userName,
    job = null,
    date = formatedTimestamp(),
    persona
  ) => {
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
      setConversationId(result.conversation_id);
      setFirstBotMessage(result.message);
    } catch (err) {
      console.log("Error: ", err);
      setFirstBotMessage(
        "***this is Emely response in case of error: _CHANGE ME_*****"
      );
      return false;
    }
  };

  const getContinueСonversation = async (
    endpoint,
    userMessage,
    id = conversationId,
    date = formatedTimestamp()
  ) => {
    setIsLoading(true);
    setShowUserMessage((prevState) => [...prevState, userMessage]);

    try {
      // send post request to local server
      const response = await axios.post(
        `http://localhost:3001/api/v1/conversation/${endpoint}`,
        {
          message: `${userMessage}`,
          conversation_id: `${id}`,
          response_time: -1,
          created_at: `${date}`,
          recording_used: false,
          lang: "sv",
          password: "KYgZfDG6P34H56WJM996CKKcNG4",
        }
      );
      const result = await response.data;
      setBotMessage((prevState) => [...prevState, result.message]);
    } catch (err) {
      console.log("Error: ", err);
      setBotMessage(
        "***this is Emely response in case of error: _CHANGE ME_*****"
      );
      return false;
    }
    setUserMessage("");
    setIsLoading(false);
  };

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
    getContinueСonversation,
    botMessage,
    userMessage,
    setUserMessage,
    showUserMessage,
    isLoading,
  };

  return (
    <ConversationContext.Provider value={values}>
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
