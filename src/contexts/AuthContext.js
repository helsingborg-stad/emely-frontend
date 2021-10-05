import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

/* Variable declaration */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [collection] = useState(process.env.REACT_APP_FIRESTORE_COLLECTION)
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)

  /* Firebase functions used when handling users */
  /* Sign up with email and password */
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function createUser(email, username, birthYear, nativeLanguage, currentOccupation, uid){
    db.collection(collection).doc(uid).set({
      email: email,
      username: username,
      birth_year: birthYear,
      native_language: nativeLanguage,
      current_occupation: currentOccupation,
    });
  }

  /* Log in with email and password */
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  /* Log out current authenticated user */
  function logout() {
    return auth.signOut()
  }

  /* Reset the password with email */
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  /* Update email */
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  /* Update username */
  function updateProfile(username) {
    return currentUser.updateProfile({displayName: username})
  }

  /* Update password */
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
  
        
        setLoading(false)
      
    })

    return unsubscribe
  })

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
    createUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}