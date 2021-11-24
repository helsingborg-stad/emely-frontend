import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import emelyWork from '../../Assets/images/emely.png';

export default function EmelyDialogue(props) {
	return (
		<>
			<Row className="dialogue-row justify-content-center mt-5">
				<Col className="items-align-end" lg={3} md={3} xs={6}>
					<img
					id="emely-image"
					className=""
					src={emelyWork}
					alt=""
					/>
					
				</Col>
				<Col lg={12} md={12} xs={12}>
					
					<Card className="shadow-sm" id="emely-dialogue-card">
						{props.children}
					</Card>
				</Col>
			</Row>
		</>
	);
}
