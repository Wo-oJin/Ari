import KakaoMapScript from "./KakaoMapScript";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StoreModal from "../../components/StoreModal";

//테스트 데이터
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
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [index, setIndex] = useState(0);

  //마커가 클릭되면 모달 open 상태 바꾸고 클릭된 데이터의 인덱스로 설정
  const onMarkerClicked = (index) => {
    setIsModalOpened(!isModalOpened);
    setIndex(index);
  };

  //처음에 한 번만 데이터를 가져오는 작업 수행
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
      {isModalOpened ? (
        <StoreModal
          data={testData[index]}
          setIsmModalOpened={setIsModalOpened}
        />
      ) : null}
    </>
  );
};

export default Map;
