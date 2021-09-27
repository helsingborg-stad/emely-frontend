import React from 'react';
import UserMenu from '../../Components/UserMenu/UserMenu';
import PersonaButton from '../../Components/PersonaButton/PersonaButton';
import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { FiBriefcase } from 'react-icons/fi';
import { FiCoffee } from 'react-icons/fi';

/* Variable declaration */
export default function Dashboard() {
	const { currentUser } = useAuth();
	return (
		<>
			<Container id="dashboard-card">
				<Row>
					<UserMenu />
				</Row>
				<Row>
					<Col id="emely-dialogue-col" className="">
						<EmelyDialogue className="m-0">
							<p className="m-3 p-3" id="dialogue-text">
								Hej <b>{currentUser.email}</b>! Jag heter Emely. Jag är en
								virtuell språkassistent och med mig kan du öva att prata på
								svenska. Välj nedan vilken av mina personligheter du önskar att
								prata med.
							</p>
						</EmelyDialogue>
					</Col>
				</Row>
				<Row>
					<Col className="text-center mt-5">
						<PersonaButton linkTo={'/work-emely'}>
							<FiBriefcase className="m-2" size={25} /> SÖKA JOBB-ASSISTENT
						</PersonaButton>
						<PersonaButton linkTo={'/fika-kompis'}>
						<FiCoffee className="m-2" size={25} /> FIKA-KOMPIS
					</PersonaButton>
					</Col>
				</Row>
			</Container>
		</>
	);
}
