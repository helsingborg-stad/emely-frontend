import React, { useState, useRef } from 'react';
import { Col, Row, Button, Modal, Form, Container } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import { useAuth } from '../../contexts/AuthContext';

/* Icon imports */
import { FaTimesCircle } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';

/* --- Variables, State & Hooks --- */
export default function Profile() {
	const passwordRef = useRef();

	const {
		userDelete,
		loading,
		login,
		currentUser,
		deleteFirestoreUser,
		deleteAllUserConversations,
		setLoading,
	} = useAuth();
	const [show, setShow] = useState(false);
	const { translateError, setMsg, setMsgVariant } = useAuth();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* --- Delete user --- */
	async function handleDeleteUser(e) {
		e.preventDefault();
		setMsg('');

		try {
			const credential = await login(
				currentUser.email,
				passwordRef.current.value
			);
			await deleteFirestoreUser(currentUser.uid);
			await deleteAllUserConversations(currentUser.uid);
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
				<Row className="p-0 m-0" xs={1} md={2} lg={2}>
					<Col className="">
						<h4 className="mb-3 fw-bold profile-headline ">
							<FaTimesCircle className="me-3" size={25} />
							Radera Konto
						</h4>
					</Col>
					<Col xs="auto" className="text-end pe-0 ps-2 ">
						<span>
							<Button
								variant="none"
								className="register-btn_small-danger"
								id="delete-user-button"
								onClick={handleShow}
							>
								<FaTimesCircle className="me-2" size={20} />
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
			<Container className="p-3">
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							<h4 className="fw-bold">Bekräfta</h4>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p className="card-text">
							Är du säker på att du vill radera ditt användarkonto? All
							användarinformation kommer att försvinna. Skriv in ditt lösenord
							och tryck på "RADERA" om du är säker.
						</p>
						<Form onSubmit={handleDeleteUser}>
							<Form.Group id="password" className="mt-4 fw-bold">
								<Form.Label className="input-label">
									<RiLockPasswordLine size={20} /> Ditt lösenord
								</Form.Label>
								<Form.Control
									className="input-field-small mb-4"
									type="password"
									placeholder="Lösenord"
									ref={passwordRef}
									required
								/>
							</Form.Group>

							<Row lg={2} md={2} xs={1}>
								<Col>
									<Button
										variant="outline-danger"
										className="rounded-pill pe-3 ps-3 fw-bold mb-2 register-btn_small-danger w-100"
										id="delete-user-button"
										type="submit"
										disabled={loading}
									>
										<FaTimesCircle className="me-2" size={20} /> Radera
									</Button>
								</Col>
								<Col>
									<Button
										variant="none"
										className="register-btn_grey_light_small rounded-pill pe-3 ps-3 fw-bold w-100"
										onClick={handleClose}
									>
										TILLBAKA
									</Button>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
				</Modal>
			</Container>

			<br />
		</>
	);
}
