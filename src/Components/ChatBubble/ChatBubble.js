import React from 'react';
import { Card } from 'react-bootstrap';

export default function ChatBubble(props) {
	return (
		<>
			<div className="mt-3 mb-0" id="emely-chat-bubble-container">
				<Card className="shadow-sm p-1" id="emely-chat-bubble-card">
					<p className="m-3 p-3" id="dialogue-text">
						
						Jag heter Emely. Jag är en virtuell språkassistent och med mig kan
						du öva att prata på svenska. Välj nedan vilken av mina
						personligheter du önskar att prata med.
					</p>
				</Card>
			</div>
		</>
	);
}
