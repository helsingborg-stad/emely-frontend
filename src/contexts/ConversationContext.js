import axios from "axios";
import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
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

  /* ---- Gets first message from BE ---- */
  const initConversation = async (
    userName = "Gäst",
    job = null,
    date = formatedTimestamp(),
    persona
  ) => {
    setError(false);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/init`,
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
      setSessionConersation([{ text: result.message, type: "emely" }]);
    } catch (err) {
      console.log("Error: ", err);
      setSessionConersation((prevState) => [
        ...prevState,
        {
          text:
            "Ojoj, mitt stackars huvud... Jag tror jag har bivit sjuk och måste gå till vårdcentralen. Vi får prata en annan dag. Hejdå!",
          type: "emely",
        },
      ]);
      setError(true);
      return false;
    }
  };

  /* ---- Continue conversation ---- */
  const getContinueСonversation = async (
    endpoint,
    userMessage,
    id = conversationId,
    date = formatedTimestamp()
  ) => {
    setIsLoading(true);
    // saves user's message
    setSessionConersation((prevState) => [
      ...prevState,
      { text: userMessage, type: "user" },
    ]);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
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
      setSessionConersation((prevState) => [
        ...prevState,
        { text: result.message, type: "emely" },
      ]);
    } catch (err) {
      console.log("Error: ", err);
      setSessionConersation((prevState) => [
        ...prevState,
        {
          text:
            "Ojoj, mitt stackars huvud... Jag tror jag har bivit sjuk och måste gå till vårdcentralen. Vi får prata en annan dag. Hejdå!",
          type: "emely",
        },
      ]);
      setError(true);
      setIsLoading(false);
      return false;
    }
    setUserMessage("");
    setIsLoading(false);
  };

  /* ---- Gets all occupation buttons ---- */
  const getButtons = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/joblist`
      );
      const result = await response.data;

      setJobButtons(result);
    } catch (err) {
      console.log("Error: ", err);
      return false;
    }
  };

  /* ---- Converts  the date into the Timestamp for saving in the BE ---- */
  const formatedTimestamp = () => {
    const d = new Date();
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const values = {
    initConversation,
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
