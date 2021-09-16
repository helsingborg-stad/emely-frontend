import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "../styles/forgot-password.css"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body className="shadow-sm p-5">
          <h2 className="text-center mb-5" id="password-reset">Återställ ditt lösenord</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control placeholder="Skriv din e-postadress för att återställa lösenord" className="p-3 rounded-pill" type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3 p-3 rounded-pill btn-success" id="reset-password-button" type="submit">
              ÅTERSTÄLL LÖSENORD
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Behöver ett konto? <Link to="/signup">Registrera dig</Link>
      </div>
    </>
  )
}