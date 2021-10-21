import React, { useContext } from "react";
import emely from "../../Assets/images/emely.png";
import { AcapelaContext } from "../../contexts/AcapelaContext";

export default function ChatBubble({
  isValidationError,
  isLoading,
  loader,
  message,
}) {
  // const { playAcapela } = useContext(AcapelaContext);

  if (message) {
    // playAcapela(message);
  }
  return (
    <>
      <div className="mt-3 mb-0 emely-chat-wrapper">
        <div className="img-wrapper">
          <img className="emely-image" src={emely} alt="Emely" />
        </div>

        {isValidationError ? (
          <p className="alert-danger dialogue-text">
            Meddelandet kan inte vara tomt eller innehåller &#60; &#62; @ #
            &#171; &#187; &#38; * &#123; &#125; tecken
          </p>
        ) : (
          <p className="dialogue-text">{isLoading ? loader : message}</p>
        )}
      </div>
      <div id="player"></div>
    </>
  );
}
