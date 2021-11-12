import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Choices({ children, name, ref, linkTo }) {
 
  let history = useHistory();
  const handleLink = () => {
    history.push(linkTo);
  };

  return (
    <>
      <Button
        className="register-btn w-100"
        type="button"
        onClick={handleLink}
        ref={ref}
      >
        {children} <span className="px-3">{name}</span>
      </Button>
    </>
  );
}
