import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from 'react-bootstrap';

import { MdOutlineClose } from 'react-icons/md'

export default function AlertMessage(props) {
	/* --- Variables, Hooks & State --- */
	const [show, setShow] = useState(false);
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
		}, 30000);

		return timer;

	}, [msg]);

	return (
		<>
			{/* --- Displays Alert if msg is not empty --- */}
			{show ? (
					<Alert
						className="alert-message mb-5 fw-bold shadow-sm d-flex fixed-top"
						variant={msgVariant}
						onClick={handleDismiss}
					>
						<span></span>
						<span className="text-center">{msg}</span>
						<MdOutlineClose className="fw-bold" size={'1.5rem'}/>
						
					</Alert>
			) : null}
		</>
	);
}
