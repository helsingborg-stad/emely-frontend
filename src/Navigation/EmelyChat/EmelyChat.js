import React from "react";
import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyChatBubble from "../../Components/EmelyChatBubble/EmelyChatBubble";
import UserChatBubble from "../../Components/UserChatBubble/UserChatBubble";
import { Container, Row, Col } from "react-bootstrap";

export default function EmelyChat() {
  return (
    <>
      <Container id="container-emely-chat">
        <Row>
          <UserMenu />
        </Row>
        <Row>
          <Col id="emely-chat-col">
            <EmelyChatBubble />
          </Col>
        </Row>
        <Row className="p-0 mb-5">
          <Col className="text-center mt-5">
            <UserChatBubble />
          </Col>
        </Row>
        <Row>
          <Col id="emely-chat-col">
            <EmelyChatBubble />
          </Col>
        </Row>
        <Row className="p-0 mb-5">
          <Col className="text-center mt-5">
            <UserChatBubble />
          </Col>
        </Row>
      </Container>
    </>
  );
}
