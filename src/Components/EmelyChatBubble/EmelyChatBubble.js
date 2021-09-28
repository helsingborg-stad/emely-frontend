import React from "react";
// import { Card } from 'react-bootstrap';
import emely from "../../Assets/images/emely.png";

export default function ChatBubble(props) {
  return (
    <>
      <div className="mt-3 mb-0" className="emely-chat-wrapper">
        {/* <Card className="shadow-sm p-1" id="emely-chat-bubble-card"> */}
        <div className="img-wrapper">
          <img className="emely-image" src={emely} alt="Emely photo" />
        </div>
        <p className="m-3 p-3" className="dialogue-text">
          Jag heter Emely. Jag är en virtuell språkassistent och med mig kan du
          öva att prata på svenska. Välj nedan vilken av mina personligheter du
          önskar att prata med.
        </p>
        {/* </Card> */}
      </div>
    </>
  );
}
