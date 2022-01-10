import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { ConversationContext } from '../../contexts/ConversationContext';
import { Button } from 'react-bootstrap';

import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import PersonaInstructions from '../../Components/Instructions/PersonaInstructions';
import PulseLoader from 'react-spinners/PulseLoader';

/* --- Icon imports --- */
import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import introJs from 'intro.js';

/* --- Variables, State & Hooks --- */
export default function Dashboard() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const { userDetails, currentUser, showInstructions } = useAuth();
	const { setCurrentProgress, getUserConversations, isLoading } =
		useContext(ConversationContext);
	const [loading, setLoading] = useState();
	const history = useHistory();
	const handleLink = (linkTo) => {
		history.push(linkTo);
	};



	/* --- Added loader before rendering text --- */
	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return timer;
	}, [currentUser]);

	/* --- Reset progress before entering new chat --- */
	useEffect(() => {
		setCurrentProgress(0);
	}, []);

	return (
		<>
			<Container id="dashboard-card" className="p-0">
			
				<Row className="my-5 align-items-center  justify-content-center button_container">
					<Row>
						<Col id="emely-dialogue-col" className="p-0">
							{/* --- EmelyDialogue component -> Components/EmelyDialogue --- */}
							<EmelyDialogue className="">
								{/* --- When loading show pulse loader. Show text after loading --- */}
								{loading ? (
									<p className="m-3 p-5 emely-dialog_dialogue-text text-center">
										<PulseLoader size={12} color={'gray'} />{' '}
									</p>
								) : (
									<p className="m-3 p-3 emely-dialog_dialogue-text">
										Hej {userDetails && userDetails.username}! Jag heter Emely.
										Jag är en virtuell språkassistent och med mig kan du öva att
										prata på svenska. Vill du träna på att gå på en jobbintervju
										eller bara ta en fika och prata om vad som helst?
									</p>
								)}
							</EmelyDialogue>
						</Col>
					</Row>

					{/* --- Work Emely persona-button --- */}
					<Row
						className="mt-2 p-0"
						lg={2}
						md={2}
						xs={1}
						data-title="1. Välj persona"
						data-intro="Vill du träna på att gå på en jobbintervju eller bara ta en fika och prata om vad som helst? Börja med att välja genom att trycka på någon av alternativen!"
					>
						<Col className="text-center mb-2 ">
							<Button
								className="register-btn w-100 clickBtn"
								type="button"
								onClick={() => handleLink('/work-emely')}
							>
								<ImBriefcase className="me-2" size={20} />
								Jobbintervju
							</Button>
						</Col>

						{/* --- Fika kompis persona-button --- */}
						<Col
							className=""
						>
							<Button
								className="register-btn w-100 clickBtn"
								type="button"
								onClick={() => handleLink('/emely-chat/fika')}
							>
								<SiCoffeescript className="me-2" size={20} />
								Ta en fika
							</Button>
						</Col>
					</Row>
				</Row>
			</Container>

			{/* --- Instructions --- */}
			<Modal
				className="settings-modal"
				size="lg"
				show={show}
				onHide={handleClose}
			>
				<Modal.Body>
					<PersonaInstructions />
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={loading}
						variant="outline-success"
						className="register-btn"
						onClick={handleClose}
					>
						<MdKeyboardArrowLeft size={25} /> TILLBAKA
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
