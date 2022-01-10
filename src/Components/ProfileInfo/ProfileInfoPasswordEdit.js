import React, { useRef, useState } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

/* --- Icon imports --- */
import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdKeyboardArrowLeft } from 'react-icons/md';

/* --- Variables, Hooks & State --- */
export default function ProfilePasswordEdit(props) {
	/* --- Form references --- */
	const oldPasswordRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const {
		passwordUpdate,
		translateError,
		setMsg,
		setMsgVariant,
		login,
		currentUser,
	} = useAuth();
	const [loading, setLoading] = useState(false);

	/* --- On submit --- */
	async function handleSubmit(e) {
		e.preventDefault();
		setMsg('');

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setMsgVariant('danger');
			console.log('Passwords dont match');
			return setMsg('Lösenorden matchar inte');
		}
		try {
			setMsg('');
			setLoading(true);
			const credential = await login(
				currentUser.email,
				oldPasswordRef.current.value
			);

			await passwordUpdate(passwordRef.current.value);
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));
		}
		setLoading(false);
	}

	return (
		<>
			<Container className="p-5" id="profile-info-password-edit">
				<h2 className="text-center mb-4 fw-bold">Ändra Lösenord</h2>

				
				<Form onSubmit={handleSubmit} id="update-profile">
					{/* --- Old Password form --- */}
					<Row className="mt-3 mb-3">
						<Form.Group className="" id="password">
							<Form.Label className="input-label">
								<RiLockPasswordLine className="me-2" size={20} />
								Nuvarande lösenord
							</Form.Label>
							<Form.Control
								className="input-field-small"
								type="password"
								ref={oldPasswordRef}
								placeholder="Skriv in ditt nya lösenord"
								required
							/>
						</Form.Group>
					</Row>

					{/* --- Password form --- */}
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
								placeholder="Skriv in ditt nya lösenord"
								required
							/>
						</Form.Group>
					</Row>

					{/* --- Password confirm form --- */}
					<Row className="mt-3">
						<Form.Group className="" id="password-confirm">
							<Form.Label className="input-label">
								<RiLockPasswordLine className="me-2" size={20} /> Upprepa nytt
								lösenord
							</Form.Label>
							<Form.Control
								className="input-field-small"
								type="password"
								ref={passwordConfirmRef}
								placeholder="Upprepa ditt nya lösenord"
								required
							/>
						</Form.Group>
					</Row>

					{/* --- Save password changes --- */}
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

						{/* --- Back button --- */}
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
