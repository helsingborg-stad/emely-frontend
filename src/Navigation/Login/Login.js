import React, { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import Divider from '@mui/material/Divider';

/* Icon Imports */
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiLoginCircleLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';

/* Variable declaration */
export default function Login() {

	/* ------ Form references ------ */
	const emailRef = useRef();
	const passwordRef = useRef();

	/* ------ Hooks & State ------ */
	const { login, updateUserInfo, translateError, currentUser, guestId, setMsg, setMsgVariant } = useAuth();
	const { useHuggingFace } = useAuth();
	const [loading, setLoading] = useState(false);
	const history = useHistory();


	useEffect(() => {
		/* --- If userid is not guest then push to dashboard when on login page --- */
		try {
			if (currentUser.uid !== guestId) {
				return history.push('/dashboard');
			}
		} catch (error) {
			console.log(error.message);
		}
	}, [currentUser]);

	/* --- Running this function on "Fortsätt som Gäst" --- */
	async function handleGuestLogin(e) {
		e.preventDefault();

		try {
			setMsg('');
			setLoading(true);

			/* --- Login with Guest credentials --- */
			await login('guest@emely.com', 'guest123');
			history.push('/dashboard');

			/*  Catch error & translate in a function */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}

		setLoading(false);
	}

	/* --- Running this function on Logga in --- */
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMsg('');
			setLoading(true);

			/* --- Login function from AuthContext --- */
			const credentials = await login(
				emailRef.current.value,
				passwordRef.current.value
			);
			const userId = credentials.user.uid;
			const lastSignInTime = credentials.user.metadata.creationTime;

			/* --- Run updateUserInfo to update appropriate fields on login --- */
			await updateUserInfo(userId, lastSignInTime);
			history.push('/dashboard');

			/* --- Catch error & translate in a function --- */
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
				<h2 className="text-center mb-4 fw-bold" id="login-header">
					Logga in för att fortsätta
				</h2>


				{/* ---- Login form ---- */}
				<Form onSubmit={handleSubmit}>
					{/* ---- Email form ---- */}
					<Form.Group id="email" className="mt-5 fw-bold">
						<Form.Label className="mt-3 input-label">
							<HiOutlineMail size={30} /> E-postadress
						</Form.Label>
						<Form.Control
							className="input-field"
							placeholder="E-postadress"
							type="email"
							ref={emailRef}
							required
						/>
					</Form.Group>

					{/* ---- Password form ---- */}
					<Form.Group id="password" className="mt-4 fw-bold">
						<Form.Label className="input-label">
							<RiLockPasswordLine size={30} /> Lösenord
						</Form.Label>
						<Form.Control
							className="input-field mb-2"
							type="password"
							placeholder="Lösenord"
							ref={passwordRef}
							required
						/>
					</Form.Group>

					{/* ---- Forgot password? ---- */}
					<div className="w-100 text-end fw-bold">
						<p className="me-4" style={{ fontWeight: '600' }}>
							{' '}
							<Link id="text-link" to="/forgot-password">
								Glömt lösenord?
							</Link>
						</p>
					</div>

					{/* ---- Submit & Login button ---- */}
					<Button
						disabled={loading}
						className="w-100 mt-3 register-btn"
						type="submit"
					>
						<RiLoginCircleLine size={30} /> LOGGA IN
					</Button>
				</Form>

				<h4 className="text-center mb-4 mt-5 fw-bold" id="eller">
					<Divider>ELLER</Divider>
				</h4>

				{/* ---- Guest login ---- */}
				<Form onSubmit={handleGuestLogin}>
					<Button
						disabled={loading}
						className="w-100 mt-2 register-btn_light"
						type="submit"
						variant="none"
					>
						<AiOutlineUser size={30} /> FORTSÄTT SOM GÄST
					</Button>
				</Form>

				{/* ---- Need an account? ---- */}
				<h6 className="text-center mb-4 mt-5 fw-bold" id="eller">
					<Divider>BEHÖVER DU ETT KONTO?</Divider>
				</h6>

				{/* ---- Create new account button ---- */}
				<Link id="text-link" to="/signup">
					<Button
						variant="none"
						className="w-100 register-btn"
						id="edit-button"
					>
						<AiOutlineUserAdd size={30} /> SKAPA NY ANVÄNDARE
					</Button>
				</Link>
			</AuthLayout>
		</>
	);
}
