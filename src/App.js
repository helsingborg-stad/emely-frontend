import React from 'react';
import Signup from './Navigation/Signup/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Navigation/Dashboard/Dashboard';
import Login from './Navigation/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Navigation/ForgotPassword/ForgotPassword';
import UpdateProfile from './Navigation/UpdateProfile/UpdateProfile';
import Home from './Navigation/Home/Home';
import './css/app.css';

function App() {
	return (
		<>
		<Container id="main-container" className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="w-100">
				<Router>
					<AuthProvider>
						<Switch>

							{/* When logged in Routes */}
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute path="/update-profile" component={UpdateProfile} />

							<Route exact path="/" component={Home} />
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
							<Route path="/forgot-password" component={ForgotPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
		</>
	);
}

export default App;
