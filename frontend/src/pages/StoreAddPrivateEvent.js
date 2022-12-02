import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../pages/StoreAddPrivateEvent.css";
import { customAxios } from "./customAxios";
import { BiEditAlt } from "react-icons/bi";

const StoreAddPrivateEvent = () => {
  const [newInfo, setNewInfo] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation(); // StorePrivateEventList.js에서 Link로 전달한 데이터 받아오기
  const storeId = state.storeId;

  const onAdd = async () => {
    try {
      const { data } = await customAxios.post("/owner/add/private-event", {
        storeId,
        info: newInfo,
      });

      alert(data.massage);
      navigate(`/storePrivateEventList?storeId=${storeId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header text="개인 이벤트 추가" back={true}></Header>
      <div className="container">
        <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
          개인 이벤트 추가
        </p>
        <div style={{ position: "relative" }}>
          <textarea
            className="eventForm"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
            maxLength="250"
          ></textarea>
          <BiEditAlt
            color="#A3A3A3"
            size="22"
            style={{
              position: "absolute",
              right: "0",
              bottom: "6px",
              padding: "16px",
            }}
          />
        </div>
      </div>
      <div style={{ width: "327px", margin: "0 auto", marginTop: "16px" }}>
        <div className="add-buttonContainer">
          <button className="AddBtn" onClick={onAdd}>
            추가
          </button>
        </div>
      </div>
    </>
  );
};

export default StoreAddPrivateEvent;
