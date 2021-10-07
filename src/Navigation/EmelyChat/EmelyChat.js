import React, {useContext, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";

import {ConversationContext} from '../../contexts/ConversationContext';
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from '../../Components/ChatInput/ChatInput';


export default function EmelyChat(props) {
  const { currentUser } = useAuth();
  // get :persona to send to the BE for conversation
  const {persona} = props.match.params

  const {
    currentJob,
    formatedTimestamp,
    firstBotMessage,
    initConversation,
    botMessage,
    userMessage,
  } = useContext(ConversationContext);

  useEffect(() => {
    initConversation(
      currentUser.displayName,
      currentJob,
      formatedTimestamp(),
      persona
    );
  }, []);

  
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
          <Row>
            <Col>
              <UserChatBubble message={userMessage} />
            </Col>
          </Row>
        </div>

        <ChatInput persona={persona} />
      </Container>
    </>
  );
}
