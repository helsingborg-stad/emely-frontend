import React from 'react';
import { Container, Row} from 'react-bootstrap';

export default function ProfileCard(props) {
	return (
		<>
			<Container className="" id="profile-card">
				<Row className="p-4">

					{props.children}
					

				</Row>

			</Container>
		</>
	);
}
