import React, { useRef, useState, useEffect } from 'react';
import {
	Form,
	Button,
	Alert,
	Row,
	Col,
	Container,
} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';


import { Link, useHistory } from 'react-router-dom';

/* Icon imports */
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';


/* Variable declaration */
export default function UpdateEmailPassword() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { currentUser, passwordUpdate, emailUpdate, userDetails } = useAuth();
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

		/* Run update methods from AuthContext */
		try {
			if (emailRef.current.value !== currentUser.email) {
				promises.push(emailUpdate(emailRef.current.value));
			}
			if (passwordRef.current.value) {
				promises.push(passwordUpdate(passwordRef.current.value));
			}

			Promise.all(promises)
				.then(() => {
					history.push('/profile');
				})
				.catch((error) => {
					setError(error.message);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			<Container>
				<Row>
					<UserMenu />
				</Row>
				<h2 className="text-center mb-4 fw-bold">Email & Lösenord</h2>

				<ProfileCard
					title={'Ändra Email & Lösenord'}
				>
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
					{error && <Alert variant="danger">{error}</Alert>}
					{/* Username form */}
					<Form onSubmit={handleSubmit} id="update-profile">
						
							{/* Email form */}
							<Row className="mt-5">
								<Form.Group className="" id="email">
									<Form.Label className="fw-bold">
										<HiOutlineMail className="me-2" size={20} />
										E-postadress
									</Form.Label>
									<Form.Control
										className="p-2 input-border"
										type="email"
										ref={emailRef}
										required
										defaultValue={currentUser.email}
									/>
								</Form.Group>
							</Row>
						
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
				</ProfileCard>
			</Container>
		</>
	);
}
