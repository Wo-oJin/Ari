import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/PartnershipView.css";
import Header from "../components/Header";
import { customAxios } from "./customAxios";

const PartnershipView = () => {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const getPartnershipInfo = async () => {
      try {
        await customAxios
          .get(
            `/partnership/info?storeId=${state.storeId}&partnershipId=${state.partnershipId}`
          )
          .then((res) => {
            setData(res.data.data);
            setIsLoaded(true);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getPartnershipInfo();
  }, []);

  const onRejected = async () => {
    try {
      await customAxios
        .post(
          `/partnership/reject?storeId=${state.storeId}&partnershipId=${state.partnershipId}`
        )
        .then((res) => {
          alert("협약 요청이 거절되었습니다.");
          navigate(`/partnershipList?storeId=${state.storeId}`);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onApproved = async () => {
    try {
      await customAxios
        .post(
          `/partnership/approve?storeId=${state.storeId}&partnershipId=${state.partnershipId}`
        )
        .then((res) => {
          alert("제휴 맺기가 성공적으로 처리되었습니다.");
          navigate(`/partnershipList?storeId=${state.storeId}`);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async () => {};

  // 날짜 앞에 0 붙이기
  function addZero(date) {
    if (date < 10) {
      const zeroDate = ("00" + date).slice(-2);
      return zeroDate;
    }
    return date;
  }

  if (!isLoaded) {
    return <h1>로딩 중</h1>;
  } else {
    return (
      <>
        <Header text="협약 내용" back={true}></Header>
        <div className="container">
          <div
            style={{ boxSizing: "border-box", width: "375px", padding: "24px" }}
          >
            <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
              협력형 제휴 내용
            </p>
            <div className="partnership-infoForm">
              <table>
                <tbody>
                  <tr>
                    <td>제휴 가게:</td>
                    <td>{data.storeNames.join(", ")}</td>
                  </tr>
                  <tr>
                    <td>제휴 기간:</td>
                    <td>
                      {data.startDate.map((date) => addZero(date)).join("/")} ~{" "}
                      {data.finishDate.map((date) => addZero(date)).join("/")}
                    </td>
                  </tr>
                  <tr>
                    <td>제휴 내용:</td>
                    <td style={{ fontSize: "12px", color: "#868585" }}>
                      {data.content}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {data.partnershipState === "WAITING" && data.sentByMe === false ? (
              <div
                style={{ width: "327px", margin: "0 auto", marginTop: "16px" }}
              >
                <div className="edit-buttonContainer">
                  <button
                    className="event-deleteBtn"
                    type="button"
                    onClick={onRejected}
                  >
                    거절
                  </button>
                  <button
                    className="event-editBtn"
                    type="submit"
                    onClick={onApproved}
                  >
                    수락
                  </button>
                </div>
              </div>
            ) : data.partnershipState === "WAITING" &&
              data.sentByMe === true ? (
              <button
                className="partnership-rightBtn"
                style={{ background: "#D86F6F" }}
                onClick={onDelete}
              >
                삭제
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
  }
};

export default PartnershipView;
