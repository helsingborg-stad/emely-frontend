import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import ProfileInfoPasswordEdit from '../../Components/ProfileInfo/ProfileInfoPasswordEdit';

/* Icon imports */


import { AiOutlineEdit } from 'react-icons/ai';


export default function Profile() {
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<>

			<ProfileCard>
				<Row className="p-0 m-0">
					<Col xs="auto" md={8} lg={8}>
						<h4 className="mb-3 fw-bold">Ändra Lösenord</h4>
					</Col>
					<Col xs="auto" md={4} lg={4} className="text-end p-0">
						<span>
							<Button
								variant="outline-success"
								className="rounded-pill pe-3 ps-3  fw-bold register-btn_light"
								id="edit-button"
								onClick={handleShow}
							>
								<AiOutlineEdit className="me-2" size={15} />
								Redigera
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

			{/* Confirmation modal */}
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Body>
					<ProfileInfoPasswordEdit />
				</Modal.Body>
			</Modal>

			<br />
		</>
	);
}
