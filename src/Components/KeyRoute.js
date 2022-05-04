import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage/AlertMessage';

export default function KeyRoute({ component: Component, ...rest }) {
	/* ------ Variables, Hooks & State ------ */
	const {
		getKeys,
		allKeys,
		msg,
		setMsgVariant,
		setMsg,
		isCorrectKey,
		checkKey,
		correctKey,
		setCorrectKey,
	} = useAuth();
	const history = useHistory();


	/* --- Check if you are on fika or intervju and change background accordingly --- */
	useEffect(() => {
		try {
			/* --- If you are on fika --- */
			if (window.location.href.indexOf('fika') > -1) {
				const fikaBackground = (document.body.style.background = 'var(--fika)');
				return fikaBackground;

				/* --- If you are on intervju --- */
			} else if (window.location.href.indexOf('intervju') > -1) {
				const interviewBackground = (document.body.style.background =
					'var(--interview)');
				return interviewBackground;
			} else {
				const mainBackground = (document.body.style.background =
					'var(--mainBackground)');
				return mainBackground;
			}
		} catch (error) {
			console.log(error);
		}
	}, [window.location.href]);

	/* Check if key matches database-key */
	useEffect(() => {
		const date = new Date();
		var dateInSeconds = date.getTime() / 1000;

		try {
			allKeys.every((key) => {
				if (key.key === sessionStorage.getItem('sessionKey')) {
					if (key.deadline.seconds >= dateInSeconds) {
						setCorrectKey(true);
						return false;
					} else {
						setCorrectKey(false);
						return false;
					}
				} else {
					setCorrectKey(false);
					return true;
				}
			});
		} catch (error) {
			console.log(error.message);
		}
	}, [window.location.href]);

	return (
		<>
			{msg && <AlertMessage />}
			<Route
				{...rest}
				render={(props) => {
					{
						/* If key is correct render page else redirect back to home */
					}
					return correctKey ? <Component {...props} /> : <Redirect to="/" />;
				}}
			></Route>
		</>
	);
}