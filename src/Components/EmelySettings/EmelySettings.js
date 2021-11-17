import React, { useState, useEffect, useContext } from 'react';
import { ConversationContext } from '../../contexts/ConversationContext';
import { Row, Container, Button } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import { FcSettings } from 'react-icons/fc';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export default function EmelySettings(props) {
	const {
		emelySlower,
		setEmelySlower,
		currentSpeed,
		setCurrentSpeed,
		hasExperience,
		setHasExperience,
		smallTalk,
		setSmallTalk,
	} = useContext(ConversationContext);

	const [speedChecked, setSpeedChecked] = useState(emelySlower);
	const [speed, setSpeed] = useState();

	const handleSpeed = (event) => {
		setSpeedChecked(event.target.checked);
		if (speedChecked) {
			setCurrentSpeed(100);
			setEmelySlower(false);
		} else {
			setCurrentSpeed(80);
			setEmelySlower(true);
		}
	};

	const handleSmallTalk = (event) => {
		setSmallTalk(event.target.checked);
	};

	const handleHasExperience = (event) => {
		setHasExperience(event.target.checked);
	};

	return (
		<>
			<Container className="p-3">
				<h4 className="fw-bold">
					<FcSettings className="me-3" size={25} />
					Inställningar för Emely
				</h4>
				<hr />

                {/* --- Speed settings --- */}
				<Row className="mb-4">
					<p className="mb-0 fw-bold">
						{' '}
						<Switch
							checked={speedChecked}
							onChange={handleSpeed}
							inputProps={{ 'aria-label': 'controlled' }}
						/>{' '}
						Långsammare Emely
					</p>
					<small>
						Slå på denna inställning om du vill att Emely ska prata långsammare
					</small>
				</Row>

                
				<h6 className="fw-bold mt-5">Intervju-inställningar</h6>
				<hr />

                {/* --- Small Talk Settings --- */}
				<Row className="mb-4">
					<p className="mb-0 settings-text fw-bold">
						{' '}
						<Switch
							checked={smallTalk}
							onChange={handleSmallTalk}
							inputProps={{ 'aria-label': 'controlled' }}
						/>{' '}
						Småprat med Emely
					</p>

					<small className="mt-0 ">
						Om du aktiverar denna inställning så kommer Emely att småprata med
						dig innan hon börjar intervjun. Notera att inställningen inte har
						någon effekt om den ändras mitt i intervjun
					</small>
				</Row>

                {/* --- Has experience settings --- */}
				<Row className="mb-4">
					<p className="mb-0 fw-bold settings-text">
						{' '}
						<Switch
							checked={hasExperience}
							onChange={handleHasExperience}
							inputProps={{ 'aria-label': 'controlled' }}
						/>{' '}
						Tidigare Erfarenhet
					</p>
					<small className="mt-0">
						Om du har tidigare erfarenhet av ett arbete, slå på denna
						inställning för att Emely ska bemöta dig på ett passande sätt.
						Notera att inställningen inte har någon effekt om den ändras mitt i
						intervjun.
					</small>
				</Row>
					<Row>	
				<span className="text-end">
				<Button
				variant="outline-success"
				className="mt-4 register-btn_small"
				onClick={props.closeModal}
			>
				<MdKeyboardArrowLeft size={25} /> TILLBAKA
			</Button>
			</span>
			</Row>
			</Container>
		</>
	);
}
