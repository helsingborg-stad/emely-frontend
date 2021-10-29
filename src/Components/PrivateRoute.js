import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import UserMenu from "./UserMenu/UserMenu";
import GuestMenu from "./GuestMenu/GuestMenu";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, correctKey } = useAuth()
  const [userEmail, setUserEmail] = useState('')

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
        return currentUser && correctKey  ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
    </>
  )
}