import React, { useContext, useState, useEffect } from 'react';
import { auth, dbUsers, db } from '../firebase';
import {
	getFirestore,
	getDoc,
	doc,
	setDoc,
	updateDoc,
	collection,
	increment,
	DocumentSnapshot,
} from 'firebase/firestore';
import {
	updateEmail,
	updatePassword,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';

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
		return createUserWithEmailAndPassword(auth, email, password);
	}

	/* Create the user in firestore */
	async function createUser(
		email,
		username,
		birthYear,
		nativeLanguage,
		currentOccupation,
		uid
	) {
		await setDoc(doc(dbUsers, uid), {
			uid: uid,
			email: email,
			username: username,
			birth_year: birthYear,
			native_language: nativeLanguage,
			current_occupation: currentOccupation,
			login_count: 1,
		})
	}

	/* Log in with email and password */
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	/* Fetch user details from a user-id and push to userDetails state */
	async function getUserDetails(userId) {
		try {
			const docRef = doc(dbUsers, userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				setUserDetails(userData);
			} else {
				console.log('Error fetching User');
			}
		} catch {}

		return userDetails;
	}

	/* Increment login_count when login */
	function updateLoginCount(uid) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			login_count: increment(1),
		});
	}

	/* Log out current authenticated user */
	function logout() {
		return auth.signOut();
	}

	/* Reset the password with email */
	function resetPassword(email) {
		return sendPasswordResetEmail(currentUser, email);
	}

	/* Update username */
	function updateUsername(uid, username) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			username: username,
		});
	}

	/* Update current occupation */
	function updateCurrentOccupation(uid, currentOccupation) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			current_occupation: currentOccupation,
		});
	}

	/* Update native language*/
	function updateNativeLanguage(uid, nativeLanguage) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			native_language: nativeLanguage,
		});
	}

	/* Update birth year */
	function updateBirthYear(uid, birthYear) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			birth_year: birthYear,
		});
	}

	/* Update password */
	function passwordUpdate(password) {
		return updatePassword(auth.currentUser, password);
	}

	/* Update email */
	function emailUpdate(newEmail) {
		return updateEmail(currentUser, newEmail);
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
		emailUpdate,
		passwordUpdate,
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