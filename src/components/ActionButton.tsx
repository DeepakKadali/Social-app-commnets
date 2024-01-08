import React from "react";

interface Props {
  type:String,
  style:String,
  handleClick?:()=>void,
  disable?:Boolean

}

const ActionButton = ({ type, style, handleClick , disable=false}: Props) => {
  return (
    <div
      className={`${style} cursor-pointer flex justify-center items-center ${disable?"hidden":""}`}
      onClick={handleClick}
    >
      {type}
    </div>
  );
};
export default ActionButton;
