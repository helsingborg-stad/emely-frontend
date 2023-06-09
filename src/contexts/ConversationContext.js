import axios from "axios";
import React, { createContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
  const { currentUser, useHuggingFace, userDetails } = useAuth();
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

  const [currentProgress, setCurrentProgress] = useState(null);

  /* --- Emely Settings --- */
  const [emelySlower, setEmelySlower] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(100);
  const [hasExperience, setHasExperience] = useState(true);
  const [smallTalk, setSmallTalk] = useState(true);

  /* ---- Gets first message from BE ---- */
  const initConversation = async (
    userName,
    job,
    date = formatedTimestamp(),
    persona
  ) => {
    setError(false);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/init`,
        {
          brain_url: null,
          created_at: `${date}`,
          development_testing: process.env.REACT_APP_DEV_TESTING,
          lang: "sv",
          name: `${userName}`,
          persona: `${persona}`,
          user_ip_number: "127.0.0.1",
          webapp_local: true,
          webapp_url: null,
          webapp_version: null,
          job: `${job}`,
          has_experience: hasExperience,
          enable_small_talk: smallTalk,
          user_id: currentUser.uid,
          use_huggingface: useHuggingFace,
          customer: userDetails.customer,
        }
      );
      const result = await response.data;
      setConversationId(result.conversation_id);
      setSessionConersation([{ text: result.text, type: "emely", conversation_id: conversationId}]);
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
	recordingUsed,
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
          text: `${userMessage}`,
          conversation_id: `${id}`,
          response_time: -1,
          created_at: `${date}`,
          recording_used: recordingUsed,
          lang: "sv",
        }
      );
      const result = await response.data;
      // saves Emely's message
      setCurrentProgress(result.progress * 100);
      setConversationId(result.conversation_id);
      setSessionConersation((prevState) => [
        ...prevState,
        { text: result.text, type: "emely", conversation_id: result.conversation_id },
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

    /* ---- Get all user-conversations  ---- */
    async function getUserConversations() {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user_conversations?user_id=${currentUser.uid}`
        ).then((response) => {
          downloadTextFile(response.data.user_conversations)
          
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log("Error fetching conversations")
        });
        
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    /* ---- Download all conversations into a zip file  ---- */
    const downloadTextFile = (allConversations) => {
      try {
        var zip = new JSZip();
  
  
        const textFileId = Math.floor(Math.random() * 1000000) + 100000;
        zip.file(`my-conversations-${textFileId}.txt`, allConversations);
  
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          // see FileSaver.js
          saveAs(content, `my-conversations-${textFileId}.zip`);
        }); 
  
      } catch (error) {
        console.log(error.message);
      }
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
    setCurrentProgress,
    currentProgress,
    emelySlower,
    setEmelySlower,
    currentSpeed,
    setCurrentSpeed,
    hasExperience,
    setHasExperience,
    smallTalk,
    setSmallTalk,
    getUserConversations,
  };

  return (
    <ConversationContext.Provider value={values}>
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
