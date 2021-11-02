import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import UserMenu from "./UserMenu/UserMenu";
import GuestMenu from "./GuestMenu/GuestMenu";
import { Link, useHistory } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, correctKey, allKeys, getKeys } = useAuth()
  const [userEmail, setUserEmail] = useState('')
  const [isCorrectKey, setIsCorrectKey] = useState(sessionStorage.getItem('sessionKey'));

  const history = useHistory();

  /* --- Checking if the sessionKey is correct else redirects back to home --- */
  useEffect(() => {
    try{
      getKeys();

    /* Iterates through all keys */
    for (let key of Object.keys(allKeys)) {
			if (isCorrectKey === allKeys[key] ) {
				return history.push('/login');
			} 
		}
      
    } catch (error){
      console.log(error)
    }
  }, [])

  useEffect(() => {
    try{

      if(currentUser.email === 'guest@emely.com'){
        setUserEmail('guest@emely.com')
      } else {
        setUserEmail('')
      }
    } catch(error){
      console.log(error)
    }
  }, [])

  return (
    <>
  {/* Render GuestMenu if guest is logged in else render regular UserMenu on login */}
    {userEmail !== '' ?  <GuestMenu /> : <UserMenu /> }
    <Route
      {...rest}
      render={props => {
        return currentUser && isCorrectKey ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
    </>
  )
}