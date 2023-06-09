import React, { useState, useContext, useEffect } from 'react';
import {
	Container,
	ProgressBar,
	Navbar,
	Col,
	Row,
	Modal,
	Button,
	Offcanvas,
} from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';
import EmelySettings from '../EmelySettings/EmelySettings';
import { ConversationContext } from '../../contexts/ConversationContext';
import { Link } from 'react-router-dom';

export default function ChatMenu() {
	const { currentProgress, setCurrentProgress } =
		useContext(ConversationContext);

	const [show, setShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	/* show/hide modal (settings) */
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* show/hide alert on conversation success */

	const handleShowAlert = () => setShowAlert(true);
	const handleCloseAlert = () => setShowAlert(false);

	useEffect(() => {
		/* Sets showAlert to true when current progress reaches 100 */
		if (currentProgress === 100) {
			handleShowAlert();
		}
	}, [currentProgress]);

	return (
		<>
			{/* --- Alert pop up --- */}
			<Offcanvas
				style={{
					backgroundColor: 'var(--green)',
					color: 'var(--greenExtraLight)',
				}}
				show={showAlert}
				placement="bottom"
				onHide={handleClose}
			>
				<Offcanvas.Body className="ms-3 fw-bold">
					<Row className="mt-4">
						<Col xs={2} md={3} lg={2} className="text-end">
							<BsCheckCircleFill size={50} />
						</Col>
						<Col className="mb-3">
							Bra jobbat!
							<br />
							Du har klarat en hel konversation med Emely.
						</Col>
						<Col>
							<Link to="/dashboard">
								<Button variant="none" className="btn_light_small">
									NY KONVERSATION
								</Button>
							</Link>
							<Col>
								<Button
									onClick={handleCloseAlert}
									variant="none"
									className="btn_light_small mt-2"
								>
									TILLBAKA
								</Button>
							</Col>
						</Col>
						<Row></Row>
					</Row>
				</Offcanvas.Body>
			</Offcanvas>

			{/* --- The chat menu is shown when you enter a chat with emely --- */}
			<Navbar className=" fixed-top chat-menu">
				<Container className="ms-0 me-0">
					<Col>
						<ProgressBar
						data-title="Framstegsmätare"
						data-intro="När Emely ställer den första frågan så startar framstegsmätare. När mätaren är full, då har du klarat en hel kovnersation med Emely! Därefter kan du välja att starta en ny konversation."
						data-step="4"
							className="rounded-pill ms-1"
							animated
							variant="success"
							now={currentProgress}
						/>
					</Col>
					<span className="text-end">
						<Button className="ps-0 pb-0" variant="none"></Button>
					</span>
				</Container>
			</Navbar>
		</>
	);
}
