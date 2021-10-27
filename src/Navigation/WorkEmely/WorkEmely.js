import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import WorkButton from '../../Components/WorkButton/WorkButton';
import useWindowDimensions from '../../customHooks/useWindowDimensions';
import PulseLoader from 'react-spinners/PulseLoader';
import { ConversationContext } from '../../contexts/ConversationContext';
import { useAuth } from '../../contexts/AuthContext';



export default function WorkEmely(props) {

	const { userDetails, currentUser } = useAuth();

	const { getButtons, jobButtons } = useContext(ConversationContext);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		setIsLoading(true);

		/* --- Render text after delay --- */
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return timer;
	}, [currentUser]);

	useEffect(() => {
		getButtons();
	}, []);

	return (
		<>
			<Container id="container-work-emely">
				<Modal scrollable={true} className="work-button-modal" size="md" show={show} onHide={handleClose}>
					<Modal.Body>
						{jobButtons ? (
							<WorkButton occupation={jobButtons}></WorkButton>
						) : (
							<p>loading...</p>
						)}
					</Modal.Body>
				</Modal>

				<EmelyDialogue className="m-0">
					{isLoading ? (
						<p className="m-3 p-5 emely-dialog_dialogue-text text-center">
							<PulseLoader size={12} color={'gray'} />{' '}
						</p>
					) : (
						<p className="m-3 p-3 emely-dialog_dialogue-text">
							Jag har arbetat med att intervjua folk för jobb i ungefär ett
							halvår. Eftersom att jag är nybörjare på detta blir jag nervös
							ibland och glömmer vad jag tidigare har sagt. Det är inte ditt fel
							om jag råkar glömma något.
							<br />
							<br />
							Vilket arbete söker du?
						</p>
					)}
				</EmelyDialogue>

				<Row className="p-0 mb-5">
					<Col className="text-center mt-5">
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
