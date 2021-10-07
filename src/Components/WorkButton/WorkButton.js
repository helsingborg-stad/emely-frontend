import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import { FaHandPointDown } from "react-icons/fa";

import {ConversationContext} from '../../contexts/ConversationContext'

export default function WorkButton(props) {
  const { setCurrentJob } = useContext(ConversationContext);
  const history = useHistory();

  const handleClick = (e) => {
    setCurrentJob(e.target.id);
    history.push("/emely-chat/intervju");
  };

  return (
    <>
      <nav className="work-button_dropdown-list">
        <div className="dropdown-list__container">
          <input
            onClick={() => {
              props.setDropdownOpen(!props.isDropdownOpen);
            }}
            id="responsive-menu"
            type="checkbox"
          />
          <label className="occupation-btn" htmlFor="responsive-menu">
            <span>Välj yrke</span>
            <span id="menu-icon">
              <FaHandPointDown size={20} />
            </span>
          </label>

          <div id="overlay"></div>
          <ul>
            {props.occupation.map((job, i) => (
              <li
                onClick={(e) => handleClick(e)}
                key={i}
                className="w-100 my-3 h5 work-button_dropdown-item"
                id={job}
              >
                {job}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
