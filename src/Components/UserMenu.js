import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
// import { FiHome } from 'react-icons/fi';
//import { HiOutlineVolumeUp } from 'react-icons/hi';

/* Variable declaration */
export default function UserMenu() {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useHistory();

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
			{/* Emely - sound and home button
						<Button
						className="rounded-circle shadow-sm p-3"
						variant="success"
						>
						<FiHome size={30} />
						</Button>
						<Button
						className="m-2 rounded-circle shadow-sm p-3"
						variant="success"
						>
						<HiOutlineVolumeUp size={30} />
						</Button>
					*/}

			<Navbar fixed="top" bg="none" expand="lg">
				<Container>
					<Navbar.Brand></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse bg="dark" id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Item className="m-3">{currentUser.email}</Nav.Item>

							<Nav.Item className="m-3"><Link to="/update-profile">Uppdatera profil</Link></Nav.Item>

							<Button className="rounded-pill" variant="outline-success" onClick={handleLogout}>Logga ut</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
				</Navbar>
				{error && <Alert variant="danger">{error}</Alert>}
		</>
	);
}
