import React from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import PersonaButtons from '../../Assets/images/persona-buttons.png';

import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';

export default function PersonaInstructions() {
	return (
		<>
			<Container className="p-3" id="instructions-container">
				<h4 className="fw-bold ">Hur interagerar jag med Emely?</h4>
				<Divider />
				<p className="instruction-text mt-3">
					Emely är en språkrobot med artificiell intelligens. Emely finns här
					för dig som vill öva på att skriva eller tala svenska.
				</p>
				<h5 className="fw-bold mt-5">1. Välj persona</h5>

				<Divider />
				<p className="instruction-text mt-3">
					Vill du träna på att gå på en jobbintervju eller bara ta en fika och
					prata om vad som helst? Välj persona genom att trycka på någon av
					alternativen.
					<Row lg={2} md={2} sm={1}>
						<Col className="text-center mt-3">
							<Button className="register-btn clickBtn w-100" style={{ pointerEvents: 'none'}} type="button">
								<ImBriefcase size={20} />
								<span className="px-3">Jobbintervju</span>
							</Button>
						</Col>

						{/* --- Fika kompis persona-button --- */}

						<Col className="mt-3">
							<Button className="register-btn clickBtn w-100" style={{ pointerEvents: 'none'}} type="button">
								<SiCoffeescript size={20} />
								<span className="px-3">Ta en fika</span>
							</Button>
						</Col>
					</Row>
				</p>
			</Container>
		</>
	);
}
