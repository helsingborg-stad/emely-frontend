import React from 'react';

import { Container } from 'react-bootstrap';
import ProfileCard from '../../Components/Layout/ProfileCard/ProfileCard';
import Divider from '@mui/material/Divider';

export default function Instructions() {
	return (
		<>
			{/* Components for different profile-settings */}
			<ProfileCard className="mt-5">
				<Container id="instructions-container">
					<h4 className="fw-bold ">
						Hur interagerar jag med Emely?
					</h4>
					<Divider />
					<p className="instruction-text mt-3">
						Emely är en språkrobot med artificiell intelligens. Emely finns här
						för dig som vill öva på att skriva eller tala svenska. För att börja
						använda Emely så har du två alternativ: du kan välja att öva på
						arbetsintervju eller ta en fika och prata om vad som helst. 
					</p>
                    <h4 className="fw-bold mt-5">
                    Hur interagerar jag med Emely?
                </h4>
                <Divider />
				</Container>
			</ProfileCard>
		</>
	);
}
