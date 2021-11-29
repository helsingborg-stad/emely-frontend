import React, { useState, useEffect } from 'react';
import userLogo from '../../Assets/images/user_logo.svg';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../contexts/AuthContext';

const UserChatBubble = ({ message, isFocused, loader }) => {
	const [isGuest, setIsGuest] = useState(false);

	useEffect(() => {
		/* Change avatar if guest vs user */
		try {
			if (currentUser.uid !== 'mcK6kHLV4nh33XJmO2tJXzokqpG2') {
				return setIsGuest(true);
			} else {
				return setIsGuest(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	const { currentUser, logout, userDetails, getUserDetails } = useAuth();
	return (
		<div className="user-chat-wrapper">
			<div className="user-img-wrapper">
				{isGuest ? (
					<Avatar
						className="fw-bold"
						sx={{ width: 40, height: 40 }}
						style={{ background: 'var(--green)', fontSize: '1rem' }}
					>
						{userDetails && userDetails.username.charAt(0)}
					</Avatar>
				) : (
					<Avatar
						className="fw-bold"
						sx={{ width: 40, height: 40 }}
						style={{ fontSize: '1rem' }}
					>
						G
					</Avatar>
				)}
			</div>

			<p className="user-dialogue-text">{isFocused ? loader : message}</p>
		</div>
	);
};

export default UserChatBubble;
