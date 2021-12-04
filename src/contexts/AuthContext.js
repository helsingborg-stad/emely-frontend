import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth, dbUsers, db, dbReportedMessages } from '../firebase';
import {
	doc,
	setDoc,
	updateDoc,
	increment,
	deleteDoc,
	onSnapshot,
	getDocs,
	collection,
} from 'firebase/firestore';

import {
	updateEmail,
	updatePassword,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	deleteUser,
	onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	/* --- Variables, States & Hooks --- */
	const [currentUser, setCurrentUser] = useState();
	const [userDetails, setUserDetails] = useState();
	const [correctKey, setCorrectKey] = useState();
	const [loading, setLoading] = useState(true);
	const [allKeys, setAllKeys] = useState();
	const history = useHistory();
	const [isGuest, setIsGuest] = useState(false);
	const [guestId] = useState('mcK6kHLV4nh33XJmO2tJXzokqpG2');

	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [useHuggingFace, setUseHuggingFace] = useState(false);

	/* ---- Check for user changes ---- */
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			try {
				setLoading(false);
				const uid = user.uid;

				if (uid === user.uid && uid !== guestId) {
					setIsGuest(false);
					console.log('You are signed in!');
					return <Redirect to="/dashboard" />;
				} else if (uid === guestId) {
					setIsGuest(true);
					console.log('You are signed in as Guest');
				} else {
					console.log('Signed out!');
					return <Redirect to="/login" />;
				}
			} catch (error) {
				console.log('Signed out!');
			}
		});

		return unsubscribe;
	}, [isGuest]);

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
	async function userDelete() {
		deleteFirestoreUser(currentUser.uid);
		await deleteUser(auth.currentUser)
			.then(() => {
				console.log('User deleted from Firebase');
				setMsgVariant('danger');
				setMsg(
					'Ditt konto har raderats. Skapa ett nytt konto om du vill ha den bästa upplevelsen med Emely.'
				);
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
	async function passwordUpdate(password) {
		try {
			console.log('Password updated');
			await updatePassword(currentUser, password);
			setMsgVariant('success');
			setMsg('Du har ändrat ditt lösenord. Vänligen logga in igen med ditt nya lösenord.');
			return logout();
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));

			/* --- If login-token expires, logout user and try again --- */
			if(error.code === "auth/requires-recent-login"){
				return logout();
			}
		}
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


	/* --- Check if the input key matches keys in database --- */
	function checkKey(inputKey, date) {
		/* Format the date so it matches the deadline date */
		const formattedDate = date.toLocaleDateString('se-SE')

		/* Iterate through all keys and check if the key matches inputKey and deadline date */
		for (let key of allKeys) {
			if (inputKey === key.key && formattedDate <= key.deadline) {
				setCorrectKey(true);
				sessionStorage.setItem('sessionKey', inputKey);

				/* If key doesnt have useHuggingFace set it to false */
				if (key.useHuggingFace != null) {
					setUseHuggingFace(key.useHuggingFace);
				} else {
					setUseHuggingFace(false);
				}

				/* Update key login-count */
				const keyRef = doc(db, 'keys', inputKey);
				updateDoc(keyRef, {
					login_count: increment(1),
				});
				setMsgVariant('success');
				setMsg(`Giltig nyckel! Utgångsdatum: ${key.deadline}.`);
				return history.push('/login');
			} else {
				setCorrectKey(false);
				sessionStorage.setItem('sessionKey', 'false');
				setMsgVariant('danger');
				setMsg('Fel nyckel eller passerat utgångsdatum! Vänligen försök igen');
			}
		}
	}

	/* --- Get all keys from firestore --- */
	async function getKeys() {
		try {
			const querySnapshot = await getDocs(collection(db, 'keys'));
			const allDocs = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				allDocs.push(data);
			});

			setAllKeys(allDocs);
		} catch (error) {
			console.log('Error:' + error.message);
		}

		setLoading(false);
	}

	/* ---- Send reported message to 'reported-messages' collection  ---- */
	async function reportMessage(conversationId, text) {
		try {
			await setDoc(doc(dbReportedMessages), {
				conversation_id: conversationId,
				text: text,
				created_at: new Date(),
			});
			console.log('Message reported, thanks for input!');
		} catch (error) {
			console.log(error);
		}
	}

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
		console.log('User created in firestore');
	}

	/* ---- Fetch information from firestore, with user id & set userDetails ---- */
	async function getUserDetails(userId) {
		try {
			/* Get user details from firestore if user is not Guest */

			onSnapshot(doc(dbUsers, userId), (doc) => {
				setUserDetails(doc.data());
			});
		} catch (error) {
			console.log(error.message);
		}

		return userDetails;
	}

	/* ---- Update user information on login ---- */
	function updateUserInfo(uid, lastSignInTime) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			login_count: increment(1),
			last_sign_in: lastSignInTime,
		});
		console.log('User info updated on log in');
	}

	/* ---- Update username ---- */
	function updateUsername(uid, username) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			username: username,
		});
		console.log('Username updated');
	}

	/* ---- Update current occupation ---- */
	function updateCurrentOccupation(uid, currentOccupation) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			current_occupation: currentOccupation,
		});
		console.log('Current occupation updated');
	}

	/* ---- Update native language ---- */
	function updateNativeLanguage(uid, nativeLanguage) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			native_language: nativeLanguage,
		});
		console.log('Native language updated');
	}

	/* ---- Update birth date ---- */
	function updateBirthYear(uid, birthYear) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			birth_year: birthYear,
		});
		console.log('Birth date updated');
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
		console.log('User deleted from Firestore');
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
		getKeys,
		checkKey,
		allKeys,
		reportMessage,
		isGuest,
		guestId,
		msg,
		setMsg,
		msgVariant,
		setMsgVariant,
		useHuggingFace,
		setUseHuggingFace,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
