import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from '../UserMenu/UserMenu';
import AlertMessage from '../AlertMessage/AlertMessage';
import ProfileCard from '../Layout/ProfileCard/ProfileCard';

import { Link, useHistory } from 'react-router-dom';

/* Icon imports */
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrLanguage } from 'react-icons/gr';
import { FaUserTie } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

/* Variable declaration */
export default function ProfileInfoEdit() {
	const usernameRef = useRef();
	const birthYearRef = useRef();
	const nativeLanguageRef = useRef();
	const currentOccupationRef = useRef();
	const emailRef = useRef();

	const [msg, setMsg] = useState();
	const [msgVariant, setMsgVariant] = useState();

	const {
		currentUser,
		userDetails,
		updateUsername,
		updateCurrentOccupation,
		updateBirthYear,
		updateNativeLanguage,
	} = useAuth();
	const [error, setError] = useState('');
	const [done, setDone] = useState(null);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function handleReload() {}

	async function handleSubmit(e) {
		e.preventDefault();

		const promises = [];
		const updates = [];

		setLoading(true);
		setError('');

		/* Run update methods from AuthContext */
		try {
			if (usernameRef.current.value !== userDetails.username) {
				promises.push(
					updateUsername(currentUser.uid, usernameRef.current.value)
				);
				updates.push('Användarnamn');
				
			}
			
			if (
				currentOccupationRef.current.value !== userDetails.current_occupation
			) {
				promises.push(
					updateCurrentOccupation(
						currentUser.uid,
						currentOccupationRef.current.value
						)
						);
						updates.push('Sysselsättning');
						
			}

			if (birthYearRef.current.value !== userDetails.birth_year) {
				promises.push(
					updateBirthYear(currentUser.uid, birthYearRef.current.value)
				);
				updates.push('Födelsedatum');
			}

			if (nativeLanguageRef.current.value !== userDetails.native_language) {
				promises.push(
					updateNativeLanguage(currentUser.uid, nativeLanguageRef.current.value)
				);
				updates.push('Modersmål');
			}

			await Promise.all(promises)
				.then(() => {})
				.catch((error) => {
					setError(error.message);
				})
				.finally(() => {
					setLoading(false);

					for (let i of updates) {
						const updatesToString = updates.join(', ').toString();
						console.log(i);
						setMsg(updatesToString + ' har uppdaterats')
					}

					
					setMsgVariant('success');
					history.push('/profile');
				});
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			{/* ------------ Alert for error messages: fixed-top ------------ */}
			{msg && <AlertMessage message={msg} variant={msgVariant} />}
			<Container>
				<h2 className="text-center mb-2 fw-bold">Redigera profil</h2>

				<ProfileCard title={'Redigera uppgifter'}>
					{error && <Alert variant="danger">{error}</Alert>}

					{/* Username form */}
					<Form onSubmit={handleSubmit} id="update-profile">
						<Row className="mt-5">
							<Form.Group className="" id="username">
								<Form.Label className="fw-bold">
									<AiOutlineUser className="me-2" size={20} />
									Användarnamn
								</Form.Label>
								<Form.Control
									className="p-2 input-border"
									type="text"
									ref={usernameRef}
									required
									defaultValue={userDetails && userDetails.username}
									placeholder="Vad ska vi kalla dig?"
								/>
							</Form.Group>
						</Row>

						<Row className="mt-3">
							<Form.Group className="" id="email">
								<Form.Label className="fw-bold">
									<HiOutlineMail className="me-2" size={20} />
									E-postadress
								</Form.Label>
								<Form.Control
									disabled
									className="p-2 input-border"
									type="text"
									ref={emailRef}
									required
									defaultValue={userDetails && userDetails.email}
								/>
							</Form.Group>
						</Row>

						{/* Birth year form */}
						<Row className="mt-3">
							<Form.Group id="birthYear">
								<Form.Label className="fw-bold">
									<AiOutlineCalendar className="me-2" size={20} /> När är du
									född?
								</Form.Label>
								<Form.Control
									className="p-2 input-border"
									placeholder="När är du född?"
									type="date"
									defaultValue={userDetails && userDetails.birth_year}
									ref={birthYearRef}
									required
								/>
							</Form.Group>
						</Row>

						{/* Native language form */}
						<Row className="mt-3">
							<Form.Group id="nativeLanguage">
								<Form.Label className="fw-bold">
									<GrLanguage className="me-2" size={20} /> Vilket språk talar
									du hemma?
								</Form.Label>
								<Form.Select
									ref={nativeLanguageRef}
									className="p-2 input-border"
									defaultValue={userDetails && userDetails.native_language}
								>
									<option>Svenska</option>
									<option>Engelska</option>
									<option>Arabiska</option>
									<option>Italienska</option>
									<option>Spanska</option>
									<option>Bosniska</option>
									<option>Serbiska</option>
									<option>Kroatiska</option>
								</Form.Select>
							</Form.Group>
						</Row>

						{/* Current occupation form */}
						<Row className="mt-3">
							<Form.Group id="currentOccupation">
								<Form.Label className="fw-bold">
									<FaUserTie className="me-2" size={20} /> Vad är din
									syselsättning?
								</Form.Label>
								<Form.Select
									ref={currentOccupationRef}
									className="p-2 input-border"
									defaultValue={userDetails && userDetails.current_occupation}
								>
									<option>Arbetslös</option>
									<option>Söker arbete</option>
									<option>Sjukskriven</option>
									<option>Heltidsjobb</option>
									<option>Deltidsjobb</option>
									<option>Timanställd</option>
									<option>Föräldraledig</option>
								</Form.Select>
							</Form.Group>
						</Row>

						<Row className="mb-3 ms-4 mt-5 me-4 ">
							<Button
								disabled={loading}
								type="submit"
								variant="success"
								className="p-3 rounded-pill fw-bold register-btn text-white"
							>
								<AiOutlineUserAdd className="me-2 text-white" size={25} />
								SPARA
							</Button>
						</Row>
					</Form>
				</ProfileCard>
			</Container>
		</>
	);
}
