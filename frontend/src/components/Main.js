import React, { useEffect, useState } from "react";
import "../App.css";
// import Map from "../services/map/Map";
import SideBar from "./SideBar";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import MainPage from "./MainPage";
import { customAxios } from "../pages/customAxios";

const Main = () => {
  // 0:비회원 1:손님 2:사장님 3:관리자
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);
  const [isOpend, setIsOpened] = useState(false);
  const [isNewPartnership, setIsNewPartnership] = useState(false);

  const checkNewPartnership = async () => {
    try {
      const { data } = await customAxios.get("/partnership/check/new-request");
      setIsNewPartnership(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth === 2) {
      setTimeout(() => checkNewPartnership(), 1000); // 바로 함수 실행하면 bearer 토큰값 못 가져올 수 있으므로 1초 뒤에 실행
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

      <button className="side_btn" onClick={onClick}>
        <img alt="" src="images/button.png"></img>
      </button>
      {isOpend ? (
        <SideBar userState={auth} nameState={name} isNew={isNewPartnership} />
      ) : null}
    </>
  );
};

export default Main;
