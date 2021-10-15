import React from 'react';

export default function AuthLayout(props) {
	return (
		<>
        {/* This layout is used for authentication components (Login, Signup, etc.) */}
			<div className="mb-3" id="container-auth">
				{props.children}
			</div>
		</>
	);
}
