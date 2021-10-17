import React, { useRef, useState } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import AlertMessage from '../AlertMessage/AlertMessage';


import { useHistory } from 'react-router-dom';


import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

/* Variable declaration */
export default function ProfileInfoEdit() {
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { passwordUpdate, translateError } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setMsgVariant('danger');
			console.log('Passwords dont match');
			return setMsg('Lösenorden matchar inte');
		}
		try {
			setMsg('');
			setLoading(true);
			
			
			 await passwordUpdate(passwordRef.current.value);
			 history.push("login")
			
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}
		setLoading(false);
	
	}


	return (
		<>
			<Container className="p-5">
				<h2 className="text-center mb-4 fw-bold">Ändra Lösenord</h2>

				{msg && <AlertMessage message={msg} variant={msgVariant} />}


				{/* Username form */}
				<Form onSubmit={handleSubmit} id="update-profile">
					{/* Password form */}
					<Row className="mt-3">
						<Form.Group className="" id="password">
							<Form.Label className="input-label">
								<RiLockPasswordLine className="me-2" size={20} />
								Nytt lösenord
							</Form.Label>
							<Form.Control
								className="input-field-small"
								type="password"
								ref={passwordRef}
								placeholder="Lämna blankt för att behålla lösenord"
							/>
						</Form.Group>
					</Row>

					{/* Password confirm form */}
					<Row className="mt-3">
						<Form.Group className="" id="password-confirm">
							<Form.Label className="input-label">
								<RiLockPasswordLine className="me-2" size={20} /> Upprepa
								lösenord
							</Form.Label>
							<Form.Control
								className="input-field-small"
								type="password"
								ref={passwordConfirmRef}
								placeholder="Lämna blankt för att behålla lösenord"
							/>
						</Form.Group>
					</Row>

					<Row className="mb-3 ms-4 mt-5 me-4 ">
						<Button
							disabled={loading}
							type="submit"
							variant="success"
							className="register-btn"
						>
							<AiOutlineUserAdd className="me-2 text-white" size={25} />
							SPARA
						</Button>
					</Row>
				</Form>
			</Container>
		</>
	);
}
