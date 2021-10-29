import React, { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import { auth, dbUsers, db } from '../../firebase';

import AuthLayout from '../../Components/Layout/AuthLayout/AuthLayout';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';

/* Icon Imports */
import { HiOutlineKey } from 'react-icons/hi';
import { RiLockUnlockLine } from 'react-icons/ri';
import { RiLockLine } from 'react-icons/ri';

import {
	collection,
	getDocs,
} from 'firebase/firestore';

/* Variable declaration */
export default function Login() {
	const keyRef = useRef();
	const { correctKey, setCorrectKey, appKey, setAppKey } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const [allKeys, setAllKeys] = useState();

	/* Get the keys on page load */
	useEffect(() => {
		try {
			getKeys();
		} catch (error) {
			console.log(error.code);
		}
	}, []);

	/* Get all keys from firestore */
	async function getKeys() {
		try {
			const querySnapshot = await getDocs(collection(db, 'keys'));
			const allDocs = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				allDocs.push(data);

			});
			setAllKeys(allDocs);
		} catch (error) {
			console.log('Error:' + error.message);
		}
		setLoading(false);
	}

	/* Check if input-key matches one of the keys and todays date matches the deadline in firestore */
	function checkKey(inputKey, date) {
		setLoading(true);

		for (let key of allKeys) {
			if (inputKey === key.key && date <= key.deadline) {
				setAppKey(inputKey);
				setCorrectKey(true);
				return history.push('/login');
			}
		}

		/* Set error message if key don't match */
		setMsgVariant('danger');
		setMsg('Fel nyckel eller passerat utgånsdatum!');
		setLoading(false);
	}

	/* Do this when pressing the submit button */
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			/* Format the date so it matches the deadline date */
			const date = new Date();
			const dd = date.getDate();
			const mm = date.getMonth() + 1;
			const y = date.getFullYear();

			const formattedDate = y + '/' + mm + '/' + dd;
			setLoading(true);

			setMsg('');

			/* Set a timeout on checking the key */
			const timer = setTimeout(() => {
				setLoading(false);
				checkKey(keyRef.current.value, formattedDate);
			}, 3000);

			return timer;

		} catch (error) {
			console.log(error.code);
		}
	}

	return (
		<>
			{msg && <AlertMessage message={msg} variant={msgVariant} />}
			<AuthLayout>
				<h2 className="text-center mb-4 fw-bold" id="login-header">
					Skriv in din nyckel för att fortsätta använda appen
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
					<Button
						disabled={loading}
						className="w-100 mt-5 register-btn"
						type="submit"
					>

					{/* Show keypad-icon unlocked if the page is loading else show locked version */}
						{loading ? (
							<RiLockUnlockLine className="me-3" size={35} />
						) : (
							<RiLockLine className="me-3" size={35} />
						)}
						FORTSÄTT TILL APPEN
					</Button>
				</Form>
			</AuthLayout>
		</>
	);
}
