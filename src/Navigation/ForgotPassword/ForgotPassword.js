import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import AuthLayout from '../../Components/AuthLayout/AuthLayout';

/* Variable declaration */
export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);

			/* Run resetPassword function from AuthContext.js */
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');

			/* Catch error and print out in alert (in english) */
		} catch (error) {
			setError(error.message);
		}

		setLoading(false);
	}

	return (
		<>
			<AuthLayout>
			
				<h2 className="text-center mb-5 fw-bold" id="password-reset">
					Återställ ditt lösenord
				</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				{message && <Alert variant="success">{message}</Alert>}

				{/* Reset password form */}
				<Form onSubmit={handleSubmit}>
					<Form.Group id="email">
						<Form.Label><HiOutlineMail size={30} /> E-postadress</Form.Label>
						<Form.Control
							placeholder="Skriv din e-postadress för att återställa lösenord"
							className="p-3 rounded-pill shadow-sm"
							type="email"
							ref={emailRef}
							required
						/>
					</Form.Group>

					{/* Submit button & send instructions to mail */}
					<Button
						disabled={loading}
						className="w-100 mt-3 p-3 rounded-pill btn-success mt-5 fw-bold"
						id="button-main"
						type="submit"
					>
					<HiOutlineMail size={30} /> ÅTERSTÄLL LÖSENORD
					</Button>
				</Form>
				<div className="w-100 text-center mt-3 fw-bold">
					<Link to="/login">Login</Link>
				</div>

				<div className="w-100 text-center mt-2 fw-bold">
					Behöver ett konto? <Link to="/signup">Registrera dig</Link>
				</div>
				</AuthLayout>
		</>
	);
}