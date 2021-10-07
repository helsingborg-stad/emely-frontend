import React from "react";
import { useHistory } from "react-router-dom";
import { FaHandPointDown } from "react-icons/fa";

export default function WorkButton(props) {
  const history = useHistory();

  const handleClick = (e) => {
    // todo set occupation choice
    // console.log(e.target.id);
    history.push("/emely-chat");
  }

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
                <FaHandPointDown  size={20}/>
              </span>
            </label>

            <div id="overlay"></div>
            <ul>
              {props.occupation.map((job, i) => (
                <li
                  onClick={(e)=> handleClick(e)}
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
