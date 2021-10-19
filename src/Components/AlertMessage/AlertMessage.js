import React, { useState } from 'react';
import { Alert, CloseButton } from 'react-bootstrap';

export default function AlertMessage(props) {
	const [show, setShow] = useState(true);

	function handleDismiss() {
		setShow(false);
	}

	return (
		<>
			<Alert
				className="fixed-top text-center fw-bold "
				variant={props.variant}
				style={{ display: show ? 'block' : 'none' }}
				dismissible
			>
				{props.message}
				<CloseButton aria-label="Hide" onClick={handleDismiss} />
			</Alert>
		</>
	);
}
