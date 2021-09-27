import React from 'react';

export default function AuthLayout(props) {
	return (
		<>
        {/* This layout is used for authentication components (Login, Signup, etc.) */}
			<div className="mt-3 mb-4" id="container-auth">
				{props.children}
			</div>
		</>
	);
}
