import React, { useState, useEffect } from 'react';
import { Alert, CloseButton } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from 'react-bootstrap';

export default function AlertMessage(props) {
	const [show, setShow] = useState(true);
	const { msg, setMsg, msgVariant } = useAuth();

	function handleDismiss() {
		setShow(false);
		setMsg('')
	}

	useEffect(() => {
		setShow(true);
		const timer = setTimeout(() => {
			setShow(false);
			setMsg('')
		}, 3000);
		return timer;

	}, [msg])



	return (
		<>
			{show ? (
				<Container className="alert-container fixed-bottom">
				<Alert
				className="alert-message text-center mb-5 fw-bold shadow-sm"
				variant={msgVariant}
				dismissible
				
				>
				{msg}
				<CloseButton aria-label="Hide" onClick={handleDismiss} />
				</Alert>
				</Container>
				) : null }
		</>
	);
}
