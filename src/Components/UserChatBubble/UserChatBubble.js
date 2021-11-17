import React from "react";
import userLogo from "../../Assets/images/user_logo.svg";

const UserChatBubble = ({
  message,
  isFocused,
  loader,
}) => {
  return (
    <div className="user-chat-wrapper">
      <div className="user-img-wrapper">
        <img className="user-image" src={userLogo} alt="User logo" />
      </div>
        <p className="user-dialogue-text">{isFocused ? loader : message}</p>
    </div>
  );
};

export default UserChatBubble;
