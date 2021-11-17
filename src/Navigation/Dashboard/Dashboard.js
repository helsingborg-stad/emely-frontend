import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { FiBriefcase } from 'react-icons/fi';
import { FiCoffee } from 'react-icons/fi';
import { Button } from 'react-bootstrap';
import { ConversationContext } from '../../contexts/ConversationContext';
import PulseLoader from 'react-spinners/PulseLoader';

/* Variable declaration */
export default function Dashboard() {
	const { userDetails, currentUser } = useAuth();
	const { currentProgress, setCurrentProgress } =
		useContext(ConversationContext);

	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		setIsLoading(true);

		/* --- Render text after delay --- */
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		return timer;
	}, [currentUser]);

	useEffect(() => {
		/* Reset current progress on new chat */
		setCurrentProgress(0);
	}, []);

	let history = useHistory();

	const handleLink = (linkTo) => {
		history.push(linkTo);
	};

	return (
		<>
			<Container id="dashboard-card" className="p-0">
				<Row className="my-5 align-items-center  justify-content-center button_container">
					<Row>
						<Col id="emely-dialogue-col" className="p-0">
							<EmelyDialogue className="">
								{/* --- When loading show pulse loader. Show text after loading --- */}
								{isLoading ? (
									<p className="m-3 p-5 emely-dialog_dialogue-text text-center">
										<PulseLoader size={12} color={'gray'} />{' '}
									</p>
								) : (
									<p className="m-3 p-3 emely-dialog_dialogue-text">
										Hej {userDetails && userDetails.username}! Jag heter Emely.
										Jag är en virtuell språkassistent och med mig kan du öva att
										prata på svenska. Vill du träna på att gå på en jobbintervju
										eller bara ta en fika och prata om vad som helst?
									</p>
								)}
							</EmelyDialogue>
						</Col>
					</Row>

					{/* --- Work Emely persona-button --- */}
					<Col xs={12} md={6} className="text-center mt-3">
						<Button
							className="register-btn w-100 clickBtn"
							type="button"
							onClick={() => handleLink('/work-emely')}
						>
							<FiBriefcase size={20} />
							<span className="px-3">SÖKA JOBB-ASSISTENT</span>
						</Button>
					</Col>

					{/* --- Fika kompis persona-button --- */}
					<Col xs={12} md={6} className="mt-3">
						<Button
							className="register-btn w-100 clickBtn"
							type="button"
							onClick={() => handleLink('/emely-chat/fika')}
						>
							<FiCoffee size={20} />
							<span className="px-3">FIKA KOMPIS</span>
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
}
