import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';

import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import ProfileInfoPasswordEdit from '../../Components/ProfileInfo/ProfileInfoPasswordEdit';

/* --- Icon imports --- */
import { AiOutlineEdit } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';

/* --- Variables, Hooks & State --- */
export default function Profile() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<>
			{/* --- Profile password card --- */}
			<ProfileCard>
				<Row className="p-0 m-0" xs={1} md={2} lg={2}>
					<Col>
						<h4 className="profile-headline mb-3 fw-bold">
							<RiLockPasswordFill className="label-icons" size={25} />
							Lösenord
						</h4>
					</Col>

					{/* --- Change password button --- */}
					<Col xs="auto" className="text-end pe-0 ps-2">
						<span>
							<Button
								variant="none"
								className="register-btn_small"
								id="edit-button"
								onClick={handleShow}
							>
								<AiOutlineEdit className="me-2" size={20} />
								Ändra lösenord
							</Button>
						</span>
					</Col>
				</Row>
				<Row className="mt-3">
					<p className="card-text" id="delete-text">
						Vill du ändra ditt lösenord? Tänk på att du loggas ut när lösenordet
						ändras.
					</p>
				</Row>
			</ProfileCard>

			{/* --- Modal (popup) for changing password */}
			<Modal
				className="profile-info-modal"
				size="lg"
				show={show}
				onHide={handleClose}
			>
				<Modal.Body>
					<ProfileInfoPasswordEdit closeModal={handleClose} />
				</Modal.Body>
			</Modal>

			<br />
		</>
	);
}
