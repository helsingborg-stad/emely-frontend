import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";

import { ConversationContext } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from "../../Components/ChatInput/ChatInput";

export default function EmelyChat(props) {
  const [isFocused, setFocused] = useState(false);
  const [isValidationError, setValidationError] = useState(false);
  const { userDetails, currentUser, getUserDetails } = useAuth();
  // get :persona to send to the BE for conversation
  const { persona } = props.match.params;
  const scroll = useRef();
  const {
    currentJob,
    formatedTimestamp,
    firstBotMessage,
    initConversation,
    isLoading,
    sessionConversation,
    setSessionConersation,
  } = useContext(ConversationContext);

  //  gets a user ID and starts a conversation with Emely from the beginning every  first rendering
  useEffect(() => {
    getUserDetails(currentUser.uid);
    setSessionConersation([]);
  }, []);

  // runs when userDetails has been known
  useEffect(() => {
    if (userDetails) {
      initConversation(
        userDetails.username,
        currentJob,
        formatedTimestamp(),
        persona
      );
    }
  }, [userDetails]);

  useEffect(() => {
    renderMessages();
    scrollToTop();
  }, [sessionConversation, isValidationError]);

  const scrollToTop = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessages = () => {
    return sessionConversation.map((msg, i) => {
      if (i % 2 === 0) {
        return <UserChatBubble message={msg} key={i} />;
      } else {
        return <EmelyChatBubble message={msg} key={i} />;
      }
    });
  };

  return (
    <>
      <Container>
        <Row>
          <UserMenu />
        </Row>

        <div className="emely-chat_wrapper">
          <Row>
            <Col>
              <EmelyChatBubble message={firstBotMessage} />
            </Col>
          </Row>

          {sessionConversation.length > 0 && renderMessages()}
          {/* renders Emely loader (waiting for a response from the server )*/}

          {isLoading && (
            <EmelyChatBubble
              isLoading={isLoading}
              loader={<PulseLoader size={6} color={"#979797"} />}
            />
          )}
          {/* renders user loader (if textarea onFocus) */}
          {isFocused && (
            <UserChatBubble
              isFocused={isFocused}
              loader={<PulseLoader size={6} color={"#979797"} />}
            />
          )}
          {isValidationError && (
            <EmelyChatBubble
              isValidationError={isValidationError}
              loader={<PulseLoader size={6} color={"#979797"} />}
            />
          )}
        </div>
        <div ref={scroll}></div>
        <ChatInput
          persona={persona}
          setFocused={setFocused}
          isFocused={isFocused}
          setValidationError={setValidationError}
        />
      </Container>
    </>
  );
}
