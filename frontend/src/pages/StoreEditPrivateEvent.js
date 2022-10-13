import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../pages/StoreEditPrivateEvent.css";
import { customAxios } from "./customAxios";

const StoreEditPrivateEvent = () => {
  const [newInfo, setNewInfo] = useState("");

  const navigate = useNavigate();

  const { state } = useLocation(); // StorePrivateEventList.js에서 Link로 전달한 데이터 받아오기
  const index = state.index;
  const storeId = state.storeId;
  const info = state.info;

  useEffect(() => {
    setNewInfo(info);
  }, [info]);

  // console.log("index>>"+index);

  const onDelete = async () => {
    try {
      await customAxios
        .post("/delete/self-event", {
          storeId: storeId,
          eventNum: index,
        })
        .then((res) => {
          alert(res.data.massage);
          navigate(`/storePrivateEventList?storeId=${storeId}`);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onEdit = async () => {
    try {
      await customAxios
        .post("/edit/self-event", {
          storeId: storeId,
          eventNum: index,
          newInfo: newInfo,
        })
        .then((res) => {
          if (res.data.result === "success") {
            alert("수정에 성공하였습니다.");
            navigate(`/storePrivateEventList?storeId=${storeId}`);
          } else {
            alert("수정에 실패하였습니다.");
            navigate(`/storePrivateEventList?storeId=${storeId}`);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header text="개인 이벤트 수정/삭제" back={true}></Header>
      <div className="container">
        <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
          개인 이벤트 수정/삭제
        </p>
        <div style={{ position: "relative" }}>
          <textarea
            className="eventForm"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
            maxLength="250"
          ></textarea>
          <img
            style={{
              position: "absolute",
              right: "0",
              bottom: "6px",
              padding: "16px",
            }}
            alt=""
            src="images/edit_icon.png"
          ></img>
        </div>
      </div>
      <div style={{ width: "327px", margin: "0 auto", marginTop: "16px" }}>
        <div className="edit-buttonContainer">
          <button className="event-deleteBtn" type="button" onClick={onDelete}>
            삭제
          </button>
          <button className="event-editBtn" type="submit" onClick={onEdit}>
            수정
          </button>
        </div>
      </div>
    </>
  );
};

export default StoreEditPrivateEvent;
