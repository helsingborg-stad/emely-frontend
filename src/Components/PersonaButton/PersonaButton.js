import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Choices(props) {
	return (
		<>
					<Link to={props.linkTo}>
						<Button
							className="rounded-pill p-4 shadow-sm fw-bold border-3"
							variant="outline-success"
						>
							{props.children}
						</Button>
						<div className="fw-bold mt-3" style={{ fontSize: "1.2rem" }}>{props.name}</div>
					</Link>
		</>
	);
}
