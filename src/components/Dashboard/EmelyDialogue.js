import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import emely from '../../images/emely.png';

export default function EmelyDialogue() {
	const { currentUser } = useAuth();

	return (
		<>
		<div className="mt-3 mb-4" id="container-login">
			<img id="emely-image" className="items-align-center" src={emely} alt="" />
				<Card className="shadow-sm" id="emely-dialogue-card">
					<p className="m-3 p-3" id="dialogue-text">
						Hej <b>{currentUser.email}</b>! Jag heter Emely. Jag är en virtuell
						språkassistent och med mig kan du öva att prata på svenska. Välj
						nedan vilken av mina personligheter du önskar att prata med.
					</p>
				</Card>
			</div>
		</>
	);
}
