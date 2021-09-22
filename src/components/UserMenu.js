import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


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
		<div className="">
		<h2 className="text-center mb-4">
		{currentUser.email} 
		</h2>
		{error && <Alert variant="danger">{error}</Alert>}
		<strong>Email:</strong> {currentUser.email}
		
		{/* Go to update profile page */}
					<Link
					to="/update-profile"
					id="button-main"
						className="btn btn-primary rounded-pill p-3 w-100 mt-5"
						>
						UPPDATERA PROFIL
					</Link>
					
					{/* Log out user */}
					<div className="w-100 text-center mt-2">
					<Button
					className="btn btn-secondary rounded-pill p-3 w-100 mt-2"
					id="button-main"
					variant="link"
					onClick={handleLogout}
						>
						LOGGA UT
						</Button>
						</div>
						
						</div>
						</>
						);
					}
					