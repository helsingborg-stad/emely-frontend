import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';

import { Link, useHistory } from 'react-router-dom';

/* Icon imports */
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

/* Variable declaration */
export default function UpdateEmailPassword() {
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
			

			
					<Col className="text-end p-0 me-0">
						<span>
							<Link to={'/profile'}>
								<Button
									variant="outline-success"
									className="rounded-pill pe-3 ps-3  fw-bold register-btn_light"
									id="edit-button"
								>
									<IoIosArrowBack className="me-2" size={15} /> Tillbaka
								</Button>
							</Link>
						</span>
					</Col>

					{/* Username form */}
					<Form onSubmit={handleSubmit} id="update-profile">
						{/* Password form */}
						<Row className="mt-3">
							<Form.Group className="" id="password">
								<Form.Label className="fw-bold">
									<RiLockPasswordLine className="me-2" size={20} />
									Lösenord
								</Form.Label>
								<Form.Control
									className="p-2 input-border"
									type="password"
									ref={passwordRef}
									placeholder="Lämna blankt för att behålla lösenord"
								/>
							</Form.Group>
						</Row>

						{/* Password confirm form */}
						<Row className="mt-3">
							<Form.Group className="" id="password-confirm">
								<Form.Label className="fw-bold">
									<RiLockPasswordLine className="me-2" size={20} /> Upprepa
									lösenord
								</Form.Label>
								<Form.Control
									className="p-2 input-border"
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
								className="p-3 rounded-pill fw-bold register-btn text-white"
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
