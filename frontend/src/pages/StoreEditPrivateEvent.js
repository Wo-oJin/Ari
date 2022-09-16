import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../pages/StoreEditPrivateEvent.css";
import axios from "axios";

const StoreEditPrivateEvent = () => {
  const [newInfo, setNewInfo] = useState("");

  const navigate = useNavigate();

  const { state } = useLocation(); // StorePrivateEventList.js에서 Link로 전달한 데이터 받아오기
  const index = state.index;
  const info = state.info;

  useEffect(() => {
    setNewInfo(info);
  }, [info]);

  // console.log("index>>"+index);

  const onDelete = async () => {
    try {
      await axios
        .post("/delete/self-event", {
          eventNum: index,
        })
        .then((res) => {
          alert(res.data.massage);
          navigate("/storePrivateEventList");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onEdit = async () => {
    try {
      await axios
        .post("/edit/self-event", {
          newInfo: newInfo,
          eventNum: index,
        })
        .then((res) => {
          alert(res.data.massage);
          navigate("/storePrivateEventList");
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
            maxLength="152"
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
