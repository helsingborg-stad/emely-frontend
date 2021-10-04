import React, { useEffect, useState } from 'react';
import { db } from "../../firebase"

import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

import UserMenu from '../../Components/UserMenu/UserMenu';
import { Col, Card, Container, Row } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
	const { currentUser } = useAuth();
	const [user, setUser] = useState();

	const getUser = async () => {
		try {
		  const documentSnapshot = await db
			.collection('users-debug')
			.doc(currentUser.email)
			.get();
	
		  const userData = documentSnapshot.data();
		  setUser(userData);
		} catch {
		  
		}
	  };
	  

	useEffect(() => {

		
		getUser();

		
	});

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

						<Col className="ms-3 fw-bold">
							
							<Row className="mt-5">
								<Col xs={4}>
									Användarnamn
								</Col>
								<Col>Dino</Col>
							</Row>
							<hr />
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
								<Col>1987-04-28</Col>
							</Row>
							<hr />
							<Row >
								<Col xs={4}>
									Modersmål
								</Col>
								<Col>{user && user?.native_language}</Col>
							</Row>
                            <hr />
                            <Row className="mb-5">
                            <Col xs={4}>
                                Syselsättning
                            </Col>
                            <Col>Heltidsarbete</Col>
                        </Row>
						</Col>
					</Row>
				</Card>
			</Container>
		</>
	);
}
