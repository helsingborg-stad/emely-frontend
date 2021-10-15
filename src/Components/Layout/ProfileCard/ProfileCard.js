import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProfileCard(props) {
	return (
		<>
			<Container className="" id="profile-card">
				<Row className="p-4">

					{props.children}
					

				</Row>

			</Container>
		</>
	);
}
