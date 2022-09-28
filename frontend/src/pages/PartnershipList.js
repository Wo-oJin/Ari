import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../pages/PartnershipList.css";
import { customAxios } from "./customAxios";

const PartnershipList = () => {
  const [requestList, setRequestList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const taps = ["내가 받은 요청", "내가 한 요청", "처리된 요청"];
  const [tapIndex, setTapIndex] = useState("0"); // 탭 인덱스

  // url 파라미터로 전달된 storeId 받아오기
  const params = new URL(window.location.href).searchParams;
  const storeId = params.get("storeId");

  useEffect(() => {
    // 내가 받은 요청을 초기 리스트로 세팅
    const initialList = async () => {
      try {
        await customAxios
          .get(`/partnership/received?storeId=${storeId}`)
          .then((res) => {
            setRequestList(res.data.data);
            setIsLoaded(true);
          });
      } catch (e) {
        console.log(e);
      }
    };
    initialList();
  }, []);

  const onClickTap = async (e) => {
    setTapIndex(e.target.id);

    switch (e.target.id) {
      case "0": // 내가 받은 요청
        try {
          await customAxios
            .get(`/partnership/received?storeId=${storeId}`)
            .then((res) => {
              setRequestList(res.data.data);
            });
        } catch (e) {
          console.log(e);
        }
        break;
      case "1": // 내가 한 요청
        try {
          await customAxios
            .get(`/partnership/send?storeId=${storeId}`)
            .then((res) => {
              setRequestList(res.data.data);
            });
        } catch (e) {
          console.log(e);
        }
        break;
      case "2": // 처리된 요청
        try {
          await customAxios
            .get(`/partnership/completed?storeId=${storeId}`)
            .then((res) => {
              setRequestList(res.data.data);
            });
        } catch (e) {
          console.log(e);
        }
        break;
      default:
    }
  };

  if (!isLoaded) {
    return <h1>로딩 중</h1>;
  } else {
    return (
      <>
        <Header text="협약 요청 목록" back={true}></Header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "312px", marginTop: "26px" }}>
            {taps.map((tap, index) => {
              return index === parseInt(tapIndex) ? (
                <button
                  key={index}
                  id={index}
                  className="edit-store-tap-active"
                  onClick={onClickTap}
                >
                  {tap}
                </button>
              ) : (
                <button
                  key={index}
                  id={index}
                  className="edit-store-tap"
                  onClick={onClickTap}
                >
                  {tap}
                </button>
              );
            })}
          </div>
        </div>
        <div className="container" style={{ marginTop: "31px" }}>
          {requestList.map((request, index) => {
            return (
              <div key={index}>
                <Link
                  to="/partnershipView"
                  state={{
                    storeId: storeId,
                    partnershipId: request.partnershipId,
                    partnershipState: request.partnershipState,
                    read: request.read,
                  }}
                >
                  <div className="partnership-event-list-info">
                    <p className="partnership-event-text-ellipsis">
                      {request.storeName}
                    </p>
                    {request.partnershipState === "WAITING" ? (
                      <img alt="" src="images/arrow_right.png"></img>
                    ) : request.partnershipState === "REJECTED" ? (
                      <div
                        className="partnershipState"
                        style={{ background: "#D86F6F" }}
                      >
                        거절
                      </div>
                    ) : (
                      <div className="partnershipState">승인</div>
                    )}
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

export default PartnershipList;
