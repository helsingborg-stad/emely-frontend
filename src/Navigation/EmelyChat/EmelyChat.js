import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { ConversationContext } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from "../../Components/ChatInput/ChatInput";
import { render } from "@testing-library/react";

export default function EmelyChat(props) {
  const { currentUser } = useAuth();
  // get :persona to send to the BE for conversation
  const { persona } = props.match.params;

  const {
    currentJob,
    formatedTimestamp,
    firstBotMessage,
    initConversation,
    botMessage,
    userMessage,
    showUserMessage,
  } = useContext(ConversationContext);

  useEffect(() => {
    initConversation(
      currentUser.displayName,
      currentJob,
      formatedTimestamp(),
      persona
    );
  }, []);

  useEffect(() => {
    renderMessages();
  },[showUserMessage, botMessage]);

  
  const renderMessages = () => {
    let messages = [];

    for (let i = 0, userIdx = 0, botIdx = 0; i < showUserMessage.length + botMessage.length; i++) {
      if (i % 2 == 0) {// Odd or even to decide the message type
        // User message
        if (userIdx < showUserMessage.length) {
          messages.push(
            <UserChatBubble message={showUserMessage[userIdx++]} key={i} />
          );
        }
      } else {
        // Bot message
        if (botIdx < botMessage.length) {
          messages.push(<EmelyChatBubble message={botMessage[botIdx++]} key={i} />);
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

        <ChatInput persona={persona} />
      </Container>
    </>
  );
}
