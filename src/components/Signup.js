import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

/* Variable declaration */
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

      /* Run signup firebase-auth function from AuthContext.js */
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")

      /* Catch error and print out in alert (in english) */
    } catch (error){
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="mt-5 shadow" id="main-card">
        <Card.Body className="p-5">
          <h2 className="text-center mb-5 fw-bold">Registrera dig för att börja prata med Emely.</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
  
          {/* Register new user form */}
            <Form.Group id="email">
              <Form.Label>Vad är din e-postadress?</Form.Label>
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

            {/* Submit button */}
            <Button disabled={loading} className="w-100 mt-5 p-3 btn-primary rounded-pill" id="button-main" type="submit">
             REGISTRERA DIG
            </Button>

          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3 fw-bold">
        Har du ett konto? <Link to="/login">Logga In</Link>
      </div>
    </>
  )
}