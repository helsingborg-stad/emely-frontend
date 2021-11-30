import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage/AlertMessage';

export default function KeyRoute({ component: Component, ...rest }) {
	/* ------ Variables, Hooks & State ------ */
	const { getKeys, allKeys, msg, msgVariant } = useAuth();
	const [isCorrectKey] = useState(sessionStorage.getItem('sessionKey'));
	const history = useHistory();

	/* --- Check if you are on fika or intervju and change background accordingly --- */
	useEffect(() => {
		try {
			/* --- If you are on fika --- */
			if (window.location.href.indexOf('fika') > -1) {
				const fikaBackground = document.body.style.background = 'var(--fika)';
				return fikaBackground;

				/* --- If you are on intervju --- */
			} else if (window.location.href.indexOf('intervju') > -1) {
				const interviewBackground = document.body.style.background = 'var(--interview)';
				return interviewBackground;
			} else {
				const mainBackground = document.body.style.background = 'var(--mainBackground)';
				return mainBackground;
			}
		} catch (error) {
			console.log(error);
		}
	}, [window.location.href]);

	/* --- Checking if the sessionKey is correct else redirects back to home --- */
	useEffect(() => {
		try {
			getKeys();

			/* --- Iterates through all keys --- */
			for (let key of Object.keys(allKeys)) {
				if (isCorrectKey === allKeys[key]) {
					/* --- If correct push to login page. --- */
					return history.push('/login');
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
    {msg && <AlertMessage />}
			<Route
				{...rest}
				render={(props) => {

          {/* If key is correct render page else redirect back to home */}
					return isCorrectKey ? <Component {...props} /> : <Redirect to="/" />;
				}}
			></Route>
		</>
	);
}
