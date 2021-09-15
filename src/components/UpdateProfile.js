import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../styles/update-profile.css"

export default function UpdateProfile() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (usernameRef.current.value) {
      promises.push(updateProfile(usernameRef.current.value))
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card className="p-5 shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-5">Uppdatera profil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>

          <Form.Group className="mt-4" id="username">
          <Form.Label>username</Form.Label>
          <Form.Control
            className="rounded-pill p-3"
            type="text"
            ref={usernameRef}
            required
            defaultValue={currentUser.displayName}
          />
        </Form.Group>

            <Form.Group className="mt-4" id="email">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control
                className="rounded-pill p-3"
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group className="mt-4" id="password">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                className="rounded-pill p-3"
                type="password"
                ref={passwordRef}
                placeholder="Lämna blankt för att behålla lösenord"
              />
            </Form.Group>
            <Form.Group className="mt-4" id="password-confirm">
              <Form.Label>Upprepa lösenord</Form.Label>
              <Form.Control
                className="rounded-pill p-3"
                type="password"
                ref={passwordConfirmRef}
                placeholder="Lämna blankt för att behålla lösenord"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-success p-3 mt-5 rounded-pill" id="update-button" type="submit">
              UPPDATERA
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}