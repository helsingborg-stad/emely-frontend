import React from 'react';
import UserMenu from './UserMenu';
import PersonaChoices from './PersonaChoices';
import EmelyDialogue from './EmelyDialogue';
import { Container, Row, Col } from 'react-bootstrap';

/* Variable declaration */
export default function Dashboard() {
	return (
		<>
			<Container id="dashboard-card">
				<Row>
					<UserMenu />
				</Row>
				<Row>
					<Col id="emely-dialogue-col" className="text-center">
						<EmelyDialogue className="m-0"/>
					</Col>
				</Row>
				<Row>
					<Col className="text-center mt-5">
						<PersonaChoices />
					</Col>
				</Row>
			</Container>
		</>
	);
}
