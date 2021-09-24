import React, { useState } from 'react';
import { Container, Navbar, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { HiOutlineVolumeUp } from 'react-icons/hi';

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
			<Navbar className="fixed-top">
				<Container>
					<Navbar.Brand>
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
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							<p>
								<Button
									className="rounded-pill m-3 p-3 shadow-sm fw-bold"
									variant="success"
								>
									{currentUser.email}
								</Button>

								<Link to="/update-profile">
									<Button
										className="rounded-pill m-3 p-3 shadow-sm fw-bold"
										variant="success"
									
									>
										UPPDATERA PROFIL
									</Button>
								</Link>
								<Button
									className="rounded-pill m-3 p-3 shadow-sm fw-bold"
									variant="success"
									onClick={handleLogout}
								>
									LOGGA UT
								</Button>
							</p>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{error && <Alert variant="danger">{error}</Alert>}
		</>
	);
}
