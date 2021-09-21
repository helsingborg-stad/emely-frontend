import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

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
			history.push('/');

			/* Catch error and print out in alert (in english) */
		} catch (error) {
			setError(error.message);
		}

		setLoading(false);
	}

	return (
		<>
			<Card className="mt-5 shadow" id="main-card">
				<Card.Body className="p-5" id="login-card">
					<h2 className="text-center mb-4 fw-bold" id="login-header">
						Logga in för att fortsätta
					</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
					
						{/* Login form */}
						<Form.Group id="email" className="mt-5">
							<Form.Label>E-postadress</Form.Label>
							<Form.Control className="rounded-pill p-3 fw-bold" placeholder="E-postadress" type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password" className="mt-4">
							<Form.Label>Lösenord</Form.Label>
							<Form.Control className="rounded-pill p-3 fw-bold" type="password" placeholder="Lösenord" ref={passwordRef} required />
						</Form.Group>

						{/* Submit button & Log in */}
						<Button disabled={loading} className="w-100 mt-5 btn-primary rounded-pill p-3" id="login-button" type="submit">
							<i className="fa fa-user-circle"></i> LOGGA IN
						</Button>
					</Form>
					<div className="w-100 text-center mt-3 fw-bold">
						<Link to="/forgot-password">Glömt lösenord?</Link>
						<hr />
						<h4 className="text-center mb-4 mt-5 fw-bold" id="eller">
							ELLER
						</h4>

						{/* Guest login */}
						<Button disabled={loading} className="w-100 mt-2 btn-secondary rounded-pill p-3" id="guest-button" type="submit">
							<i className="fa fa-user-circle"></i> LOGGA IN SOM GÄST
						</Button>
					</div>
				</Card.Body>
			</Card>

			<div className="w-100 text-center mt-3 mb-4 fw-bold">
				Behöver du ett konto? <Link to="/signup">Registrera dig</Link>
			</div>
		</>
	);
}
