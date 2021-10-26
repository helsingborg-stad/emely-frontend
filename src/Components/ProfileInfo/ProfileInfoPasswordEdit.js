import React, { useRef, useState } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import AlertMessage from '../AlertMessage/AlertMessage';

import { useHistory, Link } from 'react-router-dom';

import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdKeyboardArrowLeft } from 'react-icons/md';

/* Variable declaration */
export default function ProfilePasswordEdit(props) {
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { passwordUpdate, translateError, logout } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleLogout() {
		setMsg('');

		try {
			await logout();
			history.push('/login');

			/* Catch error */
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}
	}

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

			handleLogout();
			
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
								required
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
								required
							/>
						</Form.Group>
					</Row>

					<Row className="mb-3 mt-5">
						<Col className="mb-3" md={6} lg={6} xs={12}>
							<Button
								disabled={loading}
								type="submit"
								className="w-100 register-btn"
							>
								<AiOutlineUserAdd className="me-2 text-white" size={25} />
								SPARA
							</Button>
						</Col>

						<Col className="" md={6} lg={6} xs={12}>
							<Link to="/profile">
								<Button
									disabled={loading}
									variant="outline-success"
									className="w-100 register-btn_light"
									onClick={props.closeModal}
								>
									<MdKeyboardArrowLeft size={25} /> TILLBAKA
								</Button>
							</Link>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
}
