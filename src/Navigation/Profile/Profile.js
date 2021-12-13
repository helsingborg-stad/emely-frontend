import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';
import ProfileDelete from '../../Components/ProfileInfo/ProfileDelete';
import ProfilePassword from '../../Components/ProfileInfo/ProfilePassword';
import ProfileEmelySettings from '../../Components/ProfileInfo/ProfileEmelySettings';


export default function Profile() {

	return (
		<>
			{/* Components for different profile-settings */}
			<Container>

				<h2 className="fw-bold text-center mt-3 mb-3">Mitt Användarkonto</h2>
				
				<ProfileInfo />

				<br />

				<ProfileEmelySettings />

				<br />

				<ProfileDelete />

				<br />

				<ProfilePassword />
				<br />
			
			</Container>
		</>
	);
}