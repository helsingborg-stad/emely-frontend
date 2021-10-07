import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProfileCard(props) {
	return (
		<>
			<Container className="p-3" id="profile-card">
				<Row className="ms-3 mt-3 me-2">
					<Col className="p-0" xs={6}>
						<h4>{props.title}</h4>
					</Col>
					<Col className="text-end p-0 me-0">
						<span>
							<Link to={props.linkTo}>
								<Button
									variant="outline-success"
									className="rounded-pill pe-3 ps-3 fw-bold register-btn_light"
									id="edit-button"
								>
									{props.buttonIcon}
									{props.buttonText}
								</Button>
							</Link>
						</span>
					</Col>
				</Row>

				{props.children}
			</Container>
		</>
	);
}
