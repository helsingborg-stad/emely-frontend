import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

/* Icon imports */
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrLanguage } from 'react-icons/gr';
import { FaUserTie } from 'react-icons/fa';

import AuthLayout from '../../Components/AuthLayout/AuthLayout';


/* Variable declaration */
export default function Signup() {
	/* Form value variables */
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const usernameRef = useRef();
	const birthYearRef = useRef();
	const nativeLanguageRef = useRef();
	const currentOccupationRef = useRef();

	const { signup, createUser, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);

			/* Run signup firebase-auth function from AuthContext.js */
			const credential = await signup(
				emailRef.current.value,
				passwordRef.current.value,
			);
			const uid = credential.user.uid;
			await createUser(				
				emailRef.current.value,
				usernameRef.current.value,
				birthYearRef.current.value,
				nativeLanguageRef.current.value,
				currentOccupationRef.current.value,
				uid,
			);

			history.push('/dashboard');

			/* Catch error and print out in alert (in english) */
		} catch (error) {
			setError(error.message);
		}

		setLoading(false);
	}

	return (
		<>
			<AuthLayout>
				<h2 className="text-center mb-5 fw-bold">
					Registrera dig för att börja prata med Emely.
				</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					{/* Register new user forms */}

					{/* Enter email form */}
					<Form.Group id="email" className="fw-bold">
						<Form.Label className="mt-5">
							<HiOutlineMail size={30} /> Vad är din e-postadress?
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3 shadow-sm"
							placeholder="Ange din e-postadress."
							type="email"
							ref={emailRef}
							required
						/>
					</Form.Group>

					{/* Choose password form */}
					<Form.Group id="password" className="mt-4 fw-bold">
						<Form.Label className="mt-3">
							<RiLockPasswordLine size={30} /> Skapa ett lösenord
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3 shadow-sm"
							placeholder="Skapa ett lösenord."
							type="password"
							ref={passwordRef}
							required
						></Form.Control>
					</Form.Group>

					{/* Confirm password form */}
					<Form.Group id="password-confirm" className="mt-4 fw-bold">
						<Form.Label className="mt-3">
							<RiLockPasswordLine size={30} /> Upprepa lösenord
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3 shadow-sm"
							type="password"
							placeholder="Upprepa ditt valda lösenord."
							ref={passwordConfirmRef}
							required
						/>
					</Form.Group>

					<Row>
						{/* Username form */}
						<Col md={6} xs="auto" lg={6}>
							<Form.Group id="username" className="fw-bold">
								<Form.Label className="mt-4">
									<AiOutlineUser size={30} /> Vad ska vi kalla dig?
								</Form.Label>
								<Form.Control
									className="w-100 rounded-pill p-3 shadow-sm"
									placeholder="Användarnamn"
									type="text"
									ref={usernameRef}
									required
								/>
							</Form.Group>
						</Col>

						{/* Birth Year form */}
						<Col md={6} xs="auto" lg={6}>
							<Form.Group id="birthYear" className="fw-bold">
								<Form.Label className="mt-4">
									<AiOutlineCalendar size={30} /> När är du född?
								</Form.Label>
								<Form.Control
									className="w-100 rounded-pill p-3 shadow-sm"
									placeholder="När är du född?"
									type="date"
									defaultValue="1990-01-01"
									ref={birthYearRef}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						{/* Native language form */}
						<Col md={6} xs="auto" lg={6}>
							<Form.Group id="nativeLanguage" className="fw-bold">
								<Form.Label className="mt-5">
									<GrLanguage size={25} /> Vilket språk talar du hemma?
								</Form.Label>
								<Form.Select
									ref={nativeLanguageRef}
									className="rounded-pill p-3 shadow-sm"
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
						</Col>

						{/* Current occupation form */}
						<Col md={6} xs="auto" lg={6}>
							<Form.Group id="currentOccupation" className="fw-bold">
								<Form.Label className="mt-5">
									<FaUserTie size={25} /> Vad är din syselsättning?
								</Form.Label>
								<Form.Select
									ref={currentOccupationRef}
									className="rounded-pill p-3 shadow-sm"
									defaultValue="Arbetslös"
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
						</Col>
					</Row>

					{/* Submit buttons */}
					<Button
						disabled={loading}
						className="w-100 mt-5 p-3 btn-success rounded-pill fw-bold shadow-sm register-btn"
						type="submit"
					>
						<AiOutlineUserAdd size={30} />
						REGISTRERA DIG
					</Button>
				</Form>
        <div className="w-100 text-center mt-3 fw-bold">
          Har du ett konto? <Link to="/login">Logga In</Link>
        </div>
      </AuthLayout>
    </>
  );
}
