import React from 'react';
import UserMenu from '../components/UserMenu';
import { Container, Row, Col } from 'react-bootstrap';

/* Variable declaration */
export default function Dashboard() {
	return (
		<>
			<Container>
				<Row >
					<Col className="m-3">EmelyMenu.js</Col>
					<Col className="item-align-right">
						<UserMenu />
					</Col>
				</Row>
				<Row>
					<Col className="text-center">EmelyDialogue.js</Col>
				</Row>
				<Row>
				<Col>Choices.js</Col>
			</Row>
			</Container>
		</>
	);
}
