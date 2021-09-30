import React from "react";
import { useHistory } from "react-router-dom";

export default function WorkButton(props) {
  const history = useHistory();

  return (
    <>
      <div className="w-100 mt-1 justify-content-center work-button_container">
        <nav className="work-button_dropdown-list">
          <div className="container ">
            <input
              onClick={() =>{
								props.setDropdownOpen(!props.isDropdownOpen)
							}}
              id="responsive-menu"
              type="checkbox"
            />
            <label className="occupation-btn" htmlFor="responsive-menu">
              Välj yrke <span id="menu-icon">Icon here</span>
            </label>

            <div id="overlay"></div>
            <ul>
              {props.occupation.occupations.map((job, i) => (
                <li
                  onClick={() => history.push("/emely-chat")}
                  key={i}
                  className="w-100 my-3 h5 work-button_dropdown-item"
                >
                  {job}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
