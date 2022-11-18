import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../pages/MyPageOwner.css";
import { useRecoilState } from "recoil";
import { nameState } from "../state";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";

const MyPageOwner = () => {
  const [name, setName] = useRecoilState(nameState);

  const [coopEventNum, setCoopEventNum] = useState(0);
  const [privateEventNum, setPrivateEventNum] = useState(0);
  const [isNewPartnership, setIsNewPartnership] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const initialEventNum = async () => {
    try {
      await customAxios.get("/owner/event-num").then((res) => {
        setCoopEventNum(res.data.data[0]);
        setPrivateEventNum(res.data.data[1]);
        setIsLoaded(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

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
    checkNewPartnership();
    initialEventNum();
  }, []);

  const menu = [
    { title: "내 가게 정보 수정", url: "/storeInfoEdit" },
    { title: "개인 이벤트 등록", url: "/storePrivateEventList" },
    { title: "찜 목록", url: "/storeFavoriteList" },
    {
      title: "협약 요청 목록 ",
      url: "/partnership",
      isNew: isNewPartnership,
    },
    { title: "사장님 단체 채팅방", url: "/public/chat" },
  ];

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <Header text="마이페이지" back={true}></Header>
        <div className="container">
          <div className="welcome-card">
            <div style={{ marginLeft: "30px" }}>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  marginTop: "0",
                  marginBottom: "9px",
                }}
              >
                {name}
              </p>
              <span style={{ fontSize: "18px" }}>사장님 안녕하세요!</span>
            </div>
          </div>
          <div className="flex-align">
            <div style={{ margin: "24px 0" }}>
              <div className="main-info">
                <div style={{ textAlign: "center" }}>
                  <p className="mid-card">협력형 제휴</p>
                  <span style={{ fontSize: "20px" }}>{coopEventNum}</span>
                </div>
              </div>
            </div>
            <div style={{ margin: "24px 0" }}>
              <Link to="/storePrivateEventList">
                <div className="main-info">
                  <div style={{ textAlign: "center" }}>
                    <p className="mid-card">개인 이벤트</p>
                    <span style={{ fontSize: "20px" }}>{privateEventNum}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {menu.map((item, index) => {
            return (
              <div style={{ marginBottom: "12px" }} key={index}>
                <Link to={item.url}>
                  <div className="sub-info">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ marginLeft: "28px" }}>{item.title}</p>
                      {item.isNew === true ? (
                        <span className="new">new</span>
                      ) : null}
                    </div>
                    <img
                      style={{ marginRight: "20px" }}
                      alt=""
                      src="images/arrow_right.png"
                    ></img>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default MyPageOwner;
