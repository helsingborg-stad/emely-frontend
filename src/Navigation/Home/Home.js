import React, { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';

/* Icon Imports */
import { HiOutlineKey } from 'react-icons/hi';
import { RiLockUnlockLine } from 'react-icons/ri';
import { RiLockLine } from 'react-icons/ri';

/* Variable declaration */
export default function Login() {
	const keyRef = useRef();
	const { correctKey, getKeys, checkKey } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [loading, setLoading] = useState(false);

	/* Get the keys on page load */
	useEffect(() => {
		try {
			getKeys();
		} catch (error) {
			console.log(error.code);
		}
	}, []);

	/* Do this when pressing the submit button */
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const date = new Date();

			setLoading(true);
			setMsg('');

			/* Set a timeout on checking the key */
			setTimeout(() => {
				setLoading(false);
				checkKey(keyRef.current.value, date);
				if (correctKey !== true) {
					setMsgVariant('danger');
					return setMsg('Fel nyckel eller passerat utgångsdatum!');
				}
			}, 1500);
		} catch (error) {
			console.log(error.code);
		}
	}

	return (
		<>
			{msg && <AlertMessage message={msg} variant={msgVariant} />}
			<AuthLayout>
				<h2 className="text-center mb-5 fw-bold" id="login-header">
					Skriv in din nyckel för att fortsätta vidare till språkroboten Emely
				</h2>

				{/* Input-key form */}
				<Form onSubmit={handleSubmit}>
					<Form.Group id="password" className="mt-4 fw-bold">
						<Form.Label className="input-label">
							<HiOutlineKey className="me-2" size={30} /> Aktiveringsnyckel
						</Form.Label>
						<Form.Control
							className="input-field"
							type="password"
							placeholder="Skriv in din aktiveringsnyckel"
							ref={keyRef}
							required
						/>
					</Form.Group>
					{/* Submit the key */}
					{/* Show keypad-icon unlocked if the page is loading else show locked version */}
					{loading ? (
						<Button
							disabled={loading}
							className="w-100 mt-5 register-btn"
							type="submit"
						>
							<RiLockUnlockLine className="me-3" size={25} /> LÅSER UPP...
						</Button>
					) : (
						<Button
							disabled={loading}
							className="w-100 mt-5 register-btn"
							type="submit"
						>
							<RiLockLine className="me-3" size={25} /> ANVÄND NYCKEL
						</Button>
					)}
					<hr/>
					<p className="text-center" style={{ fontWeight: '600' }}>
					Saknar du en nyckel? Kontakta Emely på: <br/>emely@nordaxon.com
					</p>
					
				</Form>
			</AuthLayout>
		</>
	);
}
