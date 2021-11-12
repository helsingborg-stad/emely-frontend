import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import EmelyDialogue from "../../Components/EmelyDialogue/EmelyDialogue";
import WorkButton from "../../Components/WorkButton/WorkButton";
import PulseLoader from "react-spinners/PulseLoader";
import { ConversationContext } from "../../contexts/ConversationContext";
import useLiveTextDisplaying from "../../customHooks/useLiveTextDisplaying";

export default function WorkEmely(props) {
  const { getButtons, jobButtons } = useContext(ConversationContext);
  const { renderWords, click, ref } = useLiveTextDisplaying(
    `Jag har arbetat med att intervjua folk för jobb i ungefär ett halvår. Eftersom att jag är nybörjare på detta blir jag nervös ibland och glömmer vad jag tidigare har sagt. Det är inte ditt fel om jag råkar glömma något. Vilket arbete söker du?`
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getButtons();
  }, []);

  useEffect(() => {
    renderWords();
  }, [click]);

  return (
    <>
      <Container id="container-work-emely">
        <Modal
          scrollable={true}
          className="work-button-modal"
          size="md"
          show={show}
          onHide={handleClose}
        >
          <Modal.Body>
            {jobButtons ? (
              <WorkButton occupation={jobButtons}></WorkButton>
            ) : (
              <PulseLoader size={12} color={"gray"} />
            )}
          </Modal.Body>
        </Modal>

        <EmelyDialogue className="m-0">
          {
            <p className="m-3 p-3 emely-dialog_dialogue-text">
              {renderWords()}
            </p>
          }
        </EmelyDialogue>

        <Row className="p-0 mb-5">
          <Col className="text-center mt-5">
            <Button
              variant="none"
              className="w-100 register-btn clickBtn"
              id="edit-button"
              onClick={handleShow}
              ref={ref}
            >
              Välj yrke
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
