import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "../pages/Partnership.css";
import { customAxios } from "./customAxios";

const Partnership = () => {
  const [fromStores, setFromStores] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // 협약 신청자의 가게 리스트 받아오기
    const getFromStoreList = async () => {
      try {
        await customAxios.get("/partnership/store-list").then((res) => {
          setFromStores(res.data.data);
          setIsLoaded(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getFromStoreList();
  }, []);

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <Header text="협약 요청 목록" back={true}></Header>
        <div className="container">
          <div className="partnership-container">
            <img
              alt=""
              src="images/ari_logo_text.png"
              style={{ width: "97px", height: "97px" }}
            ></img>
            <p className="partnership-intro" style={{ marginBottom: "16px" }}>
              어떤 가게로
            </p>
            <p className="partnership-intro" style={{ marginBottom: "55px" }}>
              확인하시나요?
            </p>
            {fromStores.map((store, index) => {
              return (
                <button
                  className="partnership-storeBtn"
                  key={index}
                  onClick={() =>
                    navigate(`/partnershipList?storeId=${store.storeId}`)
                  }
                >
                  <span>{store.storeName}</span>
                  <img alt="" src="images/partnership_arrow.png"></img>
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Partnership;
