import React, { useEffect, useState } from 'react';
import { Col, Card, Container, Row, Alert, Button } from 'react-bootstrap';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import { useHistory } from 'react-router-dom';

/* Icon imports */
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { BiShowAlt } from 'react-icons/bi';
import { FaRegTimesCircle } from 'react-icons/fa';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { currentUser, userDetails, logout } = useAuth();
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

	return (
		<>
			<Container>
				<Row>
					<UserMenu />
				</Row>
				<h2 className="text-center mb-4 mt-5 fw-bold">Användarkonto</h2>
				<ProfileCard title={'Mina uppgifter'} buttonText={'Redigera'} linkTo={'/update-profile'} buttonIcon={<AiOutlineEdit className="me-2" size={15} />}>
					<Row className="m-3">
						<small className="fw-bold p-0">Användarnamn</small>
						{userDetails && userDetails.username}
					</Row>
					<Row className="m-3">
						<small className="fw-bold p-0">E-postadress</small>
						{currentUser.email}
					</Row>
					<Row className="m-3">
						<small className="fw-bold p-0">Födelsedatum</small>
						{userDetails && userDetails.birth_year}
					</Row>
					<Row className="m-3">
						<small className="fw-bold p-0">Modersmål</small>
						{userDetails && userDetails.native_language}
					</Row>
					<Row className="m-3">
						<small className="fw-bold p-0">Sysselsättning</small>
						{userDetails && userDetails.current_occupation}
					</Row>
					<Row className="text-end mb-3 pe-3">
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

				<br/>
				<ProfileCard title={'Samtalshistorik'} buttonText={'Visa'} linkTo={'/chat-history'} buttonIcon={<BiShowAlt className="me-2" size={15} />}>
				
				</ProfileCard>
				<br/>
				<ProfileCard title={'Radera användare'} buttonText={'Radera'} linkTo={'/delete-profile'} buttonIcon={<FaRegTimesCircle className="me-2" size={15} />}>
				
				</ProfileCard>

				<br/>
				<ProfileCard title={'Byt lösenord'} buttonText={'Redigera'} linkTo={'/change-password'} buttonIcon={<BiShowAlt className="me-2" size={15} />}>
				
				</ProfileCard>
			</Container>
		</>
	);
}
