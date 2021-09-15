import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../styles/signup.css"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body className="p-5 shadow-sm">
          <h2 className="text-center mb-5">Registrera dig för att börja prata med Emely.</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
  
            <Form.Group id="email">
              <Form.Label><i className="fa fa-envelope"></i> Vad är din e-postadress?</Form.Label>
              <Form.Control className="rounded-pill p-3" placeholder="Ange din e-postadress." type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mt-4">
              <Form.Label>Skapa ett lösenord</Form.Label>
              <Form.Control className="rounded-pill p-3" placeholder="Skapa ett lösenord." type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-4">
              <Form.Label>Upprepa lösenord</Form.Label>
              <Form.Control className="rounded-pill p-3" type="password" placeholder="Upprepa ditt valda lösenord." ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-5 p-3 btn-success rounded-pill" id="signup-button" type="submit">
            <i className="fa fa-user-plus"></i> REGISTRERA DIG
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Har du ett konto? <Link to="/login">Logga In</Link>
      </div>
    </>
  )
}