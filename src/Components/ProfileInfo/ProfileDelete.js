import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import { useAuth } from '../../contexts/AuthContext';

/* Icon imports */
import { FaRegTimesCircle } from 'react-icons/fa';

/* --- Variables, State & Hooks --- */
export default function Profile() {
	const { userDelete } = useAuth();
	const [show, setShow] = useState(false);
	const { translateError, setMsg, setMsgVariant } = useAuth();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* --- Delete user --- */
	async function handleDeleteUser() {
		setMsg('');

		try {
			await userDelete();

			/* Catch error */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}
	}

	return (
		<>
			<ProfileCard>
			{/* --- Delete user profile-card --- */}
				<Row className="p-0 m-0">
					<Col xs="auto" md={8} lg={8}>
						<h4 className="mb-3 fw-bold ">
							<FaRegTimesCircle className="me-2" size={25} />
							Radera användare
						</h4>
					</Col>
					<Col xs="auto" md={4} lg={4} className="text-end p-0">
						<span>
							<Button
								variant="none"
								className="register-btn_small-danger"
								id="delete-user-button"
								onClick={handleShow}
							>
								<FaRegTimesCircle className="me-2" size={15} />
								Radera
							</Button>
						</span>
					</Col>
				</Row>
				{/* --- Confirmation message --- */}
				<Row className="mt-3">
					<p className="card-text" id="delete-text">
						Om du raderar din användare så kommer all användarinformation att
						försvinna. Var försiktig med detta för det finns ingen återvändo.{' '}
					</p>
				</Row>
			</ProfileCard>

			{/* --- Confirm Delete --- */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Radera användarkonto</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Är du säker på att du vill radera ditt användarkonto? All
					användarinformation kommer att försvinna.
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						className="rounded-pill pe-3 ps-3 fw-bold"
						onClick={handleClose}
					>
						Avbryt
					</Button>
					<Button
						variant="outline-danger"
						className="rounded-pill pe-3 ps-3 fw-bold"
						id="delete-user-button"
						onClick={handleDeleteUser}
					>
						Radera
					</Button>
				</Modal.Footer>
			</Modal>

			<br />
		</>
	);
}
