import React from "react";
import "../App.css";
import "../styles/SidebarMenu.css";
import { Link } from "react-router-dom";

const SidebarMenu = (userState) => {
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
    </div>
  );
};

export default SidebarMenu;
