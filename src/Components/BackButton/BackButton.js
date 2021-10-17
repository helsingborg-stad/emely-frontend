import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdKeyboardArrowLeft } from "react-icons/md";

const BackButton = () => {
  const history = useHistory();

  return (
    <Button
      variant="outline-secondary"
      className="fw-bold pe-2"
      onClick={() => history.goBack()}
      style={{ border: "none" }}
    >
      <MdKeyboardArrowLeft size={25} /> BACK
    </Button>
  );
};

export default BackButton;
