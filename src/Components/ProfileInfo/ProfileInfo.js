import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';
import ProfileInfoEdit from './ProfileInfoEdit';
import { useHistory } from 'react-router-dom';


/* Icon imports */
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { userDetails, logout } = useAuth();
	const history = useHistory();

	const { translateError } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
    const [show, setShow] = useState(false);

	
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    
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

	return (
		<>
			{/* ------------ Alert for error messages: fixed-top ------------ */}
			{msg && <AlertMessage message={msg} variant={msgVariant} />}
		
				<ProfileCard>

					{/* --- My information card --- */}
					<Row className="p-0 m-0">
						<Col xs="auto" md={8} lg={8}>
							<h4 className="mb-3 fw-bold">Min uppgifter</h4>
						</Col>
						<Col xs="auto" md={4} lg={4} className="text-end p-0">
							<span>
								
									<Button
										variant="none"
										className="register-btn_light_small"
										id="edit-button"
                                        onClick={handleShow}
									>
										<AiOutlineEdit className="me-2" size={15} />
										Redigera
									</Button>
								
							</span>
						</Col>
					</Row>

					
					{/* --- Edit fields pop up (modal) --- */}
					<Modal  size="lg" show={show} onHide={handleClose}>
						<Modal.Body >
                            <ProfileInfoEdit closeModal={handleClose} />
						</Modal.Body>
					</Modal>

					{/* --- Information rows --- */}
					<Row className="mt-3 ">
						<small className="fw-bold">Användarnamn</small>
						<p>{userDetails && userDetails.username}</p>
					</Row>

					<Row className="mt-3 ">
						<small className="fw-bold">Användarnamn</small>
						<p>{userDetails && userDetails.email}</p>
					</Row>

					<Row className="mt-3">
						<small className="fw-bold ">Födelsedatum</small>
						<p>{userDetails && userDetails.birth_year}</p>
					</Row>
					<Row className="mt-3">
						<small className="fw-bold ">Modersmål</small>
						<p>{userDetails && userDetails.native_language}</p>
					</Row>
					<Row className="mt-3">
						<small className="fw-bold ">Sysselsättning</small>
						<p>{userDetails && userDetails.current_occupation}</p>
					</Row>
					<Row className="mb-3 mt-5">
						<span>
							<Button
								variant="none"
								className="register-btn_light_small"
								id="log-out-button-profile"
								onClick={handleLogout}
							>
								<BiLogOutCircle className="me-2" size={18} />
								Logga ut
							</Button>
						</span>
					</Row>
				</ProfileCard>
			
		</>
	);
}
