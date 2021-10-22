import React, { useRef, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

/* --- Icon imports --- */
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrLanguage } from 'react-icons/gr';
import { FaUserTie } from 'react-icons/fa';

import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';

export default function Signup() {
	/* ------ Form value variables ------ */
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const usernameRef = useRef();
	const birthYearRef = useRef();
	const nativeLanguageRef = useRef();
	const currentOccupationRef = useRef();
	/* ----------------------------------- */

	/* ------ Hooks ------ */
	const { signup, createUser, translateError } = useAuth();
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [msgVariant, setMsgVariant] = useState('');
	const history = useHistory();
	/* ----------------------------------- */


	/* ------ Open user terms onClick ------ */
	function handleEndUserTerms(e) {
		e.preventDefault();

		window.open(
			'/end-user-terms',
			'User Terms',
			'width=1000, height=1000',
			'resizable,scrollbars,status'
		);
	}

	async function handleSubmit(e) {
		e.preventDefault();


			/* ------ Start with, checking if the passwords match ------ */
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setMsgVariant('danger');
			return setMsg('Lösenorden matchar inte');
		}

		try {
			setMsg('');
			setLoading(true);

			/* Run sign-up function from context which communicates with Firebase */
			const credential = await signup(
				emailRef.current.value,
				passwordRef.current.value
			);
			const uid = credential.user.uid;
			const creationTime = credential.user.metadata.creationTime;

			/*  When signing up, send information to Firestore  */
			await createUser(
				emailRef.current.value,
				usernameRef.current.value,
				birthYearRef.current.value,
				nativeLanguageRef.current.value,
				currentOccupationRef.current.value,
				uid,
				creationTime
			);

			history.push('/dashboard');

			/*  Catch error & translate in a function */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
			
		}

		setLoading(false);
	}

	return (
		<>
			{/* ------------ Alert for error messages: fixed-top ------------ */}
			{msg && (
				<AlertMessage message={msg} variant={msgVariant} />
			  )}
			<AuthLayout>
				<h2 className="text-center fw-bold mb-5">
					Registrera dig för att börja prata med Emely.
				</h2>

				{/* ------------ All forms ------------ */}
				<Form onSubmit={handleSubmit}>
					{/* ------------ Email form ------------ */}
					<Form.Group id="email" className="fw-bold">
						<Form.Label className=" input-label">
							<HiOutlineMail size={30} /> Vad är din e-postadress?
						</Form.Label>
						<Form.Control
							className="input-field"
							placeholder="Ange din e-postadress."
							type="email"
							ref={emailRef}
							required
						/>
					</Form.Group>

					{/* ------------ Choose password form ------------ */}
					<Form.Group id="password" className=" fw-bold">
						<Form.Label className=" input-label">
							<RiLockPasswordLine size={30} /> Skapa ett lösenord <small className="fw-normal">(minst 6 karaktärer)</small>
						</Form.Label>
						<Form.Control
							className="input-field"
							placeholder="Skapa ett lösenord."
							type="password"
							ref={passwordRef}
							required
						></Form.Control>

					</Form.Group>

					{/* ------------ Confirm password form ------------ */}
					<Form.Group id="password-confirm" className="fw-bold">
						<Form.Label className=" input-label">
							<RiLockPasswordLine size={30} /> Upprepa lösenord
						</Form.Label>
						<Form.Control
							className="input-field"
							type="password"
							placeholder="Upprepa ditt valda lösenord."
							ref={passwordConfirmRef}
							required
						/>
					</Form.Group>

					{/* ------------ Username form ------------ */}
					<Row>
						
							<Form.Group id="username" className="fw-bold">
								<Form.Label className="input-label">
									<AiOutlineUser size={30} /> Vad ska vi kalla dig?
								</Form.Label>
								<Form.Control
									className="w-100 input-field"
									placeholder="Användarnamn"
									type="text"
									ref={usernameRef}
									required
								/>
							</Form.Group>
						

						{/* ------------ Birth date form ------------ */}
						
							<Form.Group id="birthYear" className="fw-bold">
								<Form.Label className="input-label">
									<AiOutlineCalendar size={30} /> När är du född?
								</Form.Label>
								<Form.Control
									className="w-100 input-field"
									placeholder="När är du född?"
									type="date"
									defaultValue="1990-01-01"
									ref={birthYearRef}
									required
								/>
							</Form.Group>
						
					</Row>

					{/* ------------ Native language form ------------ */}
					<Row>
						
							<Form.Group id="nativeLanguage" className="fw-bold">
								<Form.Label className="input-label">
									<GrLanguage size={25} /> Vilket språk talar du hemma?
								</Form.Label>
								<Form.Select
									ref={nativeLanguageRef}
									className="input-field"
									defaultValue="Svenska"
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
						

						{/* ------------ Current occupation form ------------ */}
					
							<Form.Group id="currentOccupation" className="fw-bold">
								<Form.Label className="input-label">
									<FaUserTie size={25} /> Vad är din sysselsättning?
								</Form.Label>
								<Form.Select
									ref={currentOccupationRef}
									className="input-field"
									defaultValue="Arbetslös"
									
								>
								
									<option>Arbetssökande</option>
									<option>Studerande</option>
									<option>Sjukskriven</option>
									<option>Heltidsjobb</option>
									<option>Deltidsjobb</option>
									<option>Timanställd</option>
									<option>Föräldraledig</option>
								</Form.Select>
							</Form.Group>
						
					</Row>

					{/* ------------ Checkbox user terms ------------ */}
					<Row>
						<Form.Group
							className="mb-3 mt-4 ms-3"
							controlId="formBasicCheckbox"
						>
							<Form.Check
								required
								type="checkbox"
								style={{ display: 'inline' }}
							/>{' '}
							<span id="checkbox-text" className="text-end ms-3 ">
								Jag godkänner{' '}
								<Button
									className="p-0"
									variant="none"
									target="_blank"
									onClick={handleEndUserTerms}
								>
									{' '}
									<b>NordAxons användningsvillkor</b>{' '}
								</Button>
							</span>
						</Form.Group>
					</Row>

					{/* ------------ Login buttons ------------ */}
					<Button
						disabled={loading}
						className="w-100 mt-3 register-btn"
						type="submit"
					>
						<AiOutlineUserAdd size={30} />
						SKAPA ANVÄNDARE
					</Button>
				</Form>
				<div className="w-100 text-center mt-3 fw-bold">
					Har du ett konto? <Link to="/login">Logga In</Link>
				</div>
			</AuthLayout>
		</>
	);
}
