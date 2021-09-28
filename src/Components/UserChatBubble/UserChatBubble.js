import React from "react";
import userLogo from "../../Assets/images/user_logo.svg";

const UserChatBubble = () => {
  return (
    <div className="user-chat-wrapper">
      <div className="user-img-wrapper">
        <img className="user-image" src={userLogo} alt="User logo" />
      </div>
      <p className="user-dialogue-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto itaque
        officiis nulla tempore commodi, modi veniam quas deserunt ducimus
        quisquam sit maiores dicta ipsa consequatur! Nostrum dicta laudantium
        fugiat ipsum!
      </p>
    </div>
  );
};

export default UserChatBubble;
