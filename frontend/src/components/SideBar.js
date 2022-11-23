import React from "react";
import "../App.css";
import "../styles/SidebarMenu.css";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { IoIosArrowForward } from "react-icons/io";

const SideBar = ({ userState, nameState, isNew }) => {
  const userSideBar = (userState) => {
    switch (userState) {
      case 0: //비회원
        return (
          <div>
            <Link className="loginRegisterBtn" to="/loginRegister">
              <div>
                <span style={{ margin: "0" }}>로그인/회원가입</span>
              </div>
              <IoIosArrowForward color="black" size="24" />
            </Link>
          </div>
        );
      case 1: //손님
        return (
          <div className="memberContainer">
            <div className="nicknameBtn" style={{ cursor: "default" }}>
              <div className="nicknameContainer">
                <span style={{ margin: "0" }}>{nameState}</span>
              </div>
            </div>
            <SidebarMenu userState={userState} />
          </div>
        );
      case 2: //사장님
        return (
          <div className="memberContainer">
            <Link className="nicknameBtn" to="/myPageOwner">
              <div className="nicknameContainer">
                <span style={{ margin: "0" }}>{nameState}</span>
              </div>
              <IoIosArrowForward color="black" size="24" />
            </Link>
            <SidebarMenu userState={userState} isNew={isNew} />
          </div>
        );
      case 3: //관리자
        return (
          <div className="memberContainer">
            <Link className="nicknameBtn" to="/myPageOwner">
              <div className="nicknameContainer">
                <span style={{ margin: "0" }}>{nameState}</span>
              </div>
              <IoIosArrowForward color="black" size="24" />
            </Link>
            <SidebarMenu userState={userState} isNew={isNew} />
          </div>
        );
      case 4:
        return (
          <div className="memberContainer">
            <Link className="nicknameBtn" to="/myPageUser">
              <div className="nicknameContainer">
                <span style={{ margin: "0" }}>{nameState}</span>
              </div>
              <IoIosArrowForward color="black" size="24" />
            </Link>
            <SidebarMenu userState={userState} />
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className="sidebar slideAnimations">{userSideBar(userState)}</div>
  );
};

export default SideBar;
