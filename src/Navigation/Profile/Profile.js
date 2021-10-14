import React, { useEffect, useState } from 'react';
import {
	Col,
	Container,
	Row,
	Button,
	Modal,
} from 'react-bootstrap';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Icon imports */
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { BiShowAlt } from 'react-icons/bi';
import { FaRegTimesCircle } from 'react-icons/fa';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { currentUser, userDetails, logout, userDelete, deleteFirestoreUser } =
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
			<Container>
				<Row>
					<UserMenu />
				</Row>
				<h2 className="text-center mb-4 fw-bold">Användarkonto</h2>

				{/* My information card */}
				<ProfileCard title={'Mina uppgifter'}>
					<Col className="text-end">
						<span>
							<Link to={'/update-profile'}>
								<Button
									variant="outline-success"
									className="rounded-pill pe-3 ps-3  fw-bold register-btn_light"
									id="edit-button"
								>
									<AiOutlineEdit className="me-2" size={15} />
									Redigera
								</Button>
							</Link>
						</span>
					</Col>
					<Row className="mt-3 ">
						<small className="fw-bold">Användarnamn</small>
						<p>{userDetails && userDetails.username}</p>
					</Row>

					<Row className="mt-3 ">
						<small className="fw-bold">Användarnamn</small>
						<p>{userDetails && userDetails.email}</p>
					</Row>

					<Row className="mt-3">
						<small className="fw-bold ">Födelsedatum</small>
						<p>{userDetails && userDetails.birth_year}</p>
					</Row>
					<Row className="mt-3">
						<small className="fw-bold ">Modersmål</small>
						<p>{userDetails && userDetails.native_language}</p>
					</Row>
					<Row className="mt-3">
						<small className="fw-bold ">Sysselsättning</small>
						<p>{userDetails && userDetails.current_occupation}</p>
					</Row>
					<Row className="mb-3 mt-5">
						<span>
							<Button
								variant="outline-success"
								className="rounded-pill pe-3 ps-3 fw-bold register-btn_light"
								id="log-out-button-profile"
								onClick={handleLogout}
							>
								<BiLogOutCircle className="me-2" size={18} />
								Logga ut
							</Button>
						</span>
					</Row>
				</ProfileCard>

				<br />

				{/* Conversation history card */}
				<ProfileCard title={'Samtalshistorik'}>
					<Col className="text-end me-0">
						<span>
							<Link to={'/conversation-history'}>
								<Button
									variant="outline-success"
									className="rounded-pill pe-3 ps-3  fw-bold register-btn_light"
									id="edit-button"
								>
									<BiShowAlt className="me-2" size={15} />
									Visa
								</Button>
							</Link>
						</span>
					</Col>
				</ProfileCard>

				<br />

				{/* Delete user card */}
				<ProfileCard
					title={'Radera användare'}
					buttonIcon={<FaRegTimesCircle className="me-2" size={15} />}
				>
					<Col className="text-end me-0">
						<span>
							<Button
								variant="outline-danger"
								className="rounded-pill pe-3 ps-3 fw-bold"
								id="delete-user-button"
								onClick={handleShow}
							>
								<FaRegTimesCircle className="me-2" size={15} />
								Radera
							</Button>
						</span>
					</Col>
					<Row className="mt-3 ">
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

				{/* Change email and password card */}
				<ProfileCard title={'Ändra lösenord'}>
					<Col className="text-end me-0">
						<span>
							<Link to={'/change-password'}>
								<Button
									variant="outline-success"
									className="rounded-pill pe-3 ps-3  fw-bold register-btn_light"
									id="edit-button"
								>
									<AiOutlineEdit className="me-2" size={15} />
									Ändra
								</Button>
							</Link>
						</span>
					</Col>
					<Row className="mt-3 ">
						<p className="card-text" id="change-password-text">
							Vill du ändra ditt lösenord?
						</p>
					</Row>
				</ProfileCard>
			</Container>
		</>
	);
}
