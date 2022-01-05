import React, { useState, useEffect } from 'react';
import userLogo from '../../Assets/images/user_logo.svg';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../contexts/AuthContext';

const UserChatBubble = ({ message, isFocused, loader }) => {
	const { currentUser, logout, userDetails, isGuest } = useAuth();
	return (
		<div className="user-chat-wrapper">
			<div className="user-img-wrapper" alt="User">
				{isGuest ? (
					<Avatar
						className="fw-bold"
						sx={{ width: 40, height: 40 }}
						style={{ fontSize: '1rem' }}
					>
						G
					</Avatar>
				) : (
					<Avatar
						className="fw-bold"
						sx={{ width: 40, height: 40 }}
						style={{ background: 'var(--green)', fontSize: '1rem' }}
					>
						{userDetails && userDetails.username.charAt(0)}
					</Avatar>
				)}
			</div>

			<p className="user-dialogue-text">{message}</p>
		</div>
	);
};

export default UserChatBubble;
