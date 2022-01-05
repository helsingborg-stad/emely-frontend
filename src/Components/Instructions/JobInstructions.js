import React from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap';
import Divider from '@mui/material/Divider';

import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';

export default function JobInstructions() {
	return (
		<>
			<Container id="instructions-container">
				<h5 className="fw-bold mt-5">{'2. Jobbintervju > välj yrke'}</h5>

				<Divider />
				<p className="instruction-text mt-3">
					Om du har valt Jobbintervju så kommer du att få välja vilket yrke du
					är intresserad av. När du trycker på "Välj yrke" så kommer du få upp
					en lista på olika yrken. Välj det yrke du skulle vilja träna
					jobbintervjun på.
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
