import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Modal, Button, Offcanvas } from 'react-bootstrap';
import { ConversationContext } from '../../contexts/ConversationContext';
import { useAuth } from '../../contexts/AuthContext';

import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import WorkButton from '../../Components/WorkButton/WorkButton';
import PulseLoader from 'react-spinners/PulseLoader';
import introJs from 'intro.js';

/* --- Icon imports --- */
import { ImBriefcase } from 'react-icons/im';

/* --- Variables, Hooks & State --- */
export default function WorkEmely(props) {
	const [isLoading, setIsLoading] = useState();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { currentUser } = useAuth();
	const { getButtons, jobButtons, setCurrentProgress } =
		useContext(ConversationContext);

	function handleIntro() {
		introJs()
			.setOptions({
				showProgress: true,
				tooltipClass: 'customTooltip',
			})
			.start();
	}

	useEffect(() => {
		setIsLoading(true);

		/* --- Render text after delay --- */
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		return timer;
	}, [currentUser]);

	useEffect(() => {
		/* --- Reset current progress before new chat --- */
		setCurrentProgress(0);
	}, []);

	/* --- Get job-list from API --- */
	useEffect(() => {
		getButtons();
	}, []);

	return (
		<>
			<Container id="container-work-emely">
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header className="border-bottom" closeButton>
						<ImBriefcase className="me-2 mt-0 p-0" size={30} />
						<Offcanvas.Title className="fw-bold mt-1">
							Välj yrke{' '}
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						{jobButtons ? (
							<WorkButton occupation={jobButtons}></WorkButton>
						) : (
							<PulseLoader size={12} color={'gray'} />
						)}
					</Offcanvas.Body>
				</Offcanvas>

				{/* --- Emely Dialogue component --- */}
				<EmelyDialogue className="m-0">
					{isLoading ? (
						<p className="m-3 p-5 emely-dialog_dialogue-text text-center">
							<PulseLoader size={12} color={'gray'} />{' '}
						</p>
					) : (
						<p className="m-3 p-3 emely-dialog_dialogue-text">
							Hej igen, vad spännande att du vill gå på en intervju med mig! Jag
							har arbetat med att hålla i intervjuer i ungefär ett halvår, och
							försöker hela tiden förbättras. Innan vi startar intervjun undrar
							jag vilket yrke du är intresserad av.
						</p>
					)}
				</EmelyDialogue>

				{/* --- Choose job button --- */}
				<Row className="p-0 mb-1">
					<Col
						className="text-center mt-5"
						data-title="2. Välj yrke"
						data-intro="Du har valt jobbintervju och kommer att få välja vilket yrke du är intresserad av. Välj det yrke du skulle vilja träna jobbintervjun på."
					>
						<Button
							variant="none"
							className="w-100 register-btn"
							id="edit-button"
							onClick={handleShow}
						>
							Välj yrke
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
}
