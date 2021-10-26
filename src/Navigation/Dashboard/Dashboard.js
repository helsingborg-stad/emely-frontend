import React, {useEffect, useState} from 'react';
import PersonaButton from '../../Components/PersonaButton/PersonaButton';
import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { FiBriefcase } from 'react-icons/fi';
import { FiCoffee } from 'react-icons/fi';

/* Variable declaration */
export default function Dashboard() {
	const { userDetails } = useAuth();
  const [, setCount] = useState(0);

useEffect(() => {
  setCount(c => c + 1)
}, [])

	return (
    <>
      <Container id="dashboard-card" className="p-0">
        <Row className="my-5 align-items-center  justify-content-center button_container">
        <Row>
          <Col id="emely-dialogue-col" className="p-0">
            <EmelyDialogue className="">
              <p className="m-3 p-3 emely-dialog_dialogue-text">
                Hej {userDetails && userDetails.username}! <br/>Jag heter Emely. Jag är en virtuell språkassistent och
                med mig kan du öva att prata på svenska. Välj nedan vilken av
                mina personligheter du önskar att prata med.
              </p>
            </EmelyDialogue>
          </Col>
        </Row>
          <Col xs={12} md={6} className="text-center mt-3">
            <PersonaButton
              linkTo={"/work-emely"}
              name={"SÖKA JOBB-ASSISTENT"}
              persona="intervju"
            >
              <FiBriefcase size={20} />
            </PersonaButton>
          </Col>
          <Col xs={12} md={6} className="mt-3">
            <PersonaButton
              linkTo={"/emely-chat/fika"}
              name={"FIKA KOMPIS"}
              persona="fika"
            >
              <FiCoffee size={20} />
            </PersonaButton>
          </Col>
        </Row>
      </Container>
    </>
  );
}
