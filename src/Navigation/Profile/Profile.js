import React from 'react';
import { Container, Row, } from 'react-bootstrap';
import UserMenu from '../../Components/UserMenu/UserMenu';
import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';
import ProfileDelete from '../../Components/ProfileInfo/ProfileDelete';
import ProfilePassword from '../../Components/ProfileInfo/ProfilePassword';


export default function Profile() {

	return (
		<>

			<Container>
				<Row>
					<UserMenu />
				</Row>

				<h2 className="fw-bold text-center mt-3 mb-3">Mitt Användarkonto</h2>
				
				<ProfileInfo />

				<br />

				<ProfileDelete />

				<br />

				<ProfilePassword />
				<br />
			
			</Container>
		</>
	);
}
