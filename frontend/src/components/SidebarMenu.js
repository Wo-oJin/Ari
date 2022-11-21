import React from "react";
import "../App.css";
import "../styles/SidebarMenu.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import Cookies from "universal-cookie";

const SidebarMenu = ({ userState, isNew }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const cookies = new Cookies();

  const onLogout = async () => {
    try {
      await axios
        .post("/auth/logout", {
          accessToken: cookies.get("accessToken"),
          refreshToken: cookies.get("refreshToken"),
        })
        .then((res) => {
          if (res.data.result === "success") {
            // 로그아웃 성공
            // 쿠키에 저장된 토큰 삭제
            cookies.remove("accessToken", { path: "/" });
            cookies.remove("refreshToken", { path: "/" });

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

  const onClickHelp = () => {
    window.open("http://pf.kakao.com/_LjxcCxj/chat");
  };

  const menuForCustomer = [
    { title: "공지사항", url: "/notice", service: true },
    { title: "찜 목록", url: "/userFavoriteList", service: true },
    {
      title: "문의하기",
      url: "/",
      onClick: onClickHelp,
      service: true,
    },
  ];
  const menuForBusiness = [
    { title: "공지사항", url: "/notice", service: true },
    { title: "내 가게 정보 관리", url: "/storeInfoEdit", service: true },
    { title: "제휴 맺기 게시판", url: "/board/list", service: true },
    {
      title: "협력 제휴 관리",
      url: "/partnership",
      service: true,
      isNew: isNew,
    },
    { title: "사장님 단체 채팅방", url: "/public/chat", service: true },
    {
      title: "문의하기",
      url: "/",
      service: true,
      onClick: onClickHelp,
    },
  ];
  return (
    <div className="menuListContainer">
      {userState === 1 || userState === 4
        ? menuForCustomer.map((item, index) => {
            if (item.service) {
              return (
                <Link to={item.url} key={index}>
                  <span onClick={item.onClick}>{item.title}</span>
                </Link>
              );
            } else {
              return (
                <a>
                  <span
                    onClick={() => {
                      window.alert("준비 중인 서비스입니다.");
                    }}
                  >
                    {item.title}
                  </span>
                </a>
              );
            }
          })
        : menuForBusiness.map((item, index) => {
            if (item.service) {
              return (
                <Link to={item.url} key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span onClick={item.onClick}>{item.title}</span>
                    {item.isNew === true ? (
                      <span className="new">new</span>
                    ) : null}
                  </div>
                </Link>
              );
            } else {
              return (
                <a>
                  <span
                    onClick={() => {
                      window.alert("준비 중인 서비스입니다.");
                    }}
                  >
                    {item.title}
                  </span>
                </a>
              );
            }
          })}
      <div className="logout" onClick={onLogout}>
        로그아웃
      </div>
    </div>
  );
};

export default SidebarMenu;
