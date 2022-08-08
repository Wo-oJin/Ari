import KakaoMapScript from "./KakaoMapScript";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StoreModal from "../../components/StoreModal";
const testData = [
  {
    title: "미스터쉐프",
    address: "경기 수원시 팔달구 아주로 47번길 16",
    eventList: [[true, "아맛집"], false, true],
  },
  {
    title: "아맛집",
    address: "경기 수원시 팔달구 아주로 13번길 19 골든파크",
    eventList: [[true, "미스터쉐프"], true, false],
  },
];
const Map = ({ onClick, name }) => {
  //const [data, setData] = useState("");
  const [isModalOpend, setIsModalOpend] = useState(false);
  const [index, setIndex] = useState(0);
  const onMarkerClicked = (index) => {
    setIsModalOpend(!isModalOpend);
    setIndex(index);
  };
  useEffect(() => {
    const getMarkerData = async () => {
      axios
        .get("/map/store")
        .then((response) => {
          KakaoMapScript(response.data.storeList, onMarkerClicked);
        })
        .catch((e) => console.log("something went wrong :(", e));
    };
    getMarkerData();
  }, []);

  return (
    <>
      <div
        className={name}
        onClick={onClick}
        id="myMap"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
      {isModalOpend ? <StoreModal data={testData[index]} /> : null}
    </>
  );
};

export default Map;
