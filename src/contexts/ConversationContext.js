import axios from "axios";
import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
  // state for Emely's first init message
  const [firstBotMessage, setFirstBotMessage] = useState(null);
  // saves Emely's and user's messages
  const [sessionConversation, setSessionConersation] = useState([]);
  // state for user's message (invokes in onChange case)
  const [userMessage, setUserMessage] = useState("");
  // state for conversation id
  const [conversationId, setConversationId] = useState(null);
  // state for occupational buttons
  const [jobButtons, setJobButtons] = useState(null);
  // chosen occupation by user
  const [currentJob, setCurrentJob] = useState(null);
  // to determine the loading for disabling the "send" button when the request is pending
  const [isLoading, setIsLoading] = useState(false);
  // disable "send" button in error case
  const [isError, setError] = useState(false);

  const initConversation = async (
    userName,
    job = null,
    date = formatedTimestamp(),
    persona
  ) => {
    setError(false);
    try {
      // send post request to local server
      const response = await axios.post(
        "https://emely-chat-service-api-staging-ef5bmjer3q-ey.a.run.app/init",
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
          user_ip_number: "127.0.0.1",
        }
      );
      const result = await response.data;
      setConversationId(result.conversation_id);
      setFirstBotMessage(result.message);
    } catch (err) {
      console.log("Error: ", err);
      setFirstBotMessage(
        "Ojoj, mitt stackars huvud... Jag tror jag har bivit sjuk och måste gå till vårdcentralen. Vi får prata en annan dag. Hejdå!"
      );
      setError(true);
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
    // saves user's message
    setSessionConersation((prevState) => [...prevState, userMessage]);
    try {
      // send post request to local server
      const response = await axios.post(
        `https://emely-chat-service-api-staging-ef5bmjer3q-ey.a.run.app/${endpoint}`,
        {
          message: `${userMessage}`,
          conversation_id: `${id}`,
          response_time: -1,
          created_at: `${date}`,
          recording_used: false,
          lang: "sv",
        }
      );
      const result = await response.data;
      // saves Emely's message
      setSessionConersation((prevState) => [...prevState, result.message]);
    } catch (err) {
      console.log("Error: ", err);
      setSessionConersation((prevState) => [
        ...prevState,
        "Ojoj, mitt stackars huvud... Jag tror jag har bivit sjuk och måste gå till vårdcentralen. Vi får prata en annan dag. Hejdå!",
      ]);
      setError(true);
      setIsLoading(false);
      return false;
    }
    setUserMessage("");
    setIsLoading(false);
  };

  const getButtons = async () => {
    try {
      // send post request to local server
      const response = await axios.get(
        "https://emely-chat-service-api-staging-ef5bmjer3q-ey.a.run.app/joblist"
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
    userMessage,
    setUserMessage,
    isLoading,
    sessionConversation,
    setSessionConersation,
    isError,
  };

  return (
    <ConversationContext.Provider value={values}>
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
