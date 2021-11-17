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
						className="ms-4 mt-1"
						style={{ fontSize: '1rem', fontWeight: '600' }}
						onClick={handleLogout}
					>
					<Button
					className="register-btn_sidebar p-0"
					variant="none"
					onClick={handleLogout}
				>
				{showUsername ? <span><RiLoginCircleLine size={20} /> Logga in</span> : null }
					
				</Button>
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
								<Offcanvas.Header className="m-3 " closeButton>
									<Offcanvas.Title className=""></Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body className="m-3">
									<Row className="mb-2">
										<Col className="ms-4 p-1" xs={1}>
											<AiOutlineUserAdd size={25} />
										</Col>

										<Col>
											{/* Profile page menu-button */}
											<Link to="/signup">
												<Button
													className="register-btn_sidebar"
													variant="none"
													onClick={handleClose}
												>
													<Nav.Item>Registrera konto</Nav.Item>
												</Button>
											</Link>
										</Col>
									</Row>

									<hr />
									<Row className="menu-rows ">
										<Col className="ms-4 p-1" xs={1}>
										
											<BsChatRightDots size={25} />
										</Col>
										<Col>
											{/* Update profile menu-button */}
											<Link id="side-bar-link" to="/dashboard">
												<Button
													className="register-btn_sidebar"
													variant="none"
													onClick={handleClose}
												>
													<Nav.Item>Prata med Emely</Nav.Item>
												</Button>
											</Link>
										</Col>
									</Row>

									<hr />

									<Row className="mb-2">
										<Col className="ms-4 p-1" xs={1}>
											<RiLoginCircleLine size={25} />
										</Col>
										<Col>
											{/* Log out menu-button */}
											<Button
												className="register-btn_sidebar"
												variant="none"
												onClick={handleLogout}
											>
												Logga in
											</Button>
										</Col>
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
