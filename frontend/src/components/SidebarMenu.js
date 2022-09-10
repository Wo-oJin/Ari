import React from "react";
import "../App.css";
import "../styles/SidebarMenu.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";

const SidebarMenu = (userState) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const onLogout = async () => {
    try {
      await axios
        .post("/auth/logout", {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.data.result === "success") {
            // 로그아웃 성공
            // localStorage에 저장된 토큰 삭제
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            // recoil persist로 저장된 변수 초기화
            setAuth(0);
            setName("");

            alert(res.data.massage);
          } else {
            // 로그아웃 실패
            alert(res.data.massage);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const menuForCustomer = [
    { title: "공지사항", url: "/" },
    { title: "즐겨찾기", url: "/" },
    { title: "마이페이지", url: "/" },
    { title: "문의하기", url: "/" },
  ];
  const menuForBusiness = [
    { title: "공지사항", url: "/" },
    { title: "내 가게 정보 관리", url: "/storeInfoEdit" },
    { title: "제휴 맺기 게시판", url: "/board/list" },
    { title: "채팅 목록", url: "/" },
    { title: "문의하기", url: "/" },
  ];
  return (
    <div className="menuListContainer">
      {userState.userState === 1
        ? menuForCustomer.map((item, index) => {
            return (
              <Link to={item.url} key={index}>
                <span>{item.title}</span>
              </Link>
            );
          })
        : menuForBusiness.map((item, index) => {
            return (
              <Link to={item.url} key={index}>
                <span>{item.title}</span>
              </Link>
            );
          })}
      <div className="logout" onClick={onLogout}>
        로그아웃
      </div>
    </div>
  );
};

export default SidebarMenu;
