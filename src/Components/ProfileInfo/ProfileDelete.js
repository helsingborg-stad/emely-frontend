import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';
import { useHistory } from 'react-router-dom';

/* Icon imports */

import { FaRegTimesCircle } from 'react-icons/fa';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { currentUser, logout, userDelete, deleteFirestoreUser } =
		useAuth();
	const history = useHistory();
	const [show, setShow] = useState(false);

	const { translateError } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	async function handleLogout() {
		setMsg('');

		try {
			await logout();
			history.push('/login');

			/* Catch error */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}
	}

	async function handleDeleteUser() {
		setMsg('');

		try {
			await userDelete();
			await deleteFirestoreUser(currentUser.uid);
			history.push('/login');

			/* Catch error */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}
	}

	return (
		<>
			{/* ------------ Alert for error messages: fixed-top ------------ */}
			{msg && <AlertMessage message={msg} variant={msgVariant} />}

            <ProfileCard>

				{/* Delete user card */}

                <Row className="p-0 m-0">
                <Col xs="auto" md={8} lg={8}>
                    <h4 className="mb-3 fw-bold ">Radera användare</h4>
                </Col>
                <Col xs="auto" md={4} lg={4} className="text-end p-0">
                    <span>
                        
                    <Button
                    variant="none"
                    className="register-btn_light_small-danger"
                    id="delete-user-button"
                    onClick={handleShow}
                >
                    <FaRegTimesCircle className="me-2" size={15} />
                    Radera
                </Button>
                        
                    </span>
                </Col>
            </Row>
					<Row className="mt-3">
						<p className="card-text" id="delete-text">
							Om du raderar din användare så kommer all användarinformation att
							försvinna. Var försiktig med detta för det finns ingen återvändo.{' '}
						</p>
					</Row>
				</ProfileCard>

				{/* Confirmation modal */}
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
