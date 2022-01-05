import React from 'react';

import { Container } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import PersonaInstructions from '../../Components/Instructions/PersonaInstructions';
import JobInstructions from '../../Components/Instructions/JobInstructions';
import ChatInstructions from '../../Components/Instructions/ChatInstructions';
import Divider from '@mui/material/Divider';
import PersonaButtons from '../../Assets/images/persona-buttons.png';

export default function Instructions() {
	return (
		<>
			{/* Components for different profile-settings */}
			<Container className="mt-5">
				<PersonaInstructions />
                <JobInstructions />
                <ChatInstructions />

			</Container>
		</>
	);
}
