import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../styles/dashboard.css"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card className="p-3 shadow-sm">
        <Card.Body >
          <h2 className="text-center mb-4">{currentUser.email} {currentUser.displayName}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" id="update-profile-button" className="btn btn-success rounded-pill p-2 w-100 mt-3">
            UPPDATERA PROFIL
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button  variant="link" onClick={handleLogout}>
          Logga ut
        </Button>
      </div>
    </>
  )
}