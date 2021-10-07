import React, { useContext, useState, useEffect } from 'react';
import { auth, dbUsers } from '../firebase';
import firebase from 'firebase/app';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

/* Variable declaration */
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [userDetails, setUserDetails] = useState();
	const [loading, setLoading] = useState(true);

	/* Firebase functions used when handling users */
	/* Sign up with email and password */
	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	/* Create the user in firestore */
	function createUser(
		email,
		username,
		birthYear,
		nativeLanguage,
		currentOccupation,
		uid
	) {
		dbUsers.doc(uid).set({
			uid: uid,
			email: email,
			username: username,
			birth_year: birthYear,
			native_language: nativeLanguage,
			current_occupation: currentOccupation,
			login_count: 1,
		});
	}

	/* Log in with email and password */
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	/* Fetch user details from a user-id and push to userDetails state */
	function getUserDetails(userId) {
		try {
			dbUsers
				.doc(userId)
				.get()
				.then((snapshot) => {
					const userData = snapshot.data();
					setUserDetails(userData);
				});
		} catch {}

		return userDetails;
	}

	/* Increment login_count when login */
	function updateLoginCount(uid) {
		const increment = firebase.firestore.FieldValue.increment(1); //firebase increment function

		dbUsers.doc(uid).update({
			login_count: increment,
		});
	}

	/* Log out current authenticated user */
	function logout() {
		return auth.signOut();
	}

	/* Reset the password with email */
	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	/* Update email */
	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updateUsername(uid, username) {
		dbUsers.doc(uid).update({
			username: username,
		});
	}

	function updateCurrentOccupation(uid, currentOccupation) {
		dbUsers.doc(uid).update({
			current_occupation: currentOccupation,
		});
	}

	
	function updateNativeLanguage(uid, nativeLanguage) {
		dbUsers.doc(uid).update({
			native_language: nativeLanguage,
		});
	}

	function updateBirthYear(uid, birthYear) {
		dbUsers.doc(uid).update({
			birth_year: birthYear,
		});
	}



	/* Update password */
	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);

			setLoading(false);
		});

		return unsubscribe;
	});

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		updateUsername,
		updateCurrentOccupation,
		updateBirthYear,
		updateNativeLanguage,
		createUser,
		updateLoginCount,
		getUserDetails,
		userDetails,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
