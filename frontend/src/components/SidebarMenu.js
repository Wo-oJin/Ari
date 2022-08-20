import React from "react";
import "../App.css";
import "../styles/SidebarMenu.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authState, nameState } from '../state';

const SidebarMenu = (userState) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const onLogout = async () => {
    try {
      await axios
        .post("/auth/logout", {
          "accessToken": localStorage.getItem("accessToken"),
          "refreshToken": localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.data.result === "success") { // 로그아웃 성공
            // localStorage에 저장된 토큰 삭제
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            
            // recoil persist로 저장된 변수 초기화
            setAuth(0);
            setName("");

            alert(res.data.massage);
          } else { // 로그아웃 실패
            alert(res.data.massage);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const menuForGuest = [
    "공지사항",
    "즐겨찾기",
    "마이페이지",
    "문의하기",
    "마이 스탬프",
  ];
  const menuForBusiness = [
    "공지사항",
    "내 가게 정보 관리",
    "제휴 맺기 게시판",
    "채팅 목록",
    "문의하기",
  ];

  return (
    <div className="menuListContainer">
      {userState.userState === 1
        ? menuForGuest.map((item, index) => {
            return <span key={index}>{item}</span>;
          })
        : menuForBusiness.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
      <div className="logout" onClick={onLogout}>로그아웃</div>
    </div>
  );
};

export default SidebarMenu;
