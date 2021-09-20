import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import '../css/app.css';

function App() {
	return (
		<Container id="main-container" className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '600px' }}>
				<Router>
					<AuthProvider>
						<Switch>

							{/* When logged in Routes */}
							<PrivateRoute exact path="/" component={Dashboard} />
							<PrivateRoute path="/update-profile" component={UpdateProfile} />

							{/* Routes */}
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
							<Route path="/forgot-password" component={ForgotPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
