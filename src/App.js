import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Component imports */
import Signup from './Navigation/Signup/Signup';
import Dashboard from './Navigation/Dashboard/Dashboard';
import Login from './Navigation/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Navigation/ForgotPassword/ForgotPassword';
import ProfileInfoEdit from './Components/ProfileInfo/ProfileInfoEdit';
import UpdatePassword from './Navigation/UpdateProfile/UpdatePassword';
import WorkEmely from './Navigation/WorkEmely/WorkEmely';
import EmelyChat from './Navigation/EmelyChat/EmelyChat';
import EndUserTerms from './Components/EndUserTerms/EndUserTerms';
import Home from './Navigation/Home/Home';
import Profile from './Navigation/Profile/Profile';
import ConversationContextProvider from './contexts/ConversationContext';

import './app.css';

function App() {
	return (
		<>
			<Container
				id="main-container"
				className="d-flex align-items-center justify-content-center"
			>
				<div className="w-100 justify-content-center">
					<Router>
						<AuthProvider>
							<ConversationContextProvider>
								<Switch>
									{/* When logged in Routes */}
									<PrivateRoute exact path="/dashboard" component={Dashboard} />
									<PrivateRoute
										path="/update-profile"
										component={ProfileInfoEdit}
									/>
									<PrivateRoute
										path="/change-password"
										component={UpdatePassword}
									/>
									<PrivateRoute path="/work-emely" component={WorkEmely} />
									<PrivateRoute
										path="/emely-chat/:persona"
										component={EmelyChat}
									/>
									<PrivateRoute path="/profile" component={Profile} />

									<Route exact path="/" component={Home} />
									<Route path="/signup" component={Signup} />
									<Route path="/login" component={Login} />
									<Route path="/end-user-terms" component={EndUserTerms} />
									<Route path="/forgot-password" component={ForgotPassword} />
								</Switch>
							</ConversationContextProvider>
						</AuthProvider>
					</Router>
				</div>
			</Container>
		</>
	);
}

export default App;
