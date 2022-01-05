import React from 'react';

import { Container, Button, Col, Row } from 'react-bootstrap';

import Divider from '@mui/material/Divider';
import PersonaButtons from '../../Assets/images/persona-buttons.png';

export default function ChatInstructions() {
	return (
		<>
			<Container id="instructions-container">
				<h5 className="fw-bold mt-5">{'3. Chatta med Emely'}</h5>

				<Divider />
				<p className="instruction-text mt-3">
					Vid val av yrke eller persona så kommer du att gå vidare till chatten 
					<Row lg={1} md={1} sm={1}>
						<Col className="text-center mt-3">
							<Button
								className="register-btn clickBtn w-100"
								style={{ pointerEvents: 'none' }}
								type="button"
							>
								<span className="px-3">Välj yrke</span>
							</Button>
						</Col>
					</Row>
				</p>
			</Container>
		</>
	);
}
