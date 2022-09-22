import React, { useEffect, useState } from "react";
import "../App.css";
// import Map from "../services/map/Map";
import SideBar from "./SideBar";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import MainPage from "./MainPage";

const Main = () => {
  // 0:비회원 1:손님 2:사장님 3:관리자
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);
  const [isOpend, setIsOpened] = useState(false);

  const onClick = () => {
    setIsOpened(!isOpend);
  };

  return (
    <>
      <div>
        {isOpend ? (
          <MainPage onClick={onClick}></MainPage>
        ) : (
          <>
            <MainPage />
          </>
        )}
      </div>

      <button className="side_btn" onClick={onClick}>
        <img alt="" src="images/button.png"></img>
      </button>
      {isOpend ? <SideBar userState={auth} nameState={name} /> : null}
    </>
  );
};

export default Main;
