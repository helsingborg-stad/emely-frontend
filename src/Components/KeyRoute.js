import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from 'react-router-dom';

export default function KeyRoute({ component: Component, ...rest }) {
  const { getKeys, allKeys } = useAuth()
  const [isCorrectKey, setIsCorrectKey] = useState(sessionStorage.getItem('sessionKey'));
  
  const history = useHistory();
  var root = document.querySelector(':root');


  	/* Check if you are on fika or intervju and change background */
	useEffect(() => {
		try {
			
			/* If you are on fika */
			if (window.location.href.indexOf('fika') > -1) {
				return document.body.style.background = "var(--fika)";
				
			/* If you are on intervju */
			} else if (window.location.href.indexOf('intervju') > -1) {
				return document.body.style.background= "var(--interview)";
			
			} else {
				return document.body.style.background = 'var(--mainBackground)';

			}
		} catch (error) {
			console.log(error);
		}
			
	}, [window.location.href]);
  
  
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