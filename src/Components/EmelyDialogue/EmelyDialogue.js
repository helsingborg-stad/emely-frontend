import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import emelyWork from '../../Assets/images/emely_work.png';

export default function EmelyDialogue(props) {
	return (
		<>
			<Row className="dialogue-row justify-content-center">
				<Col className="items-align-end" lg={3} md={5} xs={6}>
					<img
					id="emely-image"
					className=""
					src={emelyWork}
					alt=""
					/>
					
				</Col>
				<Col>
					
					<Card className="" id="emely-dialogue-card">
						{props.children}
					</Card>
				</Col>
			</Row>
		</>
	);
}
