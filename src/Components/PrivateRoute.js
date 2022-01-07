import React, { useState, useEffect } from 'react';
import { Button, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu/UserMenu';
import ChatMenu from './ChatMenu/ChatMenu';
import { useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage/AlertMessage';
import introJs from 'intro.js';
import {
	HideBetween,
	HideDuring,
	HideOn,
	HideScroll,
} from 'react-hide-on-scroll';

export default function PrivateRoute({ component: Component, ...rest }) {
	/* ------ Variables, Hooks & State ------ */
	const {
		currentUser,
		allKeys,
		getKeys,
		isGuest,
		msg,
		msgVariant,
		userDetails,
		showInstructions,
	} = useAuth();
	const [isCorrectKey] = useState(sessionStorage.getItem('sessionKey'));
	const [enableChatMenu, setEnableChatMenu] = useState(false);
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

	useEffect(() => {
		if (
			userDetails?.login_count <= 1 &&
			userDetails?.show_instructions === true
		) {
			const timer = setTimeout(() => {
				handleIntro();
				if (window.location.href.indexOf('emely-chat') > -1) {
					return showInstructions(currentUser.uid);
				} 
				
			}, 1500);
			return timer;
		}
	}, [window.location.href]);

	function handleIntro() {
		introJs()
			.setOptions({
				showProgress: true,
				tooltipClass: 'customTooltip',
				disableInteraction: true,
				doneLabel: 'OK',
				nextToDone: true,
				nextLabel: 'NÄSTA',
				prevLabel: 'TILLBAKA',
			})
			.start();
	}

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

			<HideScroll variant="down">
				<div id="hide" className="fixed-top help-button-wrapper">
					<OverlayTrigger
						key="top"
						placement="bottom"
						overlay={
							<Popover id={`popover-positioned-top`}>
								<Popover.Header
									style={{ fontSize: '0.7rem' }}
								>{`Instruktioner`}</Popover.Header>
								<Popover.Body style={{ fontSize: '0.7rem' }}>
									Klicka på frågetecknet för att få tips och instruktioner kring
									interaktionen med Emely.
								</Popover.Body>
							</Popover>
						}
					>
						<Button onClick={handleIntro} variant="light" className="help-button">
							?
						</Button>
					</OverlayTrigger>
				</div>
			</HideScroll>

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
