import { React, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../pages/StorePrivateEventList.css";
import axios from "axios";
import { token } from "../services/jwt/token";

const StorePrivateEventList = () => {
  const [privateEvents, setPrivateEvents] = useState([]); // 개인 이벤트

  const { getRefreshToken } = token;

  // 페이지 처음 렌더링될 때 개인 이벤트 리스트 받아오기
  useEffect(() => {
    const initialPrivateEvent = async () => {
      try {
        await axios
          .get("/edit/self-event", {
            headers: {
              Authorization: `Bearer ${getRefreshToken}`,
            },
          })
          .then((res) => {
            // console.log("res.data.data", res.data.data);
            setPrivateEvents(res.data.data);
          });
      } catch (e) {
        console.log(e);
      }
    };
    initialPrivateEvent();
  }, []);

  return (
    <>
      <Header text="개인 이벤트 등록" back={true}></Header>
      <div className="container">
        <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
          개인 이벤트 목록&#40;{privateEvents.length}&#41;
        </p>
        {/* 개인 이벤트 내용이 담긴 문자열 배열 받아서 map 함수로 리스트 구성 */}
        {privateEvents.map((privateEvent, index) => {
          return (
            <div key={index}>
              <Link
                to="/storeEditPrivateEvent"
                state={{ index: index, info: privateEvents[index] }}
              >
                <div className="event-list-info">
                  <p className="text-ellipsis">{privateEvent}</p>
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

        <Link to="/storeAddPrivateEvent">
          <div className="addList">
            <img alt="" src="images/add_icon.png"></img>
          </div>
        </Link>
      </div>
    </>
  );
};

export default StorePrivateEventList;
