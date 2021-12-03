import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from 'react-bootstrap';

export default function AlertMessage(props) {
	/* --- Variables, Hooks & State --- */
	const [show, setShow] = useState(true);
	const { msg, setMsg, msgVariant } = useAuth();

	/* Close Alert */
	function handleDismiss() {
		setShow(false);
		setMsg('');
	}

	/* --- Close Alert automatically --- */
	useEffect(() => {
		setShow(true);
		const timer = setTimeout(() => {
			setShow(false);
			setMsg('');
		}, 4000);
		return timer;
	}, [msg]);

	return (
		<>
			{/* --- Displays Alert if msg is not empty --- */}
			{show ? (
				<Container className="alert-container fixed-top">
					<Alert
						className="alert-message text-center mb-5 fw-bold shadow-sm"
						variant={msgVariant}
						onClick={handleDismiss}
					>
						{msg}
					</Alert>
				</Container>
			) : null}
		</>
	);
}
