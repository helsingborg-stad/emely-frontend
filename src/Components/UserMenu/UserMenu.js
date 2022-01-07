import React, { useState, useEffect } from 'react';
import {
	Container,
	Navbar,
	Nav,
	Button,
	Offcanvas,
	Row,
	Col,
	Modal,
} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PersonaInstructions from '../../Components/Instructions/PersonaInstructions';

/* --- Icon imports --- */
import { AiOutlineMenu } from 'react-icons/ai';
import { RiShieldUserFill } from 'react-icons/ri';
import { SiHomeadvisor } from 'react-icons/si';
import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';
import { RiUserAddFill } from 'react-icons/ri';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { FaBookReader } from 'react-icons/fa';
import { MdKeyboardArrowLeft } from 'react-icons/md';

/* --- Variables, Hooks & State --- */
export default function UserMenu(props) {
	const {
		currentUser,
		logout,
		userDetails,
		getUserDetails,
		setMsg,
		setMsgVariant,
		isGuest,
	} = useAuth();
	const history = useHistory();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showInstructions, setShowInstructions] = useState(false);
	const handleCloseInstructions = () => setShowInstructions(false);
	const handleShowInstructions = () => setShowInstructions(true);

	/* --- show/hide username --- */
	const [showUsername, setShowUsername] = useState(true);
	const handleCloseUsername = () => setShowUsername(false);
	const handleShowUsername = () => setShowUsername(true);

	const handleLink = (linkTo) => {
		history.push(linkTo);
		handleClose();
	};

	/* --- When in chat -> hide username else show --- */
	useEffect(() => {
		try {
			if (window.location.href.indexOf('emely-chat') > -1) {
				return handleCloseUsername();
			} else {
				return handleShowUsername();
			}
		} catch (error) {
			console.log(error);
		}
	}, [window.location.href]);

	/* --- Get currentUser details from database on login --- */
	useEffect(() => {
		try {
			getUserDetails(currentUser.uid);
		} catch (error) {
			console.log(error.message);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* --- Logout current authenticated user --- */
	async function handleLogout() {
		setMsg('');

		try {
			await logout();
			history.push('/login');

			/* Catch error */
		} catch (error) {
			setMsg(error.message);
			setMsgVariant('danger');
		}
	}

	return (
		<>
			<Navbar
				className="shadow-sm mt-2"
				fixed="top"
				expand="lg"
				id="navbar"
				bg="white"
			>
				<Container>
					<Navbar.Brand>
						<Row>
							<Col xs={2} md={2} lg={2}>
								{/* --- Conditional rendering -> Guest/User avatar */}
								{isGuest ? (
									<Avatar
										className="fw-bold"
										sx={{ width: 35, height: 35 }}
										style={{ fontSize: '1rem' }}
									>
										G
									</Avatar>
								) : (
									<Avatar
										className="fw-bold"
										sx={{ width: 35, height: 35 }}
										style={{
											background: 'var(--green)',
											fontSize: '1rem',
											textTransform: 'uppercase',
										}}
									>
										{userDetails && userDetails.username.charAt(0)}
									</Avatar>
								)}
							</Col>
							<Col
								xs={5}
								md={5}
								lg={5}
								className="ms-4 mt-1"
								style={{ fontSize: '1rem', fontWeight: '500' }}
							>
								{/* --- Conditional rendering -> if Guest no username else username */}
								{showUsername ? (
									<span>{userDetails && userDetails.username}</span>
								) : null}
							</Col>
						</Row>
					</Navbar.Brand>

					{/* --- Mobile menu button: open sidebar --- */}
					<Navbar.Toggle
						className="avatar-btn shadow-sm"
						onClick={handleShow}
						aria-controls="basic-navbar-nav"
					>
						<span>
							<AiOutlineMenu />
						</span>
					</Navbar.Toggle>

					<Navbar.Collapse bg="dark" id="basic-navbar-nav">
						<Nav className="ms-auto ">
							{/* --- Menu-button: open sidebar --- */}
							<Button
								className=""
								id="menu-user-button"
								onClick={handleShow}
								variant="none"
							>
								<AiOutlineMenu className="ms-2 mb-1 me-2" size={20} />
							</Button>

							{/* --- Sidebar code. --- */}
							<Offcanvas placement="end" show={show} onHide={handleClose}>
								<Offcanvas.Header className="m-0 ps-0 " closeButton>
									<Offcanvas.Title className="">
										{/* Conditional rendering -> */}
										{isGuest ? (
											/* Guest ->'Registrera konto' */
											<Link to="/signup">
												<Nav.Item
													onClick={handleClose}
													className="register-btn_sidebar "
												>
													<RiUserAddFill className="me-4" size={25} />
													Registrera konto
												</Nav.Item>
											</Link>
										) : (
											/* User -> avatar + username */
											<Row
												className="ms-3"
												style={{ fontSize: '1rem', fontWeight: '600' }}
											>
												<Col xs={2} md={2} lg={2}>
													<Avatar
														className="fw-bold "
														sx={{ width: 35, height: 35 }}
														style={{
															background: 'var(--green)',
															fontSize: '1rem',
														}}
													>
														{userDetails && userDetails.username.charAt(0)}
													</Avatar>
												</Col>
												<Col
													className="ms-4 mt-1"
													style={{ fontSize: '1rem', fontWeight: '600' }}
												>
													{userDetails && userDetails.username}
												</Col>
											</Row>
										)}
									</Offcanvas.Title>
								</Offcanvas.Header>

								{/* --- Menu body starts here --- */}
								<Offcanvas.Body className="">
									{/* --- Home: go back to dashboard --- */}
									<Row className="menu-rows">
										<Link to="/dashboard">
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<SiHomeadvisor className="me-4" size={25} />
												Hem
											</Nav.Item>
										</Link>
									</Row>

									{/* Conditional rendering -> */}
									{isGuest /* Guest -> show nothing */ ? null : (
										/* User -> Användarkonto: Go to profile page  */
										<Row className="menu-rows">
											{/* Profile page menu-button */}
											<Link to="/profile">
												<Nav.Item
													onClick={handleClose}
													className="register-btn_sidebar"
												>
													<RiShieldUserFill className="me-4" size={25} />
													Användarkonto
												</Nav.Item>
											</Link>
										</Row>
									)}

									<Row onClick={handleLogout} className="menu-rows mb-4">
										{/* Conditional rendering -> */}
										{isGuest ? (
											/* Guest -> Logga in */
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<BsArrowDownCircleFill className="me-4" size={23} />{' '}
												Logga in
											</Nav.Item>
										) : (
											/* Guest -> Logga ut */
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<BsArrowUpCircleFill className="me-4" size={23} /> Logga
												ut
											</Nav.Item>
										)}
									</Row>

									{/* --- Chat with emely buttons --- */}
									<Divider>
										<small className="fw-bold mt-4 mb-3">EMELY</small>
									</Divider>

									{/* --- Jobbintervju --- */}
									<Row className="menu-rows" id="top-menu-item">
										<Nav.Item
											onClick={() => handleLink('/work-emely')}
											className="register-btn_sidebar"
										>
											<ImBriefcase className="me-4" size={22} />
											Jobbintervju
										</Nav.Item>
									</Row>

									{/* --- Fika --- */}
									<Row className="menu-rows">
										<Nav.Item
											onClick={() => handleLink('/emely-chat/fika')}
											className="register-btn_sidebar"
										>
											<SiCoffeescript className="me-4" size={22} />
											Fika
										</Nav.Item>
									</Row>

									<Row className="menu-rows">
										<Nav.Item
											onClick={handleShowInstructions}
											className="register-btn_sidebar"
										>
											<FaBookReader className="me-4" size={22} />
											Instruktioner
										</Nav.Item>
									</Row>
								</Offcanvas.Body>
							</Offcanvas>
						</Nav>
					</Navbar.Collapse>
				</Container>

				{/* --- Instructions --- */}
				<Modal
					className="settings-modal"
					size="lg"
					show={showInstructions}
					onHide={handleCloseInstructions}
				>
					<Modal.Body>
						<PersonaInstructions />
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="outline-success"
							className="register-btn"
							onClick={handleCloseInstructions}
						>
							<MdKeyboardArrowLeft size={25} /> TILLBAKA
						</Button>
					</Modal.Footer>
				</Modal>
			</Navbar>
		</>
	);
}
