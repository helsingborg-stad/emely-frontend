import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu/UserMenu';
import GuestMenu from './GuestMenu/GuestMenu';
import ChatMenu from './ChatMenu/ChatMenu';
import { useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage/AlertMessage';

export default function PrivateRoute({ component: Component, ...rest }) {
	/* ------ Variables, Hooks & State ------ */
	const { currentUser, allKeys, getKeys, isGuest, msg, msgVariant } = useAuth();
	const [isCorrectKey] = useState(sessionStorage.getItem('sessionKey'));
	const [enableChatMenu, setEnableChatMenu] = useState(false);
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

	/* --- Check if you have started chatting with Emely and enable ChatMenu --- */
	useEffect(() => {
		try {
			if (window.location.href.indexOf('emely-chat') > -1) {
				return setEnableChatMenu(true);
			} else {
				return setEnableChatMenu(false);
			}
		} catch (error) {
			console.log(error);
		}
	}, [window.location.href]);

	/* --- Checking if the sessionKey is correct else redirects back to home --- */
	useEffect(() => {
		try {
			getKeys();

			/* Iterates through all keys */
			for (let key of Object.keys(allKeys)) {
				if (isCorrectKey === allKeys[key]) {
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
			{/* --- Render GuestMenu if guest is logged in else render regular UserMenu on login --- */}
			 <UserMenu />

			{/* --- If you are chatting with Emely render ChatMenu --- */}
			{enableChatMenu ? <ChatMenu /> : null}

			{/* --- Render page if you are logged in & sessionKey is correct, else redirect back to login --- */}
			<Route
				{...rest}
				render={(props) => {
					return currentUser && isCorrectKey ? (
						<Component {...props} />
					) : (
						<Redirect to="/login" />
					);
				}}
			></Route>
		</>
	);
}
