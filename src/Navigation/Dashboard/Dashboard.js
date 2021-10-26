import React, { useEffect, useState } from 'react';
import PersonaButton from '../../Components/PersonaButton/PersonaButton';
import EmelyDialogue from '../../Components/EmelyDialogue/EmelyDialogue';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { FiBriefcase } from 'react-icons/fi';
import { FiCoffee } from 'react-icons/fi';
import PulseLoader from 'react-spinners/PulseLoader';

/* Variable declaration */
export default function Dashboard() {
	const { userDetails, currentUser } = useAuth();
	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		setIsLoading(true);

    /* --- Render text after delay --- */
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return timer;
	}, [currentUser]);

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
										Hej {userDetails && userDetails.username}! <br />
										Jag heter Emely. Jag är en virtuell språkassistent och med
										mig kan du öva att prata på svenska. Välj nedan vilken av
										mina personligheter du önskar att prata med.
									</p>
								)}
							</EmelyDialogue>
						</Col>
					</Row>

          {/* --- Work Emely persona-button --- */}
					<Col xs={12} md={6} className="text-center mt-3">
						<PersonaButton
							linkTo={'/work-emely'}
							name={'SÖKA JOBB-ASSISTENT'}
							persona="intervju"
						>
							<FiBriefcase size={20} />
						</PersonaButton>
					</Col>

          {/* --- Fika kompis persona-button --- */}
					<Col xs={12} md={6} className="mt-3">
						<PersonaButton
							linkTo={'/emely-chat/fika'}
							name={'FIKA KOMPIS'}
							persona="fika"
						>
							<FiCoffee size={20} />
						</PersonaButton>
					</Col>
				</Row>
			</Container>
		</>
	);
}
