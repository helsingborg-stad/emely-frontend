import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

import { ConversationContext } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from "../../Components/ChatInput/ChatInput";
import ErrorBoundary from "../../Components/ErrorBoundary";
import AcapelaPlayer from "../../Components/AcapelaPlayer";

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
    isEmelyMessage,
    initConversation,
    isLoading,
    sessionConversation,
    setSessionConersation,
  } = useContext(ConversationContext);

  /* ---- Gets a user ID and starts a conversation with Emely from the beginning every  first rendering ---- */
  useEffect(() => {
    setSessionConersation([]);
    // setEmelyMessage,(null);
  }, []);

  /* ---- Runs when userDetails has been known ---- */
  useEffect(() => {
    try {
      if (currentUser) {
        initConversation(
          userDetails.username,
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
    renderVoice();
  }, [sessionConversation, isValidationError]);

  // useEffect(() => {

  //   console.log("run useEffect", isEmelyMessage);
  // }, []);

  const scrollToTop = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessages = () => {
    return sessionConversation.map((msg, i) => {
      if (msg.type === "user") {
        return <UserChatBubble message={msg.text} key={i} />;
      } else {
        return <EmelyChatBubble message={msg.text} key={i} />;
      }
    });
  };

  const renderVoice = () => {
    console.log(
      sessionConversation,
      sessionConversation.length,
      typeof sessionConversation
    );
    if (sessionConversation.length > 0) {
      const lastMessage = sessionConversation
        .filter((message) => message.type === "emely")
        .reverse()
        .find((message) => message.type === "emely");

      if (lastMessage) {
        console.log(lastMessage);
        return <AcapelaPlayer message={lastMessage.text} />;
      }
    }
  };

  return (
    <>
      <Container className="emely-chat-container">
        <div style={{ height: "60px", border: "1px solid red" }}>
          {sessionConversation.length > 0 && renderVoice()}
        </div>

        <div className="emely-chat_wrapper">
          {/* <Row>
            <Col>
              <EmelyChatBubble message={firstBotMessage} />
            </Col>
          </Row> */}

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
            isFocused={isFocused}
            setValidationError={setValidationError}
          />
        </ErrorBoundary>
      </Container>
    </>
  );
}
