import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ConversationContext } from '../../contexts/ConversationContext';
import { useAuth } from '../../contexts/AuthContext';

import EmelyChatBubble from '../../Components/EmelyChatBubble/EmelyChatBubble';
import UserChatBubble from '../../Components/UserChatBubble/UserChatBubble';
import ChatInput from '../../Components/ChatInput/ChatInput';
import ErrorBoundary from '../../Components/ErrorBoundary';
import PulseLoader from 'react-spinners/PulseLoader';


export default function EmelyChat(props) {
	/* === Variables, Hooks & State === */
	const [isFocused, setFocused] = useState(false);
	const [isValidationError, setValidationError] = useState(false);
	const { currentUser, userDetails } = useAuth();
	// get :persona from router-dom (intervju or fika)
	const { persona } = props.match.params;
	const scroll = useRef();
	const {
		currentJob,
		formatedTimestamp,
		initConversation,
		isLoading,
		sessionConversation,
		setSessionConersation,
		conversationId,
		setCurrentProgress,
	} = useContext(ConversationContext);

	/* ---- Gets a user ID and starts a conversation with Emely from the beginning every  first rendering ---- */
	useEffect(() => {
		setSessionConersation([]);
		setCurrentProgress(0);
	}, [persona]);

	/* ---- Runs when userDetails has been known ---- */
	useEffect(() => {
		try {
			if (currentUser) {
				initConversation(
					userDetails.username,
					currentJob,
					formatedTimestamp(),
					persona
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	}, [window.location.href]);

	/* ---- Tracks and renders new messages, scrolls them up ---- */
	useEffect(() => {
		renderMessages();
		scrollToTop(scroll);
	}, [sessionConversation, isValidationError]);

	useEffect(() => {
		if (isFocused) {
			renderMessages();
			scrollToTop(scroll);
		}
	}, [isFocused]);

	const scrollToTop = (ref) => {
		window.scrollTo(0, ref.current?.offsetTop);
		// scroll.current?.scrollIntoView({ behavior: "smooth" });
	};

	/* Renders messages user/emely */
	const renderMessages = () => {
		return sessionConversation.map((msg, i) => {
			if (msg.type === 'user') {
				return (
					/* User messages */
					<div ref={scroll}>
						<UserChatBubble
							convId={msg.conversation_id}
							message={msg.text}
							key={i}
						/>
					</div>
				);
			} else {
				return (
					/* Emely messages */
					<div ref={scroll}>
						<EmelyChatBubble
							convId={msg.conversation_id}
							message={msg.text}
							key={i}
						/>
					</div>
				);
			}
		});
	};

	return (
		<>
			<Container className="emely-chat-container">
				<div className="emely-chat_wrapper">
					{sessionConversation.length > 0 ? (
						renderMessages()
					) : (
						<EmelyChatBubble
							isLoading="true"
							loader={<PulseLoader size={6} color={'#979797'} />}
						/>
					)}

					{/* ---- Renders Emely loader (waiting for a response from the server ) ---- */}
					{isLoading && (
						<div ref={scroll}>
							<EmelyChatBubble
								isLoading={isLoading}
								loader={<PulseLoader size={6} color={'#979797'} />}
							/>
						</div>
					)}

					{/* ---- Renders user loader (if textarea onFocus) ---- */}
					{isFocused && (
						<div ref={scroll}>
							<UserChatBubble
								isFocused={isFocused}
								loader={<PulseLoader size={6} color={'#979797'} />}
							/>
						</div>
					)}
					{/* ---- Renders Emely warning massage if user message contains a special signs or is empty */}
					{isValidationError && (
						<div ref={scroll}>
							<EmelyChatBubble
								isValidationError={isValidationError}
								loader={<PulseLoader size={6} color={'#979797'} ref={scroll} />}
							/>
						</div>
					)}
				</div>
				{/* <div style={{border: "1px solid red"}} ref={scroll}></div> */}
				<ErrorBoundary>
					<ChatInput
						persona={persona}
						setFocused={setFocused}
						setValidationError={setValidationError}
					/>
				</ErrorBoundary>
			</Container>
		</>
	);
}
