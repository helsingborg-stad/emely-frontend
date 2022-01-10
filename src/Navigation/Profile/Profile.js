import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';
import ProfileDelete from '../../Components/ProfileInfo/ProfileDelete';
import ProfilePassword from '../../Components/ProfileInfo/ProfilePassword';
import ProfileEmelySettings from '../../Components/ProfileInfo/ProfileEmelySettings';
import Conversations from '../../Components/ProfileInfo/Conversations';

import { useAuth } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

export default function Profile() {
	const { isDeleting } = useAuth();

	return (
		<>
			{/* Components for different profile-settings */}
			{isDeleting ? (
				<Container className="deleting-account-container">
					<h2 className="fw-bold text-center mt-3 mb-3">
						<Spinner className="me-2" animation="border"/>
						Tar bort konto...
					</h2>
				</Container>
			) : (
				<Container>
					<h2 className="fw-bold text-center mt-3 mb-3">Mitt Användarkonto</h2>

					<ProfileInfo />
					<br />
					<Conversations />
					<br />
					<ProfileEmelySettings />
					<br />
					<ProfileDelete />
					<br />
					<ProfilePassword />
					<br />
				</Container>
			)}
		</>
	);
}
