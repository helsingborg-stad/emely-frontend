import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { ConversationContext } from "../../contexts/ConversationContext";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from "../../Components/ChatInput/ChatInput";

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
    renderUserMessage();
  }, [showUserMessage]);

  useEffect(() => {
    renderBotMessage();
  }, [botMessage]);

  const renderUserMessage = () => {
    return (
      <Row>
        <Col>
          <UserChatBubble message={showUserMessage} />
        </Col>
      </Row>
    );
  };

  const renderBotMessage = () => {
    return (
      <Row>
        <Col>
          <EmelyChatBubble message={botMessage} />
        </Col>
      </Row>
    );
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
          {showUserMessage && renderUserMessage()}
          {botMessage && renderBotMessage()}
        </div>

        <ChatInput persona={persona} />
      </Container>
    </>
  );
}
