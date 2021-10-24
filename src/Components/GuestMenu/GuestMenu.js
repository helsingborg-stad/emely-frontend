import React, { useState } from 'react';
import {
	Container,
	Navbar,
	Nav,
	Button,
	Alert,
} from 'react-bootstrap';

/* Icon imports */
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';


/* Variable declaration */
export default function GuestMenu(props) {
	const [error, setError] = useState('');
	const { logout } = useAuth();
	const history = useHistory();

	const [setShow] = useState(false);
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
			<Navbar className="" fixed="top" expand="lg" id="navbar" bg="white">
				<Container>
					<Navbar.Brand>
						<Link to="/login"></Link>
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
							<Nav.Item>
								{' '}
								<Link to="/work-emely">
									<Button className="register-btn_small me-3" variant="none">
										JOBB ASSISTENT
									</Button>
								</Link>
							</Nav.Item>

							<Nav.Item>
								{' '}
								<Link to="/emely-chat/fika">
									<Button className="register-btn_small me-3" variant="none">
										FIKA KOMPIS
									</Button>
								</Link>
							</Nav.Item>

							<Nav.Item>
								{' '}
								<Link to="/login">
									<Button
										onClick={handleLogout}
										className="register-btn_light_small"
										variant="none"
									>
										<AiOutlineUser size={20} /> Logga in
									</Button>
								</Link>
							</Nav.Item>

							{/* Menu-button */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{error && <Alert variant="danger">{error}</Alert>}
		</>
	);
}
