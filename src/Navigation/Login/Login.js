import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import AuthLayout from '../../Components/AuthLayout/AuthLayout';
import { Link, useHistory } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiLoginCircleLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

/* Variable declaration */
export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);

			/* Run firebase-auth login function from AuthContext.js */
			await login(emailRef.current.value, passwordRef.current.value);
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
				<h2 className="text-center mb-4 fw-bold" id="login-header">
					Logga in för att fortsätta
				</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					{/* Login form */}
					<Form.Group id="email" className="mt-5 fw-bold">
						<Form.Label className="mt-3">
							<HiOutlineMail size={30} /> E-postadress
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3 shadow-sm"
							placeholder="E-postadress"
							type="email"
							ref={emailRef}
							required
						/>
					</Form.Group>

					<Form.Group id="password" className="mt-4 fw-bold">
						<Form.Label className="mt-3">
							<RiLockPasswordLine size={30} /> Lösenord
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3 shadow-sm"
							type="password"
							placeholder="Lösenord"
							ref={passwordRef}
							required
						/>
					</Form.Group>

					{/* Submit button & Log in */}
					<Button
						disabled={loading}
						className="w-100 mt-5 btn-success rounded-pill p-3 fw-bold shadow-sm"
						type="submit"
					>
						<RiLoginCircleLine size={30} /> LOGGA IN
					</Button>
				</Form>
				<div className="w-100 text-center mt-3 fw-bold">
					<Link to="/forgot-password">Glömt lösenord?</Link>
					<hr />
					<h4 className="text-center mb-4 mt-5 fw-bold" id="eller">
						ELLER
					</h4>

					{/* Guest login */}
					<Button
						disabled={loading}
						className="w-100 mt-2 rounded-pill p-3 fw-bold shadow-sm"
						type="submit"
						variant="outline-success"
					>
						<AiOutlineUser size={30} /> LOGGA IN SOM GÄST
					</Button>
				</div>
			</AuthLayout>

			<div className="w-100 text-center mt-3 mb-4 fw-bold">
				Behöver du ett konto? <Link to="/signup">Registrera dig</Link>
			</div>
		</>
	);
}
