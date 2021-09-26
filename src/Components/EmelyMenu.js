import React from 'react';
import { Button } from 'react-bootstrap';

export default function EmelyMenu() {
	return (
		<>
			<div className="fixed-top">
				<Button className="rounded-circle" variant="light">
					<i className="fa fa-home p-3 text-center"></i>
				</Button>
				<Button className="m-2 rounded-circle" variant="light">
					<i className="fa fa-volume-up p-3 text-center"></i>
				</Button>
			</div>
		</>
	);
}
