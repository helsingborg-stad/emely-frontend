import React, { useState, useEffect } from 'react';
import {
	Container,
	Navbar,
	Nav,
	Button,
	Alert,
	Offcanvas,
	Row,
	Col,
} from 'react-bootstrap';

/* Icon imports */
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import { BiLogOutCircle } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatRightDots } from 'react-icons/bs';
import { RiShieldUserLine } from 'react-icons/ri';
import { RiLoginCircleLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { SiHomeadvisor } from 'react-icons/si';
import { ImBriefcase } from 'react-icons/im';
import { SiCoffeescript } from 'react-icons/si';
import { RiUserAddFill } from 'react-icons/ri';

import Avatar from '@mui/material/Avatar';

/* Variable declaration */
export default function UserMenu(props) {
	const [error, setError] = useState('');
	const { currentUser, logout, userDetails, getUserDetails } = useAuth();
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
			setError(error.message);
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
								<Avatar
									className="fw-bold"
									sx={{ width: 35, height: 35 }}
									style={{ fontSize: '1rem' }}
								>
									G
								</Avatar>
							</Col>
							<Col
								xs={5}
								md={5}
								lg={5}
								className="ms-4 mt-1 nav-login-button"
								onClick={handleLogout}
							>
								{showUsername ? (
									<span>
										<RiLoginCircleLine size={20} /> Logga in
									</span>
								) : null}
							</Col>
						</Row>
					</Navbar.Brand>

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
								<Offcanvas.Header className="m-0 ps-0" closeButton>
									<Offcanvas.Title className="">
										{' '}
										<Link to="/signup">
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<RiUserAddFill className="me-4" size={25} />
												Registrera konto
											</Nav.Item>
										</Link>
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
									<Row className="menu-rows ">
										{/* Chat with emely button*/}
										<Link to="/work-emely">
											<Nav.Item
												onClick={handleClose}
												className="register-btn_sidebar"
											>
												<ImBriefcase className="me-4" size={22} />
												Jobbintervju
											</Nav.Item>
										</Link>
									</Row>

									<Row className="menu-rows border-0">
										{/* Chat with emely button*/}
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

									<Row onClick={handleLogout} className="menu-rows">
										{/* Log out menu-button */}
										<Nav.Item
											onClick={handleClose}
											className="register-btn_sidebar"
										>
											<RiLoginCircleLine className="me-4" size={25} />
											Logga in
										</Nav.Item>
									</Row>
								</Offcanvas.Body>
							</Offcanvas>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{error && <Alert variant="danger">{error}</Alert>}
		</>
	);
}
