import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import UserMenu from "./UserMenu/UserMenu";
import GuestMenu from "./GuestMenu/GuestMenu";

export default function KeyRoute({ component: Component, ...rest }) {
  const { currentUser, correctKey } = useAuth()
  const [userEmail, setUserEmail] = useState('')


  return (
    <>
  {/* Render GuestMenu if guest is logged in else render regular UserMenu on login */}
    <Route
      {...rest}
      render={props => {
        return correctKey ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
    </>
  )
}