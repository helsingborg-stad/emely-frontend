import React from 'react';
import UserMenu from '../../Components/UserMenu/UserMenu';
import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import WorkButton from '../../Components/WorkButton/WorkButton';
import { Container, Row, Col } from 'react-bootstrap';

export default function WorkEmely() {
	const occupation = {
		occupations: [
			'Bartender',
			'Bilmekaniker',
			'Butiksbiträde',
			'Brevbärare',
			'Ekonomiassistent',
			'Förskollärare',
			'Lagerarbetare',
			'Lastbilsförare',
			'Lokalvårdare',
			'Lärare',
			'Parkförvaltare',
			'Receptionist',
			'Servitör',
			'Sjuksköterska',
			'Snickare',
			'Tandsköterska',
			'Vaktmästare',
			'Vårdassistent',
		],
	};

	return (
		<>
			<Container id="container-work-emely">
				<Row>
					<UserMenu />
				</Row>
				<Row>
					<Col id="emely-dialogue-col">
						<EmelyDialogue className="m-0">
							<p className="m-3 p-3" id="dialogue-text">
								Jag har arbetat med att intervjua folk för jobb i ungefär ett
								halvår. Eftersom att jag är nybörjare på detta blir jag nervös
								ibland och glömmer vad jag tidigare har sagt. Det är inte ditt
								fel om jag råkar glömma något.
								<br />
								<br />
								Vilket arbete söker du?
							</p>
						</EmelyDialogue>
					</Col>
				</Row>
				<Row className="p-0 mb-5">
					<Col className="text-center mt-5">
						<WorkButton occupation={occupation}></WorkButton>
					</Col>
				</Row>
			</Container>
		</>
	);
}