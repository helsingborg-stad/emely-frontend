import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

import { ConversationContext } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from "../../Components/ChatInput/ChatInput";
import ErrorBoundary from "../../Components/ErrorBoundary";

export default function EmelyChat(props) {
  const [isFocused, setFocused] = useState(false);
  const [isValidationError, setValidationError] = useState(false);
  const { currentUser, userDetails } = useAuth();

  // get :persona from router-dom (intervju or fika)
  const { persona } = props.match.params;
  const scroll = useRef();
  
  const {
    currentJob,
    formatedTimestamp,
    initConversation,
    isLoading,
    sessionConversation,
    setSessionConersation,
  } = useContext(ConversationContext);

  /* ---- Gets a user ID and starts a conversation with Emely from the beginning every  first rendering ---- */
  useEffect(() => {
    setSessionConersation([]);
  }, []);

  /* ---- Runs when userDetails has been known ---- */
  useEffect(() => {
    try {
      if (currentUser) {
        initConversation(
         userDetails ? userDetails.username : "Gäst",
          currentJob,
          formatedTimestamp(),
          persona
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [userDetails, currentUser]);

  /* ---- Tracks and renders new messages, scrolls them up ---- */
  useEffect(() => {
    renderMessages();
    scrollToTop();
  }, [sessionConversation, isValidationError]);

  const scrollToTop = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessages = () => {
    return sessionConversation.map((msg, i) => {
      if (msg.type === "user") {
        return <UserChatBubble message={msg.text} key={i} />;
      } else {
        return (
          <EmelyChatBubble
            message={msg.text}
            key={i}
          />
        );
      }
    });
  };

  return (
    <>
      <Container className="emely-chat-container">
        <div className="emely-chat_wrapper">
          {sessionConversation.length > 0 && renderMessages()}

          {/* ---- Renders Emely loader (waiting for a response from the server ) ---- */}
          {isLoading && (
            <EmelyChatBubble
              isLoading={isLoading}
              loader={<PulseLoader size={6} color={"#979797"} />}
            />
          )}

          {/* ---- Renders user loader (if textarea onFocus) ---- */}
          {isFocused && (
            <UserChatBubble
              isFocused={isFocused}
              loader={<PulseLoader size={6} color={"#979797"} />}
            />
          )}
          {/* ---- Renders Emely warning massage if user message contains a special signs or is empty */}
          {isValidationError && (
            <EmelyChatBubble
              isValidationError={isValidationError}
              loader={<PulseLoader size={6} color={"#979797"} />}
              
            />
          )}
        </div>
        <div ref={scroll}></div>
        <ErrorBoundary>
          <ChatInput
            persona={persona}
            setFocused={setFocused}
            setValidationError={setValidationError}
          />
        </ErrorBoundary>
      </Container>
    </>
  );
}
