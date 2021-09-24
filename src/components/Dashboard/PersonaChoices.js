import React from 'react';
import { Button } from 'react-bootstrap';
import { FiBriefcase } from 'react-icons/fi';
import { FiCoffee } from 'react-icons/fi';

export default function Choices() {
	return (
		<>
			<Button
				className="w-49 rounded-pill  m-3 p-4 shadow-sm fw-bold"
				variant="success"
			>
				<FiBriefcase size={30} /> SÖKA JOBB-ASSISTENT
			</Button>
			<Button
				className="w-59 rounded-pill m-3 p-4 shadow-sm fw-bold"
		
				variant="success"
			>
				<FiCoffee size={30} /> FIKA-KOMPIS
			</Button>
		</>
	);
}
