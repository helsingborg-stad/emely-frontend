import React from 'react';
import UserMenu from './UserMenu';
import Choices from './Choices';
import EmelyDialogue from './EmelyDialogue';
import EmelyMenu from './EmelyMenu';
import { Container, Row, Col } from 'react-bootstrap';

/* Variable declaration */
export default function Dashboard() {
	return (
		<>
			<Container>
				<Row>
					<Col className="m-3"><EmelyMenu /></Col>
					<Col className="item-align-right">
						<UserMenu />
					</Col>
				</Row>
				<Row>
					<Col className="text-center mt-5"><EmelyDialogue /></Col>
				</Row>
				<Row>
					<Col className="text-center mt-5"><Choices /></Col>
				</Row>
			</Container>
		</>
	);
}
