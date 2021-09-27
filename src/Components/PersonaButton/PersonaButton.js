import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Choices(props) {
	return (
		<>

		{/* Props for occupations 
		
			<div>
			<h3>Occupations</h3>
			<ul>
			{props.occupation.occupations.map((job, i) => <li key={i}>{job}</li>)}
			</ul>
			</div>
		*/}

			<Link to={props.linkTo}>
				<Button
					className="rounded-pill  m-3 p-4 shadow-sm fw-bold"
					variant="success"
				>
					{props.children}
				</Button>
			</Link>

			{/* 
				<Button
				className="rounded-pill m-3 p-4 shadow-sm fw-bold"
				variant="success"
				>
				
				</Button>
			*/}
			
		</>
	);
}
