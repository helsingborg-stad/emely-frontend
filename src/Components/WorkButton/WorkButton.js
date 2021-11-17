import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { ConversationContext } from "../../contexts/ConversationContext";

export default function WorkButton(props) {
  const { setCurrentJob } = useContext(ConversationContext);
  const history = useHistory();

  const buttons = props.occupation.occupations;
  const handleClick = (e) => {
    setCurrentJob(e.target.id);
    history.push("/emely-chat/intervju/");
  };

  return (
    <>
      <ul className="work-button-ul m-0 ps-0">
        {buttons.sort().map((job, i) => (
          <li
            onClick={(e) => handleClick(e)}
            key={i}
            className="work-button-list"
            id={job}
          >
            {job}
          </li>
        ))}
      </ul>
    </>
  );
}
