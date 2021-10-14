import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import AuthLayout from '../../Components/AuthLayout/AuthLayout';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';

/* Variable declaration */
export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword, translateError } = useAuth();
	const [msg, setMsg] = useState('');
	const [msgVariant, setMsgVariant] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {

			setMsg('');
			setLoading(true);

			/* Run resetPassword function from AuthContext.js */
			await resetPassword(emailRef.current.value);
			setMsg('Kontrollera din inkorg för ytterligare instruktioner');
			setMsgVariant('warning');

			/* Catch error and print out in alert (in english) */
		} catch (error) {
      console.log(error.code);
      setMsgVariant('danger');
			setMsg(translateError(error.code));
		}

		setLoading(false);
	}

	return (
    <>
    {msg && (
      <AlertMessage message={msg} variant={msgVariant} />
    )}

      <AuthLayout>
        <h2 className="text-center mb-5 fw-bold" id="password-reset">
          Återställ ditt lösenord
        </h2>


        {/* Reset password form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>
              <HiOutlineMail size={30} /> E-postadress
            </Form.Label>
            <Form.Control
              placeholder="Skriv din e-postadress för att återställa lösenord"
              className="p-3 rounded-pill shadow-sm"
              type="email"
              ref={emailRef}
              required
            />
          </Form.Group>

          {/* Submit button & send instructions to mail */}
          <Button
            disabled={loading}
            className="w-100 mt-3 p-3 rounded-pill btn-success mt-5 fw-bold register-btn"
            id="button-main"
            type="submit"
          >
            <HiOutlineMail size={30} /> ÅTERSTÄLL LÖSENORD
          </Button>
        </Form>
        <div className="w-100 text-center mt-3 fw-bold">
          <Link to="/login">Login</Link>
        </div>

        <div className="w-100 text-center mt-2 fw-bold">
          Behöver ett konto? <Link to="/signup">Registrera dig</Link>
        </div>
      </AuthLayout>
    </>
  );
}
