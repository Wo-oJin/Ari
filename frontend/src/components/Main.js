import React, { useEffect, useState } from "react";
import "../App.css";
// import Map from "../services/map/Map";
import SideBar from "./SideBar";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import MainPage from "./MainPage";
import { customAxios } from "../pages/customAxios";
import { Link } from "react-router-dom";
import useHistoryState from "use-history-state";

const Main = () => {
  // 0:비회원 1:손님 2:사장님 3:관리자
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);
  const [isOpend, setIsOpened] = useHistoryState(false, "sidebarMenu");
  const [isNewPartnership, setIsNewPartnership] = useState(false);

  const checkNewPartnership = async () => {
    try {
      const { data } = await customAxios.get(
        "/owner/partnership/check/new-request"
      );
      setIsNewPartnership(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth === 2) {
      checkNewPartnership();
    }
  }, []);

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
      {auth === 0 ? (
        <Link to={"/loginRegister"}>
          <button
            className="side_btn2"
            style={{ fontWeight: "600", cursor: "pointer" }}
          >
            로그인/회원가입
          </button>
        </Link>
      ) : (
        <button className="side_btn" onClick={onClick}>
          <img alt="" src="images/button.png"></img>
        </button>
      )}

      {isOpend ? (
        <SideBar userState={auth} nameState={name} isNew={isNewPartnership} />
      ) : null}
    </>
  );
};

export default Main;
