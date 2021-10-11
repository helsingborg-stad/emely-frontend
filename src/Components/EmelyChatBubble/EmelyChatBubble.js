import React from "react";
import emely from "../../Assets/images/emely.png";

export default function ChatBubble(props) {
  if (props.scroll) {
    props.scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="mt-3 mb-0 emely-chat-wrapper">
        <div className="img-wrapper">
          <img className="emely-image" src={emely} alt="Emely" />
        </div>
        <p className="dialogue-text">{props.message}</p>
      </div>
    </>
  );
}
