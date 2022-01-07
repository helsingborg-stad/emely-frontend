import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import EmelySettings from '../EmelySettings/EmelySettings';

/* --- Icon imports --- */
import { IoMdSettings } from 'react-icons/io';

export default function ProfileEmelySettings() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<>
			{/* --- Emely settings profile card ---  */}
			<ProfileCard>
				<Row className="p-0 m-0" xs={1} md={2} lg={2}>
					<Col >
						<h4 className="profile-headline mb-3 fw-bold"><IoMdSettings className="me-2" size={25} /> Inställningar </h4>
					</Col>
					<Col xs="auto" className="text-end pe-0 ps-2">
						<span>
							<Button
								variant="none"
								className="register-btn_small"
								id="edit-button"
								onClick={handleShow}
							>
								
								<IoMdSettings className="me-2" size={15} />Inställningar
								
							</Button>
						</span>
					</Col>
				</Row>
				<Row className="mt-3">
					<p className="card-text" id="delete-text">
						Du har möjlighet att ändra vissa inställningar för Emely. Beroende på ditt val av inställning så kommer Emely att bemöta dig annorlunda.
					</p>
				</Row>
			</ProfileCard>

			{/* --- Modal for the settings --- */}
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

			<br />
		</>
	);
}
