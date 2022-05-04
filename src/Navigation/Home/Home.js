import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';
import Divider from '@mui/material/Divider';
import emely from '../../Assets/images/emely_work.png';

/* --- Icon Imports --- */
import { HiOutlineKey } from 'react-icons/hi';
import { RiLockUnlockLine } from 'react-icons/ri';
import { RiLockLine } from 'react-icons/ri';


/* --- Variables, Hooks & State --- */
export default function Login() {
	const keyRef = useRef();
	const { getKeys, checkKey, msg, setMsg } = useAuth();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return document.body.style.background = "var(--mainBackground)";
	}, [])


	/* --- Do this on submit button --- */
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const date = new Date();

			setLoading(true);
			setMsg('');

			/* --- Set a timeout on checking the key --- */
			setTimeout(() => {
				setLoading(false);

				/* --- Check if the key is correct --- */
				checkKey(keyRef.current.value);

			}, 1500);
		} catch (error) {
			console.log(error.code);
		}
	}

	return (
		<>
			{msg && <AlertMessage />}

			<AuthLayout>
			<Row className="image-row justify-content-center ">
			<img
			className="home-emely"
			src={emely}
			alt=""
			/>
			</Row>
				<h4 className="text-center mb-5 fw-bold" id="login-header">
					Skriv in din nyckel för att fortsätta vidare <br/> till språkroboten Emely.
				</h4>

				{/* --- Input-key form --- */}
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

					{/* --- Submit the key --- */}
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

					{/* --- Missing key? --- */}
					<Divider className=" text-center divider-text mb-2 mt-4 fw-bold">SAKNAR DU EN NYCKEL? </Divider>
					<p className="text-center fw-bold mt-3 mb-0" style={{ fontSize: '0.9rem' }}>KONTAKTA EMELY</p>
				<p className="text-center mt-0" style={{ fontWeight: '500' }}>
				emely@nordaxon.com
				</p>

					
				</Form>
			</AuthLayout>
		</>
	);
}
