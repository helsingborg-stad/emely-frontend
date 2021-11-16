import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import EmelyDialogue from "../../Components/EmelyDialogue/EmelyDialogue";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { FiBriefcase } from "react-icons/fi";
import { FiCoffee } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { ConversationContext } from '../../contexts/ConversationContext';


import useLiveTextDisplaying from "../../customHooks/useLiveTextDisplaying";

/* Variable declaration */
export default function Dashboard() {
  const { userDetails } = useAuth();
  const { currentProgress, setCurrentProgress } =
  useContext(ConversationContext);

  const { renderWords, click, ref, jobbRef } = useLiveTextDisplaying(
    `Hej ${
      userDetails && userDetails.username ? userDetails.username : ""
    }! Jag heter Emely. Jag är en virtuell språkassistent och med mig kan du öva att prata på svenska. Välj nedan vilken av mina personligheter du önskar att prata med.`
  );

  useEffect(() => {
    renderWords();
  }, [click]);

  useEffect(() => {
		/* Reset current progress on new chat */

      setCurrentProgress(0);

	}, []);

  let history = useHistory();

  const handleLink = (linkTo) => {
    history.push(linkTo);
  };

  return (
    <>
      <Container id="dashboard-card" className="p-0">
        <Row className="my-5 align-items-center  justify-content-center button_container">
          <Row>
            <Col id="emely-dialogue-col" className="p-0">
              <EmelyDialogue className="">
                {/* ---  Text output with animation  --- */}
                {
                  <p className="m-3 p-3 emely-dialog_dialogue-text">
                    {renderWords()}
                  </p>
                }
              </EmelyDialogue>
            </Col>
          </Row>

          {/* --- Work Emely persona-button --- */}
          <Col xs={12} md={6} className="text-center mt-3">
            <Button
              className="register-btn w-100 clickBtn"
              type="button"
              onClick={() => handleLink("/work-emely")}
              ref={jobbRef}
            >
              <FiBriefcase size={20} />
              <span className="px-3">SÖKA JOBB-ASSISTENT</span>
            </Button>
          </Col>

          {/* --- Fika kompis persona-button --- */}
          <Col xs={12} md={6} className="mt-3">
            <Button
              className="register-btn w-100 clickBtn"
              type="button"
              onClick={() => handleLink("/emely-chat/fika")}
              ref={ref}
            >
              <FiCoffee size={20} />
              <span className="px-3">FIKA KOMPIS</span>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
