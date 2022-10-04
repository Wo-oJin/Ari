import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
const Header = ({ text, back, url }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <span>{text}</span>
      {back ? (
        url ? (
          <button
            className="backBtn"
            onClick={() => {
              //back btn 클릭 시, 뒤로 가기
              navigate(url);
            }}
          >
            <MdArrowBackIosNew size={"1.3em"} color="black"></MdArrowBackIosNew>
          </button>
        ) : (
          <button
            className="backBtn"
            onClick={() => {
              //back btn 클릭 시, 뒤로 가기
              navigate(-1);
            }}
          >
            <MdArrowBackIosNew size={"1.3em"} color="black"></MdArrowBackIosNew>
          </button>
        )
      ) : null}
      <button className="rightBtn">
        <Link to={"/"}>
          <AiOutlineClose size={"1.3em"}></AiOutlineClose>
        </Link>
      </button>
    </div>
  );
};

export default Header;
