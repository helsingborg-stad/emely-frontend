import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
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

export default function Signup() {
	/* ------ Form value variables ------ */
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const usernameRef = useRef();
	const birthYearRef = useRef();
	const nativeLanguageRef = useRef();
	const currentOccupationRef = useRef();

	/* --- Hooks & State --- */
	const { signup, createUser, translateError, setMsg, setMsgVariant } =
		useAuth();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		emailRef.current.focus();
	}, [])

	/* --- Open user terms onClick --- */
	function handleEndUserTerms(e) {
		e.preventDefault();

		window.open(
			'/end-user-terms',
			'User Terms',
			'width=1000, height=1000',
			'resizable,scrollbars,status'
		);
	}

	/* --- Do this when submitting --- */
	async function handleSubmit(e) {
		e.preventDefault();

		/* --- Start with, checking if the passwords match --- */
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setMsgVariant('danger');
			return setMsg('Lösenorden matchar inte');
		}

		try {
			setMsg('');
			setLoading(true);

			/* --- Signup Firebase auth function --- */
			const credential = await signup(
				emailRef.current.value,
				passwordRef.current.value
			);
			const uid = credential.user.uid;

			const d = new Date();
			const date = d.toISOString().split("T")[0];
			const time = d.toTimeString().split(" ")[0];

			const creationTime = `${date} ${time}`;

			/* --- Send sign up information to Firestore database (users or users-debug) --- */
			await createUser(
				emailRef.current.value,
				usernameRef.current.value,
				birthYearRef.current.value,
				nativeLanguageRef.current.value,
				currentOccupationRef.current.value,
				uid,
				creationTime
			);
			setMsg('Välkommen till språkroboten Emely! Ditt konto har nu skapats.');
			setMsgVariant('success');
			history.push('/dashboard');

			/*  --- Catch error & translate --- */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}

		setLoading(false);
	}

	return (
		<>
			<AuthLayout>
				<h2 className="text-center fw-bold mb-5">
					Registrera dig för att börja prata med Emely.
				</h2>

				{/* ------------ All forms ------------ */}
				<Form onSubmit={handleSubmit}>
					{/* ------------ Email form ------------ */}
					<Form.Group id="email" className="fw-bold">
						<Form.Label className=" input-label">
							<HiOutlineMail className="label-icons" size={30} /> Vad är din
							e-postadress?
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
							<RiLockPasswordLine className="label-icons" size={30} /> Skapa ett
							lösenord <small className="fw-normal">(minst 6 karaktärer)</small>
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
							<RiLockPasswordLine className="label-icons" size={30} /> Upprepa
							lösenord
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
								<AiOutlineUser className="label-icons" size={30} /> Vad ska vi
								kalla dig?
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
								<AiOutlineCalendar className="label-icons" size={30} /> Vilket
								år är du född?
							</Form.Label>
							<Form.Control
								className="w-100 input-field"
								placeholder="När är du född?"
								type="number"
								defaultValue="1990"
								ref={birthYearRef}
								required
							/>
						</Form.Group>
					</Row>

					{/* ------------ Native language form ------------ */}
					<Row>
						<Form.Group id="nativeLanguage" className="fw-bold">
							<Form.Label className="input-label">
								<GrLanguage className="label-icons" size={20} /> Vilket språk
								talar du hemma?
							</Form.Label>
							<Form.Select
								ref={nativeLanguageRef}
								className="input-field"
								defaultValue="Svenska"
							>
								<option>Albanska</option>
								<option>Arabiska</option>
								<option>Arameiska</option>
								<option>Bosniska</option>
								<option>Danska</option>
								<option>Engelska</option>
								<option>Finska</option>
								<option>Kantonesiska</option>
								<option>Kroatiska</option>
								<option>Kurdiska</option>
								<option>Montenegrinska</option>
								<option>Norska</option>
								<option>Persiska</option>
								<option>Polska</option>
								<option>Ryska</option>
								<option>Serbiska</option>
								<option>Somaliska</option>
								<option>Spanska</option>
								<option>Svenska</option>
								<option>Thailändska</option>
								<option>Turkiska</option>
								<option>Tyska</option>
								<option>Ungerska</option>
								<option>Annat</option>
							</Form.Select>
						</Form.Group>

						{/* ------------ Current occupation form ------------ */}

						<Form.Group id="currentOccupation" className="fw-bold">
							<Form.Label className="input-label">
								<FaUserTie className="label-icons" size={20} /> Vad är din
								sysselsättning?
							</Form.Label>
							<Form.Select
								ref={currentOccupationRef}
								className="input-field"
								defaultValue="Arbetssökande"
							>
								<option>Arbetssökande</option>
								<option>Studerande</option>
								<option>Sjukskriven</option>
								<option>Heltidsjobb</option>
								<option>Deltidsjobb</option>
								<option>Timanställd</option>
								<option>Föräldraledig</option>
								<option>Annat</option>
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
									<b id="text-link">NordAxons användningsvillkor</b>{' '}
								</Button>
							</span>
						</Form.Group>
					</Row>

					{/* ------------ Submit & Register new user buttons ------------ */}
					<Button
						disabled={loading}
						className="w-100 mt-3 register-btn"
						type="submit"
					>
						<AiOutlineUserAdd size={30} />
						SKAPA ANVÄNDARE
					</Button>
				</Form>

				{/* ------------ Login Button ------------ */}
				<div className="w-100 text-center mt-3 fw-bold">
					<p style={{ fontWeight: '600' }}>
						{' '}
						Har du ett konto?{' '}
						<Link id="text-link" to="/login">
							Logga In
						</Link>
					</p>
				</div>
			</AuthLayout>
		</>
	);
}
