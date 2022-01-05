import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { ConversationContext } from '../../contexts/ConversationContext';
import { Button } from 'react-bootstrap';

import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import PersonaInstructions from '../../Components/Instructions/PersonaInstructions';
import PulseLoader from 'react-spinners/PulseLoader';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

/* --- Icon imports --- */
import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';

/* --- Variables, State & Hooks --- */
export default function Dashboard() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const { userDetails, currentUser } = useAuth();
	const { setCurrentProgress, getUserConversations, userConversations } =
		useContext(ConversationContext);
	const [isLoading, setIsLoading] = useState();
	const history = useHistory();
	const handleLink = (linkTo) => {
		history.push(linkTo);
	};

	async function handleGetConversations() {
		try {
			await getUserConversations();
			console.log('conversations fetched');
		} catch (error) {
			console.log(error.message);
		}
	}

	const downloadTextFile = () => {
		try {
			var zip = new JSZip();

			zip.file(`${currentUser.uid}-conversations.txt`, userConversations);

			zip.generateAsync({ type: 'blob' }).then(function (content) {
				// see FileSaver.js
				saveAs(content, `${currentUser.uid}-conversations.zip`);
			});

			/*
		const element = document.createElement("a");
		const file = new Blob([userConversations], {
			type: "text/plain;charset=utf-8",
		});
		element.href = URL.createObjectURL(file);
		element.download = `${currentUser.uid}-conversations.zip`
		document.body.appendChild(element);
		element.click(); */
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (userDetails?.login_count <= 1) {
			const timer = setTimeout(() => {
				setShow(true);
			}, 1500);
			return timer;
		}
	}, [userDetails]);

	/* --- Added loader before rendering text --- */
	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => {
			setIsLoading(false);
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
							<Button onClick={handleGetConversations}>
								Get Conversations
							</Button>

							<Button onClick={downloadTextFile}>Downlad</Button>

							{/* --- EmelyDialogue component -> Components/EmelyDialogue --- */}
							<EmelyDialogue className="">
								{/* --- When loading show pulse loader. Show text after loading --- */}
								{isLoading ? (
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
					<Col xs={12} md={6} className="text-center mt-3">
						<Button
							className="register-btn w-100 clickBtn"
							type="button"
							onClick={() => handleLink('/work-emely')}
						>
							<ImBriefcase size={20} />
							<span className="px-3">Jobbintervju</span>
						</Button>
					</Col>

					{/* --- Fika kompis persona-button --- */}
					<Col xs={12} md={6} className="mt-3">
						<Button
							className="register-btn w-100 clickBtn"
							type="button"
							onClick={() => handleLink('/emely-chat/fika')}
						>
							<SiCoffeescript size={20} />
							<span className="px-3">Ta en fika</span>
						</Button>
					</Col>
				</Row>
			</Container>

			<Modal
				className="settings-modal"
				size="lg"
				show={show}
				onHide={handleClose}
			>
				<Modal.Body>
					<PersonaInstructions closeModal={handleClose} />
				</Modal.Body>
			</Modal>
		</>
	);
}
