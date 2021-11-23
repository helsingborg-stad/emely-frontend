import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from 'react-router-dom';

export default function KeyRoute({ component: Component, ...rest }) {
  const { getKeys, allKeys } = useAuth()
  const [isCorrectKey, setIsCorrectKey] = useState(sessionStorage.getItem('sessionKey'));
  
  const history = useHistory();
  var root = document.querySelector(':root');


  
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



  return (
    <>
  
    <Route
      {...rest}
      render={props => {
        return isCorrectKey ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
    </>
  )
}