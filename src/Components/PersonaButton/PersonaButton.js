import React from 'react';
import { Link } from 'react-router-dom';

export default function Choices(props) {
    
	return (
    <>
      <Link to={props.linkTo}>
        <button className="register-btn w-100">
          {props.children} <span className="px-3">{props.name}</span> 
        </button>
      </Link>
    </>
  );
}
