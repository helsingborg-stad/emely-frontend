import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import ProfileInfoEdit from './ProfileInfoEdit';

/* --- Icon imports ---*/
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

/* --- Variables, Hooks & State --- */
export default function Profile() {
	const { userDetails, logout, setMsg, setMsgVariant, getUserMessages, currentUser } = useAuth();
	const history = useHistory();
	const { translateError } = useAuth();
    const [show, setShow] = useState(false);
	
	/* show/hide modal */
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    

		/* --- Get messages --- */
		async function handleGetMessages() {
			setMsg('');
	
			try {
				await getUserMessages(currentUser.uid);
	
				/* Catch error */
			} catch (error) {
				console.log(error.code);
				setMsgVariant('danger');
				setMsg(error.message);
			}
		}

	/* --- Log out --- */
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
				<ProfileCard>

					{/* --- My information card --- */}
					<Row className="p-0 m-0">
						<Col xs="auto" md={8} lg={8}>
							<h4 className="mb-3 fw-bold">Mina uppgifter</h4>
						</Col>
						<Col xs="auto" md={4} lg={4} className="text-end p-0">
							<span>
								
									<Button
										variant="none"
										className="register-btn_small"
										id="edit-button"
                                        onClick={handleShow}
									>
										<AiOutlineEdit className="me-2" size={15} />
										REDIGERA
									</Button>
								
							</span>
						</Col>
					</Row>

					
					{/* --- Edit fields pop up (modal) --- */}
					<Modal className="profile-info-modal" size="lg" show={show} onHide={handleClose}>
						<Modal.Body >
                            <ProfileInfoEdit closeModal={handleClose} />
						</Modal.Body>
					</Modal>

					{/* --- Information rows --- */}
					<Row className="mt-3 ">
						<small className="fw-bold">Användarnamn</small>
						<p>{userDetails && userDetails.username}</p>
					</Row>

					{/* --- Email --- */}
					<Row className="mt-3 ">
						<small className="fw-bold">Email</small>
						<p>{userDetails && userDetails.email}</p>
					</Row>

					{/* --- Birth year --- */}
					<Row className="mt-3">
						<small className="fw-bold ">Födelseår</small>
						<p>{userDetails && userDetails.birth_year}</p>
					</Row>

					{/* --- Native Language --- */}
					<Row className="mt-3">
						<small className="fw-bold ">Modersmål</small>
						<p>{userDetails && userDetails.native_language}</p>
					</Row>

					{/* --- Current occupation --- */}
					<Row className="mt-3">
						<small className="fw-bold ">Sysselsättning</small>
						<p>{userDetails && userDetails.current_occupation}</p>
					</Row>

					{/* --- Get messages button --- */}
					<Row className="mb-3 mt-5">
						<span>
							<Button
								variant="none"
								className="register-btn_small"
								id="log-out-button-profile"
								onClick={handleGetMessages}
							>
								
								Get messages
							</Button>
						</span>
					</Row>

					{/* --- Log out button --- */}
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
