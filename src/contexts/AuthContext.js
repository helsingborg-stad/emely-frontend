import React, { useContext, useState, useEffect } from 'react';
import { auth, dbUsers } from '../firebase';
import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	increment,
	deleteDoc,
} from 'firebase/firestore';
import {
	updateEmail,
	updatePassword,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	deleteUser,
} from 'firebase/auth';



const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [userDetails, setUserDetails] = useState();
	const [loading, setLoading] = useState(true);

	/* ---- Check for user changes ---- */
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		
			setLoading(false);
		});

		return unsubscribe;
	});

	/* ---- FIREBASE AUTHENTICATION ---- */

	/* ---- Sign up new user with email and password ---- */
	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	/* ---- Log in with email and password ---- */
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	/* ---- Delete user from Firebase Authentication ---- */
	function userDelete() {
		deleteUser(auth.currentUser)
			.then(() => {
				console.log('User deleted');
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	/* ---- Log out current authenticated user ---- */
	function logout() {
		return auth.signOut();
	}

	/* ---- Reset password with email ---- */
	function resetPassword(email) {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				console.log('Password reset email sent');
			})
			.catch((error) => {
				console.log(error.code);
			});
	}

	/* ---- Update password ---- */
	function passwordUpdate(password) {
		console.log("Password updated")
		return updatePassword(currentUser, password);
	}

	/* ---- Translate auth errors ---- */
	function translateError(errorMessage) {
		switch (errorMessage) {
			case 'auth/email-already-in-use':
				return 'E-postadressen är redan upptagen. Vänligen välj en annan e-postadress.';

			case 'auth/weak-password':
				return 'Lösenordet måste vara minst 6 karaktärer. Vänligen försök igen.';

			case 'auth/wrong-password':
				return 'Fel lösenord. Vänligen försök igen';

			case 'auth/user-not-found':
				return 'E-postadressen du angav finns inte registrerad. Vänligen försök igen';

			case 'auth/too-many-requests':
				return 'För många försök. Vänligen försök igen lite senare';

			case 'auth/requires-recent-login':
				return 'Du har blivit utloggad. Logga in igen.';

			default:
				return 'Opps något gick fel!';
		}
	}

	/* ---- FIRESTORE QUERIES ---- */

	/* ---- Create user in Firestore with signup information ---- */
	async function createUser(
		email,
		username,
		birthYear,
		nativeLanguage,
		currentOccupation,
		uid,
		creationTime
	) {
		await setDoc(doc(dbUsers, uid), {
			uid: uid,
			email: email,
			username: username,
			birth_year: birthYear,
			native_language: nativeLanguage,
			current_occupation: currentOccupation,
			login_count: 1,
			created_at: creationTime,
			last_sign_in: creationTime,
		});
		console.log("User created in firestore")
	}

	/* ---- Fetch information from firestore, with user id & set userDetails ---- */
	async function getUserDetails(userId) {
		try {
			const docRef = doc(dbUsers, userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				setUserDetails(userData);
				console.log("Successfully fetched user data from firestore")
			} else {
				console.log('Error fetching User');
			}
		} catch {}

		return userDetails;
	}

	/* ---- Update user information on login ---- */
	function updateUserInfo(uid, lastSignInTime) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			login_count: increment(1),
			last_sign_in: lastSignInTime,
		});
		console.log("User info updated on log in");
	}

	/* ---- Update username ---- */
	function updateUsername(uid, username) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			username: username,
		});
		console.log("Username updated")
	}

	/* ---- Update current occupation ---- */
	function updateCurrentOccupation(uid, currentOccupation) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			current_occupation: currentOccupation,
		});
		console.log("Current occupation updated")
	}

	/* ---- Update native language ---- */
	function updateNativeLanguage(uid, nativeLanguage) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			native_language: nativeLanguage,
		});
		console.log("Native language updated")
	}

	/* ---- Update birth date ---- */
	function updateBirthYear(uid, birthYear) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			birth_year: birthYear,
		});
		console.log("Birth date updated")
	}

	/* ---- Update email in Firestore ---- */
	function emailUpdate(newEmail) {
		updateEmail(currentUser, newEmail)
			.then(() => {
				const userRef = doc(dbUsers, currentUser.uid);
				updateDoc(userRef, {
					email: newEmail,
				});
				console.log('Email updated');
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	/* ---- Delete user information from Firestore ---- */
	function deleteFirestoreUser(uid) {
		deleteDoc(doc(dbUsers, uid));
		console.log("User deleted")
	}

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
		updateUserInfo,
		getUserDetails,
		userDetails,
		userDelete,
		deleteFirestoreUser,
		translateError,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
