import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../pages/PartnershipWrite.css";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";

const PartnershipWrite = () => {
  const [fromStores, setFromStores] = useState([]);
  const [storeIndex, setStoreIndex] = useState("-1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    // 협약 신청자의 가게 리스트 받아오기
    const getFromStoreList = async () => {
      try {
        await customAxios.get("/owner/partnership/store-list").then((res) => {
          setFromStores(res.data.data);
          setIsLoaded(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getFromStoreList();
  }, []);

  const partnershipRequest = async () => {
    try {
      await customAxios
        .post("/owner/partnership/request", {
          startDate: startDate.replace(/-/g, "/"),
          endDate: endDate.replace(/-/g, "/"),
          fromStoreId: fromStores[storeIndex].storeId,
          toStoreId: state.storeId,
          content: content,
          articleId: parseInt(state.articleId),
        })
        .then((res) => {
          alert("협약이 성공적으로 요청되었습니다.");
          navigate("/partnership");
        });
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <Header text="협약 제휴 작성" back={true}></Header>
        <div className="container">
          <div
            style={{ boxSizing: "border-box", width: "375px", padding: "25px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "18px",
                borderBottom: "1px solid #dbdbdb",
                paddingBottom: "15px",
              }}
            >
              <p className="partnership-write-intro">작성자 가게 선택</p>
              <select
                className="partnership-select-store"
                onChange={(e) => setStoreIndex(e.target.value)}
              >
                <option value="-1">--선택하세요--</option>
                {fromStores &&
                  fromStores.map((store, index) => {
                    return (
                      <option key={index} value={index}>
                        {store.storeName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <p className="partnership-write-intro">제휴 기간</p>
            <div className="partnership-period-input">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
              <span style={{ margin: "0 5px" }}>~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
            </div>
            <p className="partnership-write-intro">제휴 내용</p>
            <div style={{ position: "relative" }}>
              <textarea
                className="partnership-write-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="(XXX가게 영수증 지참 후 우리 가게 방문 시, A메뉴 10% 할인)"
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
            <button
              className="partnership-rightBtn"
              onClick={partnershipRequest}
              disabled={
                storeIndex !== "-1" && startDate !== "" && endDate !== ""
                  ? false
                  : true
              }
            >
              협약 등록
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default PartnershipWrite;
