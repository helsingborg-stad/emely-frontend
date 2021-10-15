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
import BackButton from '../BackButton/BackButton';

/* Icon imports */
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';

/* Variable declaration */
export default function UserMenu(props) {
	const [error, setError] = useState('');
	const { currentUser, logout, userDetails, getUserDetails } = useAuth();
	const history = useHistory();
	

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* Getting the current user details on mount */
	useEffect(() => {
		getUserDetails(currentUser.uid);

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
				className="shadow-sm"
				fixed="top"
				bg="white"
				expand="lg"
				id="navbar"
			>
				<Container>
					<Navbar.Brand>
						<BackButton />
					</Navbar.Brand>

					{/* Mobile user-menu button */}
					<Navbar.Toggle
						className="mt-1"
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
							<Link to="/dashboard">
								<Button
									className="me-3"
									id="menu-user-button"
									onClick={handleShow}
									variant="none"
								>
									<BsChatDots className="ms-2 mb-1 me-2" size={20} />
									Prata med Emely
								</Button>
							</Link>

							<Button
								className="p-0"
								id="menu-user-button"
								onClick={handleShow}
								variant="none"
							>
								<AiOutlineUser className="ms-2 mb-1 me-2" size={20} />
								Mitt konto
							</Button>

							{/* Menu from the side */}
							<Offcanvas placement="end" show={show} onHide={handleClose}>
								<Offcanvas.Header className="m-3" closeButton>
									<Offcanvas.Title className="m-3 fw-bold">
										<AiOutlineUser className="me-3" size={25} />
										{userDetails && userDetails.username}
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body className="m-3">
									<Row className="mb-2">
										<Col className="ms-4 p-1" xs={1}>
											<AiOutlineHome size={25} />
										</Col>

										<Col>

										{/* Profile page menu-button */}
											<Link to="/profile">
												<Button className="" variant="none">
													<Nav.Item>Användarkonto</Nav.Item>
												</Button>
											</Link>
										</Col>
									</Row>

									<hr />
									<Row className="menu-rows">
										<Col className="ms-4 p-1" xs={1}>
											<AiOutlineEdit size={25} />
										</Col>
										<Col>

											{/* Update profile menu-button */}
											<Link to="/update-profile">
												<Button variant="none">
													<Nav.Item>Redigera profil</Nav.Item>
												</Button>
											</Link>
										</Col>
									</Row>

									<hr />

									<Row className="mb-2">
										<Col className="ms-4 p-1" xs={1}>
											<BiLogOutCircle size={25} />
										</Col>
										<Col>
										
											{/* Log out menu-button */}
											<Button
												className="rounded-pill "
												variant="link"
												onClick={handleLogout}
												style={{ textDecoration: 'none', color: 'black' }}
											>
												Logga ut
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
