import React, { useState } from 'react';
import emely from '../../Assets/images/emely_work.png';
import AcapelaPlayer from '../AcapelaPlayer';
import Avatar from '@mui/material/Avatar';
import { RiFlag2Line } from 'react-icons/ri';
import { FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Row, Col } from 'react-bootstrap';

export default function ChatBubble({
	isValidationError,
	isLoading,
	loader,
	message,
	ref,
	convId,
}) {
	const { reportMessage } = useAuth();
  const [isReported, setIsReported] = useState(false)

	function handleReportMessage(e) {
		e.preventDefault();

		try {
			/* Report message and add in reported-messages database */
			reportMessage(convId, message);
      setIsReported(true);

			/*  Catch error & translate in a function */
		} catch (error) {
			console.log(error.code);
		}
	}
	return (
		<>
			<div className="mt-3 mb-0 emely-chat-wrapper" ref={ref}>
      <Row>
      <Col xs={7} md={6} lg={6}>
				<div className="img-wrapper">
					<Avatar
						alt="Emely"
						sx={{ width: 40, height: 40 }}
						src={emely}
					></Avatar>
          </div>
          </Col>
          <Col xs={5} md={5} lg={5} className="p-0">
					{isLoading || isReported ? null : (
						<Button
              variant="none"
							className="report-btn_small me-3"
							onClick={handleReportMessage}
						>
							<RiFlag2Line /> Rapportera
						</Button>
					)}

          </Col>
				
        </Row>

				{isValidationError ? (
					<p className="alert-danger dialogue-text">
						Meddelandet kan inte vara tomt eller innehåller &#60; &#62; @ #
						&#171; &#187; &#38; * &#123; &#125; tecken
					</p>
				) : (
					<p className="dialogue-text shadow-sm">
						{isLoading ? loader : message}
					</p>
				)}
			</div>

			{message && <AcapelaPlayer message={message} />}
		</>
	);
}
