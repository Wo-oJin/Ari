import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
const Header = ({ text, back }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <span>{text}</span>

      <button className="rightBtn">
        <Link to={link}>
          <img alt="" src="images/quit_btn.png"></img>
        </Link>
      </button>
      <Link to={"/"}>
        <AiOutlineClose size={"1.3em"}></AiOutlineClose>
      </Link>
    </div>
  );
};

export default Header;
