import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import UserMenu from "../../Components/UserMenu/UserMenu";
import EmelyDialogue from "../../Components/EmelyDialogue/EmelyDialogue";
import WorkButton from "../../Components/WorkButton/WorkButton";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { ConversationContext } from "../../contexts/ConversationContext";

export default function WorkEmely(props) {
 const MEDIUM_WIDTH = 768;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { currentWidth } = useWindowDimensions();

  const { getButtons, jobButtons } = useContext(ConversationContext);


  useEffect(() => {
    getButtons();
  }, []);

  return (
    <>
      <Container id="container-work-emely">

        <Row
          className={
            isDropdownOpen && currentWidth.width < MEDIUM_WIDTH
              ? "hide-emely-dialog"
              : "show-emely-dialog"
          }
        >
          <EmelyDialogue className="m-0">
            <p className="m-3 p-3 emely-dialog_dialogue-text">
              Jag har arbetat med att intervjua folk för jobb i ungefär ett
              halvår. Eftersom att jag är nybörjare på detta blir jag nervös
              ibland och glömmer vad jag tidigare har sagt. Det är inte ditt fel
              om jag råkar glömma något.
              <br />
              <br />
              Vilket arbete söker du?
            </p>
          </EmelyDialogue>
        </Row>
        <Row className="p-0 mb-5">
          <Col className="text-center mt-5">
            {jobButtons ? (
              <WorkButton
                setDropdownOpen={setDropdownOpen}
                isDropdownOpen={isDropdownOpen}
                occupation={jobButtons}
              ></WorkButton>
            ) : (
              <p>loading...</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
