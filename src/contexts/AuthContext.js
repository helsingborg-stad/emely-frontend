import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth, dbUsers, db, dbReportedMessages } from '../firebase';
import axios from 'axios';

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
	reauthenticateWithCredential,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	/* --- Variables, States & Hooks --- */
	const [currentUser, setCurrentUser] = useState();
	const [userDetails, setUserDetails] = useState();
	const [correctKey, setCorrectKey] = useState(true);
	const [loading, setLoading] = useState(true);

	const [isDeleting, setIsDeleting] = useState(false);
	const [allKeys, setAllKeys] = useState([]);
	const [allDocs, setAllDocs] = useState([]);
	const history = useHistory();
	const [isGuest, setIsGuest] = useState(false);
	const [lockingUp, setLockingUp] = useState(false);
	const [guestId] = useState('mcK6kHLV4nh33XJmO2tJXzokqpG2');

	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [useHuggingFace, setUseHuggingFace] = useState(
		sessionStorage.getItem('useHuggingFace')
	);

	useEffect(() => {
		getKeys();
	}, []);

	/* ---- Check for user changes ---- */
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			try {
				setLoading(false);
				const uid = user.uid;

				if (currentUser) {
					console.log('You are signed in!');
					return <Redirect to="/dashboard" />;
				} else {
					console.log('Signed out!');
					return <Redirect to="/login" />;
				}
			} catch (error) {
				console.log('Signed out!');
			}
		});

		return unsubscribe;
	}, [currentUser]);

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
		try {
			setIsDeleting(true);

			await deleteUser(auth.currentUser)
				.then(() => {
					console.log('User deleted from Firebase Auth');
					setMsgVariant('warning');
					setMsg(
						'Ditt konto har raderats. Skapa ett nytt konto om du vill använda Emely.'
					);
					setIsDeleting(false);
				})
				.catch((error) => {
					console.log(error.message);
					setMsgVariant('danger');
					setMsg(translateError(error.code));

					if (error.code === 'auth/requires-recent-login') {
						return logout();
					}
				});
		} catch (error) {
			console.log(error);
		}
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
				setMsgVariant('success');
				setMsg(
					'Ett återställningsemail har skickats till den angivna e-postadressen (glöm inte att kolla skräpposten).'
				);
			})
			.catch((error) => {
				console.log(error.code);
				setMsgVariant('danger');
				setMsg(translateError(error.code));
			});
	}

	/* ---- Update password ---- */
	async function passwordUpdate(password) {
		try {
			console.log('Password updated');
			await updatePassword(currentUser, password);
			setMsgVariant('success');
			setMsg(
				'Du har ändrat ditt lösenord. Vänligen logga in igen med ditt nya lösenord.'
			);
			return logout();
		} catch (error) {
			console.log(error.code);
			setMsgVariant('danger');
			setMsg(translateError(error.code));

			/* --- If login-token expires, logout user and try again --- */
			if (error.code === 'auth/requires-recent-login') {
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
				return 'E-postadressen du angav finns inte registrerad.';

			case 'auth/too-many-requests':
				return 'För många försök. Vänligen försök igen lite senare';

			case 'auth/requires-recent-login':
				return 'Du har varit inloggad för länge. Logga in igen för att slutföra.';

			default:
				return 'Opps något gick fel!';
		}
	}

	/* ---- FIRESTORE QUERIES ---- */

	/* --- Check if the input key matches keys in database --- */
	function checkKey(inputKey) {
		/* Format the date so it matches the deadline date */
		const date = new Date();
		var dateInSeconds = date.getTime() / 1000; // format date in seconds

		allKeys.every((item) => {
			if (inputKey === item.key) { // if key matches
				if (dateInSeconds <= item.deadline.seconds) {
					sessionStorage.setItem('customer', item.customer);
					sessionStorage.setItem('sessionKey', inputKey);
					setCorrectKey(true);
					setMsgVariant('success');
					setMsg('Giltig nyckel!');

					/* If key doesnt have useHuggingFace set it to false */
					if (item.useHuggingFace != null) { // if key + date matches
						sessionStorage.setItem('useHuggingFace', item.useHuggingFace);
						setUseHuggingFace(sessionStorage.getItem('useHuggingFace'));
					} else {
						sessionStorage.setItem('useHuggingFace', false);
						setUseHuggingFace(sessionStorage.getItem('useHuggingFace'));
					}

					/* Update key login-count */
					const keyRef = doc(db, 'keys', inputKey);
					updateDoc(keyRef, {
						login_count: increment(1),
					});

					history.push('/login');
					return false;
				} else {
					setMsgVariant('danger');
					setMsg('Passerat utgångsdatum');
					console.log('out of date');
					sessionStorage.setItem('sessionKey', 'wrong key');
					setCorrectKey(false);

					return false;
				}
			} else {
				sessionStorage.setItem('sessionKey', 'wrong key');
				setMsgVariant('danger');
				setMsg('Fel nyckel! Vänligen försök igen');
				history.push('/');
				return true;
			}
		});
	}

	/* --- Get all keys from firestore --- */
	async function getKeys() {
		try {
			const querySnapshot = await getDocs(collection(db, 'keys'));
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
			const d = new Date();
			const date = d.toISOString().split("T")[0];
			const time = d.toTimeString().split(" ")[0];

			await setDoc(doc(dbReportedMessages), {
				conversation_id: conversationId,
				text: text,
				created_at: `${date} ${time}`,
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
			show_instructions: true,
			customer: sessionStorage.getItem('customer'),
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

	/* ---- Update show instructions ---- */
	function showInstructions(uid) {
		const userRef = doc(dbUsers, uid);
		updateDoc(userRef, {
			show_instructions: false,
		});
		console.log('User info updated');
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
	async function deleteFirestoreUser(uid) {
		setIsDeleting(true);
		try {
			await deleteDoc(doc(dbUsers, uid));
			console.log('User info deleted from firestore');
			setIsDeleting(false);
		} catch (error) {
			console.log('Error: User info not deleted from firestore');
		}
	}

	/* ---- Delete all user conversations  ---- */
	async function deleteAllUserConversations(uid) {
		try {
			setIsDeleting(true);
			const response = await axios
				.post(
					`${process.env.REACT_APP_API_URL}/user_delete?user_id=${currentUser.uid}`
				)
				.then((response) => {
					console.log('All conversations deleted form database');
					setIsDeleting(false);
				})
				.catch(function (error) {
					console.log('Error fetching conversations');
				});
		} catch (err) {
			console.log('Error: ', err);
		}
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
		showInstructions,
		deleteAllUserConversations,
		loading,
		setLoading,
		isDeleting,
		lockingUp,
		setLockingUp,
		correctKey,
		setCorrectKey,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
