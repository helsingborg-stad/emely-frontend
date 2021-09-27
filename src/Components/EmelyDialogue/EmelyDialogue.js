import React from 'react';
import { Card } from 'react-bootstrap';
import emelyWork from '../../Assets/images/emely_work.png';

export default function EmelyDialogue(props) {
	return (
		<>
			<div className="mt-3 mb-0" id="emely-dialogue-container">
				<div className="items-align-center text-center" id="emely-image-div">
					<img
						id="emely-image"
						className="items-align-center"
						src={emelyWork}
						alt=""
					/>
				</div>
				<Card className="shadow-sm p-1" id="emely-dialogue-card">
					{props.children}
				</Card>
			</div>
		</>
	);
}
