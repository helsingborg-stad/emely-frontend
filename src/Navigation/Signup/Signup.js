import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';

/* Variable declaration */
export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
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
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push('/');

			/* Catch error and print out in alert (in english) */
		} catch (error) {
			setError(error.message);
		}

		setLoading(false);
	}

	return (
		<>
			<div id="container-signup">
				<h2 className="text-center mb-5 fw-bold">
					Registrera dig för att börja prata med Emely.
				</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					{/* Register new user form */}
					<Form.Group  id="email">
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
					<Form.Group id="password" className="mt-4">
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
					<Form.Group id="password-confirm" className="mt-4">
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

					{/* Submit buttons */}
					<Button
						disabled={loading}
						className="w-100 mt-5 p-3 btn-success rounded-pill fw-bold shadow-sm"
						type="submit"
					>
						<AiOutlineUserAdd size={30} />
						 REGISTRERA DIG
					</Button>
				</Form>

				<div className="w-100 text-center mt-3 fw-bold">
					Har du ett konto? <Link to="/login">Logga In</Link>
				</div>
			</div>
		</>
	);
}
