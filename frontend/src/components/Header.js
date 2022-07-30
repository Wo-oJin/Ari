import React from "react";
import { Link } from "react-router-dom";
const Header = ({ text, link }) => {
  return (
    <div className="header">
      <span>{text}</span>
      <button>
        <Link to={link}>
          <img alt="" src="images/quit_btn.png"></img>
        </Link>
      </button>
    </div>
  );
};

export default Header;
