import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../styles/login.css"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card >
        <Card.Body className="shadow-sm p-5" id="login-card">
          <h2 className="text-center mb-4" id="login-header">Logga in för att fortsätta</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mt-5">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control className="rounded-pill p-3" placeholder="E-postadress" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mt-4">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control className="rounded-pill p-3" type="password" placeholder="Lösenord" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-5 btn-success rounded-pill p-3" id="login-button" type="submit">
            <i className="fa fa-user-circle"></i> LOGGA IN
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Glömt lösenord?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Behöver ett konto? <Link to="/signup">Registrera dig</Link>
      </div>
    </>
  )
}