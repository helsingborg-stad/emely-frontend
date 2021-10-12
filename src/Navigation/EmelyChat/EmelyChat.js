import React, { useContext, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { ConversationContext } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from "../../Components/ChatInput/ChatInput";

export default function EmelyChat(props) {
  let messages = [];
  const { userDetails, currentUser, getUserDetails } = useAuth();
  // get :persona to send to the BE for conversation
  const { persona } = props.match.params;
  const scroll = useRef();
  const {
    currentJob,
    formatedTimestamp,
    firstBotMessage,
    initConversation,
    botMessage,
    showUserMessage,
  } = useContext(ConversationContext);

  useEffect(() => {
    getUserDetails(currentUser.uid);
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
  }, [showUserMessage, botMessage]);


  const scrollToTop = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };



  const renderMessages = () => {
    

    for (
      let i = 0, userIdx = 0, botIdx = 0;
      i < showUserMessage.length + botMessage.length;
      i++
    ) {
      if (i % 2 === 0) {
        // Odd or even to decide the message type
        // User message
        if (userIdx < showUserMessage.length) {
          messages.push(
            <UserChatBubble message={showUserMessage[userIdx++]} key={i} />
          );
        }
      } else {
        // Bot message
        if (botIdx < botMessage.length) {
          messages.push(
            <EmelyChatBubble
              message={botMessage[botIdx++]}
              key={i}
              scroll={scroll}
            />
          );
        }
      }
    }
    return messages;
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
              {firstBotMessage ? (
                <EmelyChatBubble message={firstBotMessage} />
              ) : (
                <p>loading...</p>
              )}
            </Col>
          </Row>

          {showUserMessage.length > 0 && renderMessages()}
         
        </div>
        <div ref={scroll}></div>
        <ChatInput persona={persona} />
      </Container>
    </>
  );
}
