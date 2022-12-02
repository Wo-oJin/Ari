import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "../pages/Partnership.css";
import { customAxios } from "./customAxios";
import { IoIosArrowForward } from "react-icons/io";

const Partnership = () => {
  const [fromStores, setFromStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 협약 신청자의 가게 리스트 받아오기
  const getFromStoreList = async () => {
    try {
      const { data } = await customAxios.get("/owner/partnership/store-list");

      setFromStores(data.data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFromStoreList();
  }, []);

  if (!isLoading) {
    return <Loading />;
  }

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
                <IoIosArrowForward
                  color="#FAFAFA"
                  size="26"
                  style={{ margin: "0 3px 0 13px" }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Partnership;
