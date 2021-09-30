import React, { useState } from 'react';
import {
	Container,
	Navbar,
	Nav,
	Button,
	Alert,
	Offcanvas,
} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
//import { HiOutlineVolumeUp } from 'react-icons/hi';

/* Variable declaration */
export default function UserMenu(props) {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push('/login');

			/* Catch error */
		} catch (error) {
			setError(error.message);
		}
	}

	return (
    <>
      <Navbar sticky="top" bg="none" expand="lg" id="navbar">
        <Container>
          {/*TODO back button, delete {props.currentOccupation} */}
          <Navbar.Brand>{props.currentOccupation}</Navbar.Brand>
          <Navbar.Toggle
            onClick={handleShow}
            aria-controls="basic-navbar-nav"
          ></Navbar.Toggle>
          <Navbar.Collapse bg="dark" id="basic-navbar-nav">
            <Nav className="ms-auto ">
              {/* Menu-button */}
              <Button
                className="rounded-pill shadow-sm p-3 mt-3"
                variant="light"
                onClick={handleShow}
                id="menu-user-button"
              >
                <FaUserAlt className="p-1" size={25} />
                {currentUser ? currentUser.displayName : currentUser.email}
              </Button>

              {/* Menu from the side */}
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className="m-3" closeButton>
                  <Offcanvas.Title className="m-3">
                    <FaUserAlt className="p-1" size={25} />
                    {currentUser ? currentUser.displayName : currentUser.email}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="m-3">
                  <p>
                    <Link to="/update-profile">
                      <Button
                        className="rounded-pill "
                        variant="link"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Nav.Item>Uppdatera profil</Nav.Item>
                      </Button>
                    </Link>
                  </p>

							{/* Menu-button */}
							<Button
								className="rounded-pill shadow-sm p-3 mt-3"
								variant="light"
								onClick={handleShow}
								id="menu-user-button"
							>
								<FaUserAlt className="p-1" size={25} />
								{currentUser.displayName ? currentUser.displayName : currentUser.email}
							</Button>

							{/* Menu from the side */}
							<Offcanvas show={show} onHide={handleClose}>
								<Offcanvas.Header className="m-3" closeButton>
									<Offcanvas.Title className="m-3">
										<FaUserAlt className="p-1" size={25} />
										{currentUser.displayName ? currentUser.displayName : currentUser.email}
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body className="m-3">
									<p>
										<Link to="/update-profile">
											<Button
												className="rounded-pill "
												variant="link"
												style={{ textDecoration: 'none', color: 'black' }}
											>
												<Nav.Item>Uppdatera profil</Nav.Item>
											</Button>
										</Link>
									</p>

									<p>
										<Button
											className="rounded-pill "
											variant="link"
											onClick={handleLogout}
											style={{ textDecoration: 'none', color: 'black' }}
										>
											Logga ut
										</Button>
									</p>
								</Offcanvas.Body>
							</Offcanvas>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{error && <Alert variant="danger">{error}</Alert>}
		</>
	);
}
