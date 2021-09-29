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
							<p className="m-3 p-3 emely-dialog_dialogue-text">
								Hej
								<b>
									{currentUser ? currentUser.displayName : currentUser.email}
								</b>
								! Jag heter Emely. <br/> Jag är en virtuell språkassistent och med mig
								kan du öva att prata på svenska. Välj nedan vilken av mina
								personligheter du önskar att prata med.
							</p>
						</EmelyDialogue>
					</Col>
				</Row>
				<Row className="text-center">
					<Col xs={7} className="text-center mt-3">
						<PersonaButton linkTo={'/work-emely'} name={'SÖKA JOBB-ASSISTENT'}>
							<FiBriefcase size={50} />
						</PersonaButton>
					</Col>
					<Col xs={4} className="mt-3">
						<PersonaButton linkTo={'/fika-kompis'} name={'FIKA KOMPIS'}>
							<FiCoffee size={50} />
						</PersonaButton>
					</Col>
				</Row>
			</Container>
		</>
	);
}
