import React, {useContext, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";

import {ConversationContext} from '../../contexts/ConversationContext';
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import ChatInput from '../../Components/ChatInput/ChatInput';


export default function EmelyChat() {
  const { botMessage, initConversation } = useContext(
    ConversationContext
  );

  useEffect(() => {
    initConversation();
  }, []);

  if(botMessage){
    console.log(botMessage);
  }
  return (
    <>
      <Container>
        <Row>
          <UserMenu />
        </Row>

        <div className="emely-chat_wrapper">
          <Row>
            <Col>
              <EmelyChatBubble />
            </Col>
          </Row>
          <Row>
            <Col>
              <UserChatBubble />
            </Col>
          </Row>
          <Row>
            <Col>
              <EmelyChatBubble />
            </Col>
          </Row>
          <Row>
            <Col>
              <UserChatBubble />
            </Col>
          </Row>
          
        </div>

        <ChatInput />
      </Container>
    </>
  );
}
