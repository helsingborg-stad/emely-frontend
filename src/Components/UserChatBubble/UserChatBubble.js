import React from "react";
import userLogo from "../../Assets/images/user_logo.svg";

const UserChatBubble = ({
  message,
  isFocused,
  loader,
  isValidationError,
}) => {
  return (
    <div className="user-chat-wrapper">
      <div className="user-img-wrapper">
        <img className="user-image" src={userLogo} alt="User logo" />
      </div>
      {isValidationError ? (
        <p className="user-dialogue-text">
          Message can not be empty or contains &#60; &#62; @ # &#171; &#187;
          &#38; * [ ] characters
        </p>
      ) : (
        <p className="user-dialogue-text">{isFocused ? loader : message}</p>
      )}
    </div>
  );
};

export default UserChatBubble;
