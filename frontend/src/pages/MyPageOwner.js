import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../pages/MyPageOwner.css";
import { useRecoilState } from "recoil";
import { nameState } from "../state";
import { customAxios } from "./customAxios";

const MyPageOwner = () => {
  const [name, setName] = useRecoilState(nameState);

  const [coopEventNum, setCoopEventNum] = useState(0);
  const [privateEventNum, setPrivateEventNum] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initialEventNum = async () => {
      try {
        await customAxios.get("/member/event-num").then((res) => {
          setCoopEventNum(res.data.data[0]);
          setPrivateEventNum(res.data.data[1]);
          setIsLoaded(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    initialEventNum();
  }, []);

  if (!isLoaded) {
    return <h1>로딩 중</h1>;
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
            <div className="main-info">
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "0",
                    marginBottom: "3px",
                  }}
                >
                  협력형 제휴
                </p>
                <span style={{ fontSize: "20px" }}>{coopEventNum}</span>
              </div>
            </div>
            <div className="main-info">
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "0",
                    marginBottom: "3px",
                  }}
                >
                  개인 이벤트
                </p>
                <span style={{ fontSize: "20px" }}>{privateEventNum}</span>
              </div>
            </div>
          </div>
          <Link to="/storeInfoEdit">
            <div className="sub-info">
              <p style={{ marginLeft: "28px" }}>내 가게 정보 수정</p>
              <img
                style={{ marginRight: "20px" }}
                alt=""
                src="images/arrow_right.png"
              ></img>
            </div>
          </Link>
          <Link to="/storePrivateEventList">
            <div className="sub-info">
              <p style={{ marginLeft: "28px" }}>개인 이벤트 등록</p>
              <img
                style={{ marginRight: "20px" }}
                alt=""
                src="images/arrow_right.png"
              ></img>
            </div>
          </Link>
          <Link to="/storeFavoriteList">
            <div className="sub-info">
              <p style={{ marginLeft: "28px" }}>찜 목록</p>
              <img
                style={{ marginRight: "20px" }}
                alt=""
                src="images/arrow_right.png"
              ></img>
            </div>
          </Link>
          <div className="sub-info">
            <p style={{ marginLeft: "28px" }}>채팅 목록</p>
            <img
              style={{ marginRight: "20px" }}
              alt=""
              src="images/arrow_right.png"
            ></img>
          </div>
        </div>
      </>
    );
  }
};

export default MyPageOwner;
