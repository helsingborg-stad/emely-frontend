import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ConversationContext } from "../../contexts/ConversationContext";

export default function WorkButton(props) {
  /* --- Variables, Hooks & State --- */
  const { setCurrentJob } = useContext(ConversationContext);
  const history = useHistory();
  const buttons = props.occupation.occupations;


  /* --- When choosing job, setCurrentJob state to target --- */
  const handleClick = (e) => {
    setCurrentJob(e.target.id);
    history.push(`/emely-chat/intervju/${e.target.id}`);
  };

  return (
    <>
      <ul className="work-button-ul m-0 ps-0">

      {/* --- Loop through all jobs and render from job-list --- */}
        {buttons.sort().map((job, i) => (
          <li
            onClick={(e) => handleClick(e)}
            key={i}
            className="register-btn_occupation_sidebar"
            id={job}
          >
            {job}
          </li>
        ))}
      </ul>
    </>
  );
}
