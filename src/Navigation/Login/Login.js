import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

import { Link, useHistory, Redirect } from 'react-router-dom';

import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';


/* Icon Imports */
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiLoginCircleLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

/* Variable declaration */
export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, updateUserInfo, translateError, currentUser } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		try{

			if(currentUser.uid) {
				return history.push("/dashboard")
			} 
		} catch(error){
			console.log(error.message)
		}
	}, [])

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMsg('');
			setLoading(true);

			/* Run firebase-auth login function from AuthContext */
			const credentials = await login(emailRef.current.value, passwordRef.current.value);
			const userId = credentials.user.uid
			const lastSignInTime = credentials.user.metadata.creationTime;

			/* Run updateUserInfo to update appropriate fields on login */
			await updateUserInfo(userId, lastSignInTime)
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
		{msg && (
			<AlertMessage message={msg} variant={msgVariant} />
		  )}
			<AuthLayout>
				<h2 className="text-center mb-4 fw-bold" id="login-header">
					Logga in för att fortsätta
				</h2>
				
				<Form onSubmit={handleSubmit}>
				
					{/* Login form */}
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

					<Form.Group id="password" className="mt-4 fw-bold">
						<Form.Label className="input-label">
							<RiLockPasswordLine size={30} /> Lösenord
						</Form.Label>
						<Form.Control
							className="input-field"
							type="password"
							placeholder="Lösenord"
							ref={passwordRef}
							required
						/>
					</Form.Group>

					

					{/* Submit button & Log in */}
					<Button
						disabled={loading}
						className="w-100 mt-5 register-btn"
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
						className="w-100 mt-2 register-btn_light"
						type="submit"
						variant="none"
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
