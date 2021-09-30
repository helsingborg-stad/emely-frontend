import React, { useState } from 'react';
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
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

/* Variable declaration */
export default function UserMenu(props) {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
			<Navbar sticky="top" bg="none" expand="lg" id="navbar">
				<Container>
					{/* TODO: Add back-button */}
					<Navbar.Brand></Navbar.Brand>
					<Navbar.Toggle
						onClick={handleShow}
						aria-controls="basic-navbar-nav"
					></Navbar.Toggle>
					<Navbar.Collapse bg="dark" id="basic-navbar-nav">
						<Nav className="ms-auto ">
							{/* Menu-button */}
							<Button
								className="rounded-pill shadow-sm p-3"
								onClick={handleShow}
								variant="light"
						
							>
								<AiOutlineUser className="me-2" size={25} />{' '}
								{currentUser.displayName
									? currentUser.displayName
									: currentUser.email}
							</Button>

							{/* Menu from the side */}
							<Offcanvas placement="end" show={show} onHide={handleClose}>
								<Offcanvas.Header className="m-3" closeButton>
									<Offcanvas.Title className="m-3 fw-bold">
										<AiOutlineUser className="me-3" size={25} />
										{currentUser.displayName
											? currentUser.displayName
											: currentUser.email}
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body className="m-3">
									<Row className="mb-2">
									
										<Col className="ms-4 p-1" xs={1}>
											<AiOutlineHome size={25} />
										</Col>
										<Col>
											<Link to="/update-profile">
												<Button
													className="rounded-pill "
													variant="link"
													style={{ textDecoration: 'none', color: 'black' }}
												>
													<Nav.Item>Min profil</Nav.Item>
												</Button>
											</Link>
										</Col>
									</Row>
									<hr />
									<Row className="menu-rows" >
										<Col className="ms-4 p-1" xs={1}>
											<AiOutlineEdit size={25} />
										</Col>
										<Col>
											<Link to="/update-profile">
												<Button
													className="rounded-pill "
													variant="link"
													style={{ textDecoration: 'none', color: 'black' }}
												>
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
