import React, { useEffect, useState } from 'react';
import { Col, Card, Container, Row, Alert, Button } from 'react-bootstrap';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Icon imports */
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { BiShowAlt } from 'react-icons/bi';
import { FaRegTimesCircle } from 'react-icons/fa';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { currentUser, userDetails, logout, userDelete, deleteFirestoreUser } =
		useAuth();
	const [error, setError] = useState('');
	const history = useHistory();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push('/login');

			/* Catch error */
		} catch (error) {
			setError(error.message);
		}
	}

	async function handleDeleteUser() {
		setError('');

		try {
			await userDelete();
			await deleteFirestoreUser(currentUser.uid);
			history.push('/login');

			/* Catch error */
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<>
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
								onClick={handleDeleteUser}
							>
								<FaRegTimesCircle className="me-2" size={15} />
								Ta bort
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

				<br />

				{/* Change email and password card */}
				<ProfileCard title={'Email & lösenord'}>
					<Col className="text-end me-0">
						<span>
							<Link to={'/change-email-password'}>
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
							Vill du ändra din e-postadress? Eller kanske ditt lösenord?{' '}
						</p>
					</Row>
					<Row className="mt-3">
					<small className="fw-bold ">E-postadress</small>
					<p>{currentUser.email}</p>
				</Row>
				</ProfileCard>
			</Container>
		</>
	);
}
