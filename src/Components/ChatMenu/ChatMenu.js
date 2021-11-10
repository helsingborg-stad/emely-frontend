import React, { useState, useContext, useEffect } from 'react';
import {
	Container,
	ProgressBar,
	Navbar,
	Col,
	Row,
	Modal,
	Button,
} from 'react-bootstrap';
import { FcSettings } from 'react-icons/fc';
import EmelySettings from '../EmelySettings/EmelySettings';
import { ConversationContext } from '../../contexts/ConversationContext';

export default function ChatMenu() {
	const { currentProgress, setCurrentProgress, conversationId } =
		useContext(ConversationContext);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    useEffect(() => {
        /* Reset current progress on new chat */
        setCurrentProgress(0);
    }, [])

	return (
		<>
			<Navbar className=" fixed-top chat-menu shadow-sm">
				<Container className="ms-0 me-0">
					<Col>
						<ProgressBar
							className="rounded-pill ms-0"
							animated
							variant="success"
							now={currentProgress}
						/>
					</Col>
					<span className="text-end">
						<Button className="ps-0 pb-0" variant="none">
							<FcSettings className="ms-3" onClick={handleShow} size={25} />
						</Button>
					</span>
				</Container>
			</Navbar>

			<Modal
				className="settings-modal"
				size="lg"
				show={show}
				onHide={handleClose}
			>
				<Modal.Body>
					<EmelySettings closeModal={handleClose} />
				</Modal.Body>
			</Modal>
		</>
	);
}
