import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import AuthLayout from '../../Components/AuthLayout/AuthLayout';

/* Variable declaration */
export default function UpdateProfile() {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		setLoading(true);
		setError('');

		/* Run updateProfile (username), email & password functions form AuthContext.js */
		if (usernameRef.current.value) {
			promises.push(updateProfile(usernameRef.current.value));
		}

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/dashboard');
			})
			.catch(() => {
				setError('Failed to update account');
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<>
			<AuthLayout>
				<h2 className="text-center mb-5 fw-bold">Uppdatera profil</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					{/* Update different user attribute forms */}
					<Form.Group className="mt-4" id="username">
						<Form.Label className="fw-bold">
							<AiOutlineUser size={30} /> Användarnamn
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3"
							type="text"
							ref={usernameRef}
							required
							defaultValue={currentUser.displayName}
							placeholder="Vad ska vi kalla dig?"
						/>
					</Form.Group>

					<Form.Group className="mt-4 fw-bold" id="email">
						<Form.Label>
							<HiOutlineMail size={30} /> E-postadress
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3"
							type="email"
							ref={emailRef}
							required
							defaultValue={currentUser.email}
						/>
					</Form.Group>
					<Form.Group className="mt-4 fw-bold" id="password">
						<Form.Label>
							<RiLockPasswordLine size={30} /> Lösenord
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3"
							type="password"
							ref={passwordRef}
							placeholder="Lämna blankt för att behålla lösenord"
						/>
					</Form.Group>
					<Form.Group className="mt-4 fw-bold" id="password-confirm">
						<Form.Label>
							<RiLockPasswordLine size={30} /> Upprepa lösenord
						</Form.Label>
						<Form.Control
							className="rounded-pill p-3"
							type="password"
							ref={passwordConfirmRef}
							placeholder="Lämna blankt för att behålla lösenord"
						/>
					</Form.Group>

					{/* Submit changes & update user-profile */}
					<Button
						disabled={loading}
						className="w-100 p-3 mt-5 rounded-pill fw-bold"
						variant="success"
						type="submit"
					>
						<AiOutlineUserAdd size={30} /> UPPDATERA
					</Button>
				</Form>
				<div className="w-100 text-center mt-2 fw-bold">
					<Link to="/dashboard">Tillbaka</Link>
				</div>
			</AuthLayout>
		</>
	);
}
