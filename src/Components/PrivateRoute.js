import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu/UserMenu';
import GuestMenu from './GuestMenu/GuestMenu';
import ChatMenu from './ChatMenu/ChatMenu';
import { Link, useHistory } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser, correctKey, allKeys, getKeys } = useAuth();
	const [userEmail, setUserEmail] = useState('');
	const [isCorrectKey, setIsCorrectKey] = useState(
		sessionStorage.getItem('sessionKey')
	);
	const [progressOn, setProgressOn] = useState(false);
	var root = document.querySelector(':root');


	
	const history = useHistory();

	/* Check if you are on fika or intervju and change background */
	useEffect(() => {
		try {
			
			/* If you are on fika */
			if (window.location.href.indexOf('fika') > -1) {
				return document.body.style.background = "var(--fika)";
				
			/* If you are on intervju */
			} else if (window.location.href.indexOf('intervju') > -1) {
				return document.body.style.background= "var(--interview)";
			
			} else {
				return document.body.style.background = 'var(--mainBackground)';

			}
		} catch (error) {
			console.log(error);
		}
			
	}, [window.location.href]);


  useEffect(() => {
		try {
			if (window.location.href.indexOf('emely-chat') > -1) {
				return setProgressOn(true);
				
			} else {
				return setProgressOn(false);

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

	useEffect(() => {
		try {
			if (currentUser.email === 'guest@emely.com') {
				setUserEmail('guest@emely.com');
			} else {
				setUserEmail('');
			}
		} catch (error) {
			console.log(error);
		}
	}, []);



	return (
		<>
			{/* Render GuestMenu if guest is logged in else render regular UserMenu on login */}
			{userEmail !== '' ? <GuestMenu /> : <UserMenu />}
			{progressOn ? <ChatMenu /> : null}
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
