import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProfileCard(props) {
	return (
		<>
			<Container className="p-3" id="profile-card">
				<Row className="p-4">
					<Col xs={5} md={6} lg={6}>
						<h4>{props.title}</h4>
					</Col>
					{props.children}
					

				</Row>

			</Container>
		</>
	);
}
