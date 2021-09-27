import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WorkButton(props) {
	return (
		<>
			<div
				className="mt-1 justify-content-center"
				id="work-buttons-container-desktop"
			>
				{props.occupation.occupations.map((job, i) => (
					
						<Button
							className="rounded-pill m-4 p-3 shadow-sm"
							variant="light"
							key={i}
						>
							<Link to="/emely-chat">{job}</Link>
						</Button>
					
				))}
			</div>

			<div
				className="w-100 mt-1 justify-content-center"
				id="work-buttons-container-mobile"
			>
				<Dropdown>
					<Dropdown.Toggle
						className="w-100 rounded-pill shadow-sm p-3"
						variant="light"
						id="dropdown-basic"
					>
						Välj yrke
					</Dropdown.Toggle>

					<Dropdown.Menu className="w-100">
						{props.occupation.occupations.map((job, i) => (
							<Dropdown.Item href="/emely-chat" key={i} className="w-100" >
                            {job}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</>
	);
}
