import React from 'react'
import UserMenu from '../../Components/UserMenu/UserMenu';
import ChatBubble from '../../Components/EmelyChatBubble/EmelyChatBubble';
import { Container, Row, Col } from 'react-bootstrap';

export default function EmelyChat() {
    return (
        <>
        <Container id="container-emely-chat">
        <Row>
            <UserMenu />
        </Row>
        <Row>
            <Col id="emely-chat-col">
                <ChatBubble />
            </Col>
        </Row>
        <Row className="p-0 mb-5">
            <Col className="text-center mt-5">
            </Col>
        </Row>
    </Container>
        </>
    )
}
