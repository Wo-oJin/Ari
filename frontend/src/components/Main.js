import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SideBar from "./SideBar";

const Main = () => {
  const userState = 0; // 0:비회원 1:손님 2:사장님 3:관리자
  const [isOpend, setIsOpened] = useState(false);
  const onClick = () => {
    setIsOpened(!isOpend);
  };

  return (
    <>
      <div>
        {isOpend ? (
          <img
            alt=""
            className="darkImage"
            onClick={onClick}
            src="images/map.jpg"
          ></img>
        ) : (
          <img alt="" src="images/map.jpg"></img>
        )}
      </div>
      <button className="side_btn" onClick={onClick}>
        <img alt="" src="images/button.png"></img>
      </button>
      {isOpend ? <SideBar userState={userState} /> : null}
    </>
  );
};

export default Main;
