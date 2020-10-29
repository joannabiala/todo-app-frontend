import React from "react";

const ButtonComponent = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  )
}

export default ButtonComponent;