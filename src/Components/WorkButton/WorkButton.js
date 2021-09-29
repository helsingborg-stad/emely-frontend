import React from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function WorkButton(props) {
  const history = useHistory();

  return (
    <>
      <div className="w-100 mt-1 justify-content-center work-button_container">
        <Dropdown>
          <Dropdown.Toggle
            className="w-100 h5 rounded-pill shadow-sm p-3 occupation-btn"
            id="dropdown-basic"
            // drop="down"
          >
            Välj yrke
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100 work-button_dropdown-list">
            {props.occupation.occupations.map((job, i) => (
              <Dropdown.Item
                onClick={() => history.push("/emely-chat")}
                key={i}
                className="w-100 my-3 h5 work-button_dropdown-item"
              >
                {job}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
