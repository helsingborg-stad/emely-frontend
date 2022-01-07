import React from 'react';
import { Container, Button, Col, Row, ProgressBar } from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import PersonaButtons from '../../Assets/images/persona-buttons.png';
import TextareaAutosize from 'react-textarea-autosize';

import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';

import { BiMicrophone } from 'react-icons/bi';
import { IoMdVolumeHigh } from 'react-icons/io';
import { IoMdVolumeOff } from 'react-icons/io';
import { IoIosSend } from 'react-icons/io';
import { FaStop } from 'react-icons/fa';

export default function PersonaInstructions() {
	return (
		<>
			<Container className="" id="instructions-container">
					<h4 className="fw-bold text-center mt-3">
						Hur interagerar jag med Emely?
					</h4>
					<Divider />
			

				<h5 className="fw-bold mt-5">1. Välj persona</h5>

				<p className="instruction-text mt-3">
					Vill du träna på att gå på en jobbintervju eller bara ta en fika och
					prata om vad som helst? Välj persona genom att trycka på någon av
					alternativen.
				</p>

				<Row lg={2} md={2} xs={1}>
					<Col  className="text-center">
						<Button
							className="register-btn clickBtn w-100 mb-3"
							style={{ pointerEvents: 'none' }}
							type="button"
						>
							<ImBriefcase className="me-2" size={20} />
							Jobbintervju
						</Button>
					</Col>

					{/* --- Fika kompis persona-button --- */}

					<Col className="">
						<Button
							className="register-btn clickBtn w-100"
							style={{ pointerEvents: 'none' }}
							type="button"
						>
							<SiCoffeescript className="me-2" size={20} />
							Ta en fika
						</Button>
					</Col>
				</Row>

				<h5 className="fw-bold mt-5">2. Jobbintervju</h5>

				<p className="instruction-text mt-3">
					Om du har valt Jobbintervju så kommer du att få välja vilket yrke du
					är intresserad av. När du trycker på "Välj yrke" så kommer du få upp
					en lista på olika yrken. Välj det yrke du skulle vilja träna
					jobbintervjun på.
				</p>

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

				<Row lg={1} md={1} sm={1} className="mb-4 mt-5">
					<h5 className="fw-bold ">3. Chatta med Emely</h5>
					<p className="instruction-text mt-2">
						Vid val av yrke eller persona så kommer du att gå vidare till
						chatten. Emely kommer att initiera samtalet med dig och ställa den
						första frågan.
					</p>
					<h6 className="fw-bold mt-2">3.1 Skriv meddelande</h6>
					<p className="instruction-text mt-1 mb-2">
						Svara tillbaka genom att skriva något i meddelande rutan, därefter
						kan du välja att trycka på "Enter" på tangentbordet eller klicka på
						knappen.
					</p>
					<form className={'input-wrapper'}>
						<TextareaAutosize
							className="user-message_input"
							type="text"
							maxRows={1}
							placeholder="Meddelande"
							required
							autoFocus
							style={{ pointerEvents: 'none', resize: 'none' }}
						></TextareaAutosize>
						<button
							type="submit"
							className="send_message_btn"
							style={{ pointerEvents: 'none' }}
						>
							<IoIosSend size={'1.5rem'} />
						</button>
					</form>
					<h6 className="fw-bold mt-4">3.2 Röstinspelning</h6>{' '}
					<p className="instruction-text mt-1 mb-2">
						Om du inte vill skriva till Emely så har du möjlighet att klicka på
						mikrofonknappen och spela in ditt meddelande till henne. När du är
						klar tryck på knappen igen för att avsluta inspelningen. Slutligen
						har du möjlighet att redigera din röstinspelning och eventuellt
						ändra något som inte uppfattades korrekt.
					</p>
					<form className={'input-wrapper'}>
						<button className="navigation_btn recording_btn">
							<BiMicrophone size={'2rem'} />
						</button>
					</form>
					<h6 className="fw-bold mt-4">3.3 Stäng av ljud</h6>{' '}
					<p className="instruction-text mt-1 mb-2">
						Om du inte vill lyssna på Emely så har du möjgliheten att stänga av
						ljudet genom att klicka på ljudknappen.
					</p>
					<form className={'input-wrapper'}>
						<button className="sound_btn navigation_btn">
							<IoMdVolumeHigh size={'2rem'} />
						</button>
					</form>
					<h6 className="fw-bold mt-4">3.4 Framstegsmätare</h6>{' '}
					<p className="instruction-text mt-1 mb-2">
						När Emely ställer den första frågan så startar framstegsmätare. När
						mätaren är full, då har du klarat en hel kovnersation med Emely.
						Därefter kan du välja att starta en ny konversation.
					</p>
					<Col className="text-center mt-3">
						<ProgressBar
							className="rounded-pill ms-1"
							animated
							variant="success"
							now="35"
							style={{ background: 'white' }}
						/>
					</Col>
				</Row>
				
			</Container>
		</>
	);
}
