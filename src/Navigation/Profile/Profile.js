import React, { useEffect } from 'react';
import { Col, Card, Container, Row } from 'react-bootstrap';
import UserMenu from '../../Components/UserMenu/UserMenu';

/* Icon imports */
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { currentUser, userDetails, getUserDetails } = useAuth();

	/* Getting the current user details on mount */
	useEffect(() => {
		getUserDetails(currentUser.uid)
	}, [currentUser.uid, getUserDetails])

	return (
		<>
			<Container>
				<Row>
					<UserMenu />
				</Row>
				<div>
				</div>
					
				<Card className="mt-5 shadow-sm" id="profile-card">
					<Row>

						{/* The Side menu on the profile card */}
						<Col xs={3} id="side-menu">
							<Row className="mt-5">
								<Col xs={2}>
									<AiOutlineHome size={20} />
								</Col>
								<Col>Min profil </Col>
							</Row>
							<hr />
							<Row>
								<Col xs={2}>
									<AiOutlineEdit size={20} />
								</Col>
								<Col>Redigera profil</Col>
							</Row>
							<hr />
							<Row className="mb-5">
								<Col xs={2}>
									<BiLogOutCircle size={20} />
								</Col>
								<Col>Logga ut</Col>
							</Row>
						</Col>

						{/* Profile fields */}
						<Col className="ms-3 fw-bold">
							
							{/* Username */}
							<Row className="mt-5">
								<Col xs={4}>
									Användarnamn
								</Col>
								<Col>{userDetails && userDetails?.username}</Col>
							</Row>
							<hr />

							{/* Email */}
                            <Row>
                            <Col xs={4}>
                                Email
                            </Col>
                            <Col>{currentUser.email}</Col>
                        </Row>
                        <hr />
							<Row>
								<Col xs={4}>
									Födelsedatum
								</Col>
								<Col>{userDetails && userDetails?.birth_year}</Col>
							</Row>
							<hr />

							{/* Native language */}
							<Row >
								<Col xs={4}>
									Modersmål
								</Col>
								<Col>{userDetails && userDetails?.native_language}</Col>
							</Row>
                            <hr />

							{/* Current occupation */}
                            <Row className="mb-5">
                            <Col xs={4}>
                                Syselsättning
                            </Col>
                            <Col>{userDetails && userDetails?.current_occupation}</Col>
                        </Row>
						</Col>
					</Row>
				</Card>
			</Container>
		</>
	);
}
