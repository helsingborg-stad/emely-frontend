import React, { useState, useContext } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ConversationContext } from '../../contexts/ConversationContext';

import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import PulseLoader from 'react-spinners/PulseLoader';

import { AiOutlineDownload } from 'react-icons/ai';
import { BsChatQuoteFill } from 'react-icons/bs';

import Spinner from 'react-bootstrap/Spinner';

/* --- Variables, Hooks & State --- */
export default function Conversations() {
	const { userDetails, currentUser } = useAuth();
	const { getUserConversations, isLoading } = useContext(ConversationContext);

	const history = useHistory();

	async function handleGetConversations() {
		try {
			await getUserConversations();
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			<ProfileCard>
				{/* --- My information card --- */}
				<Row className="p-0 m-0" xs={1} md={2} lg={2}>
					<Col>
						<h4 className="profile-headline mb-3 fw-bold">
							<BsChatQuoteFill className="me-3" size={25} />
							Konversationer
						</h4>
					</Col>
					<Col xs="auto" className="text-end pe-0 ps-2">
						<span>
							{isLoading ? (
								<Button
									variant="none"
									className="register-btn_small"
									id="edit-button"
									onClick={handleGetConversations}
									disabled={isLoading}
								>
									<Spinner className="me-2" animation="border" size="sm" />{' '}
									Laddar ner...
								</Button>
							) : (
								<Button
									variant="none"
									className="register-btn_small"
									id="edit-button"
									onClick={handleGetConversations}
								>
									<AiOutlineDownload className="me-2" size={20} /> LADDA NER
								</Button>
							)}
						</span>
					</Col>
				</Row>
				<Row className="mt-3">
					<p className="card-text" id="delete-text">
						Vill du se alla dina konversationer med Emely? Du kan klicka på "Ladda ner" för att
						skapa en textfil innehållandes alla dina konversationer.
						När filen är skapad så har du möjlighet att spara den på din dator.
					</p>
				</Row>
			</ProfileCard>
		</>
	);
}
