import React, { useRef, useState } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

/* --- Icon imports --- */
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrLanguage } from 'react-icons/gr';
import { FaUserTie } from 'react-icons/fa';
import { MdKeyboardArrowLeft } from 'react-icons/md';

/* --- Variables, Hooks & State --- */
export default function ProfileInfoEdit(props) {
	const usernameRef = useRef();
	const birthYearRef = useRef();
	const nativeLanguageRef = useRef();
	const currentOccupationRef = useRef();

	const {
		currentUser,
		userDetails,
		updateUsername,
		updateCurrentOccupation,
		updateBirthYear,
		updateNativeLanguage,
		setMsg,
		setMsgVariant,
	} = useAuth();
	const [loading, setLoading] = useState(false);

	/* --- Submit information --- */
	async function handleSubmit(e) {
		e.preventDefault();
		setMsg('');

		const promises = []; // Changes
		const updates = []; // Message for update

		setLoading(true);

		/* --- Functions to update user information from Firestore ---*/
		try {
			/* --- If changes has been made to field push change and message to array ---*/

			/* --- Username --- */
			if (usernameRef.current.value !== userDetails.username) {
				promises.push(
					updateUsername(currentUser.uid, usernameRef.current.value)
				);
				updates.push('Användarnamn');
			}

			/* --- Current occupation --- */
			if (
				currentOccupationRef.current.value !== userDetails.current_occupation
			) {
				promises.push(
					updateCurrentOccupation(
						currentUser.uid,
						currentOccupationRef.current.value
					)
				);
				updates.push('Sysselsättning');
			}

			/* --- Birth year --- */
			if (birthYearRef.current.value !== userDetails.birth_year) {
				promises.push(
					updateBirthYear(currentUser.uid, birthYearRef.current.value)
				);
				updates.push('Födelseår');
			}

			if (nativeLanguageRef.current.value !== userDetails.native_language) {
				promises.push(
					updateNativeLanguage(currentUser.uid, nativeLanguageRef.current.value)
				);
				updates.push('Modersmål');
			}

			/* --- Update all saved changes from array --- */
			await Promise.all(promises)
				.then(() => {})
				.catch((error) => {
					setMsg(error.message);
					setMsgVariant('danger');
				})
				.finally(() => {
					setLoading(false);

					/* --- When finished updating. Loop through all update-messages and set to msg alert --- */
					for (let i of updates) {
						const updatesToString = updates.join(' - ').toString();
						setMsg(updatesToString + ' har uppdaterats');
					}

					setMsgVariant('success');
				});
		} catch (error) {
			setMsg(error.message);
			setMsgVariant('danger');
		}
	}

	return (
		<>
			<Container className="p-5">
				<h2 className="text-center mb-2 fw-bold">Redigera profil</h2>

				{/* --- Username form --- */}
				<Form onSubmit={handleSubmit} id="update-profile">
					<Row className="mt-5">
						<Form.Group className="" id="username">
							<Form.Label className="input-label">
								<AiOutlineUser className="me-2" size={20} />
								Användarnamn
							</Form.Label>

							<Form.Control
								className="input-field-small"
								type="text"
								ref={usernameRef}
								required
								defaultValue={userDetails && userDetails.username}
								placeholder="Vad ska vi kalla dig?"
							/>
						</Form.Group>
					</Row>

					{/* --- Birth year form --- */}
					<Row className="mt-3">
						<Form.Group id="birthYear">
							<Form.Label className="input-label">
								<AiOutlineCalendar className="me-2" size={20} /> Vilket år är du
								född?
							</Form.Label>
							<Form.Control
								className="input-field-small"
								placeholder="När är du född?"
								type="number"
								defaultValue={userDetails && userDetails.birth_year}
								ref={birthYearRef}
								required
							/>
						</Form.Group>
					</Row>

					{/* --- Native language form --- */}
					<Row className="mt-3">
						<Form.Group id="nativeLanguage">
							<Form.Label className="input-label">
								<GrLanguage className="me-2" size={20} /> Vilket språk talar du
								hemma?
							</Form.Label>
							<Form.Select
								ref={nativeLanguageRef}
								className="input-field-small"
								defaultValue={userDetails && userDetails.native_language}
							>
								<option>Albanska</option>
								<option>Arabiska</option>
								<option>Arameiska</option>
								<option>Bosniska</option>
								<option>Danska</option>
								<option>Engelska</option>
								<option>Finska</option>
								<option>Kantonesiska</option>
								<option>Kroatiska</option>
								<option>Kurdiska</option>
								<option>Montenegrinska</option>
								<option>Norska</option>
								<option>Persiska</option>
								<option>Polska</option>
								<option>Ryska</option>
								<option>Serbiska</option>
								<option>Somaliska</option>
								<option>Spanska</option>
								<option>Svenska</option>
								<option>Thailändska</option>
								<option>Turkiska</option>
								<option>Tyska</option>
								<option>Ungerska</option>
								<option>Annat</option>
							</Form.Select>
						</Form.Group>
					</Row>

					{/* --- Current occupation form --- */}
					<Row className="mt-3">
						<Form.Group id="currentOccupation">
							<Form.Label className="input-label">
								<FaUserTie className="me-2" size={20} /> Vad är din
								syselsättning?
							</Form.Label>
							<Form.Select
								ref={currentOccupationRef}
								className="input-field-small"
								defaultValue={userDetails && userDetails.current_occupation}
							>
								<option>Arbetssökande</option>
								<option>Studerande</option>
								<option>Sjukskriven</option>
								<option>Heltidsjobb</option>
								<option>Deltidsjobb</option>
								<option>Timanställd</option>
								<option>Föräldraledig</option>
								<option>Annat</option>
							</Form.Select>
						</Form.Group>
					</Row>

					{/* --- Save changes button --- */}
					<Row className="mb-3 mt-5">
						<Col className="mb-3" md={6} lg={6} xs={12}>
							<Button
								disabled={loading}
								type="submit"
								className="w-100 register-btn"
							>
								<AiOutlineUserAdd className="me-2 text-white" size={25} />
								SPARA
							</Button>
						</Col>

						{/* --- Back button (close modal) --- */}
						<Col className="" md={6} lg={6} xs={12}>
							<Link to="/profile">
								<Button
									disabled={loading}
									variant="outline-success"
									className="w-100 register-btn_light"
									onClick={props.closeModal}
								>
									<MdKeyboardArrowLeft size={25} /> TILLBAKA
								</Button>
							</Link>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
}
