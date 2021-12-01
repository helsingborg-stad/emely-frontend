import React, { useState, useEffect } from 'react';
import {
	Container,
	Navbar,
	Nav,
	Button,
	Offcanvas,
	Row,
	Col,
} from 'react-bootstrap';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

/* Icon imports */
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiShieldUserFill } from 'react-icons/ri';
import { SiHomeadvisor } from 'react-icons/si';
import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';
import { RiUserAddFill } from 'react-icons/ri';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { BsArrowUpCircleFill } from 'react-icons/bs';

/* Variable declaration */
export default function UserMenu(props) {
	const [error, setError] = useState('');
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

	const [showUsername, setShowUsername] = useState(true);

	const handleCloseUsername = () => setShowUsername(false);
	const handleShowUsername = () => setShowUsername(true);

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

	/* Getting the current user details on mount */
	useEffect(() => {
		try {
			getUserDetails(currentUser.uid);
		} catch (error) {
			console.log(error.message);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handleLogout() {
		setError('');

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
										style={{ background: 'var(--green)', fontSize: '1rem' }}
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
								{showUsername && isGuest ? (
									null
								) : (
									<span>{userDetails && userDetails.username}</span>
								)}
							</Col>
						</Row>
					</Navbar.Brand>
					<Link to="/profile">
						<Button
							className="fw-bold"
							id="menu-user-button"
							onClick={handleShow}
							variant="none"
						></Button>
					</Link>

					{/* Mobile user-menu button */}
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
							{/* Menu-button */}

							<Button
								className=""
								id="menu-user-button"
								onClick={handleShow}
								variant="none"
							>
								<AiOutlineMenu className="ms-2 mb-1 me-2" size={20} />
							</Button>

							{/* Menu from the side */}
							<Offcanvas placement="end" show={show} onHide={handleClose}>
								<Offcanvas.Header className="m-0 ps-0 " closeButton>
									<Offcanvas.Title className="">
										{isGuest ? (
											<Link to="/signup">
												<Nav.Item
													onClick={handleClose}
													className="register-btn_sidebar"
												>
													<RiUserAddFill className="me-4" size={25} />
													Registrera konto
												</Nav.Item>
											</Link>
										) : (
											<Row className="ms-3">
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
													xs={8}
													md={8}
													lg={8}
													className="ms-4 mt-1"
													style={{ fontSize: '1rem', fontWeight: '600' }}
												>
													{userDetails && userDetails.username}
												</Col>
											</Row>
										)}
									</Offcanvas.Title>
								</Offcanvas.Header>

								<Offcanvas.Body className="">
									<Row className="menu-rows border-0">
										{/* Chat with emely button*/}
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
									{isGuest ? null : (
										<Row className="menu-rows border-0">
											{/* Profile page menu-button */}
											<Link to="/profile">
												<Nav.Item
													onClick={handleClose}
													className="register-btn_sidebar border-top"
												>
													<RiShieldUserFill className="me-4" size={25} />
													Användarkonto
												</Nav.Item>
											</Link>
										</Row>
									)}

									<Row onClick={handleLogout} className="menu-rows mb-4">
										{/* Log out menu-button */}
										{isGuest ? (
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<BsArrowDownCircleFill className="me-4" size={23} />{' '}
												Logga in
											</Nav.Item>
										) : (
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<BsArrowUpCircleFill className="me-4" size={23} />{' '}
												Logga ut
											</Nav.Item>
										)}
									</Row>

									<Divider>
										<small className="fw-bold mt-4 mb-3">EMELY</small>
									</Divider>
									<Row className="menu-rows border-0 ">
										{/* Chat with emely button*/}
										<Link to="/work-emely">
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar border-bottom"
											>
												<ImBriefcase className="me-4" size={22} />
												Jobbintervju
											</Nav.Item>
										</Link>
									</Row>

									<Row className="menu-rows border-0">
										<Link to="/emely-chat/fika">
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<SiCoffeescript className="me-4" size={22} />
												Fika
											</Nav.Item>
										</Link>
									</Row>
								</Offcanvas.Body>
							</Offcanvas>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
