import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export default function EmelyDialogue() {
	const { currentUser } = useAuth();

	return (
		<>
			<Card className="shadow-sm" id="emely-dialogue-card">
				<p className="m-5" id="dialogue-text">
					Hej <b>{currentUser.email}</b>! Jag heter Emely. Jag är en virtuell
					språkassistent och med mig kan du öva att prata på svenska. Välj nedan
					vilken av mina personligheter du önskar att prata med.
				</p>
			</Card>
		</>
	);
}
