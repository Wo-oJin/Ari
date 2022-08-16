import { useEffect, useState } from "react";
import "./DetailTap.css";
const { kakao } = window;
const testData = {
  storeList: [
    {
      id: 1,
      name: "미스터쉐프",
      owner_name: "우영우",
      address: "경기 수원시 팔달구 아주로 47번길 16",
      phoneNumber: "010-1234-5678",
      private_event: true,
      stamp: false,
      partnershipList: [
        {
          partnership_id: 1,
          partnerName: "아맛집",
          partnerLocation: "경기 수원시 팔달구 아주로 47번길 16",
          info: [
            "아맛집에서 10000원 이상 구매 시 전 메뉴 500원 할인",
            "아맛집에서 5000원 이상 구매 시 전 메뉴 100원 할인",
          ],
        },
        {
          partnership_id: 2,
          partnerName: "맥도날드",
          partnerLocation: "경기도 수원시 영통구 아주로 46",
          info: [
            "맥도날드에서 10000원 이상 구매 시 전 메뉴 500원 할인",
            "맥도날드에서 5000원 이상 구매 시 전 메뉴 100원 할인",
          ],
        },
      ],
      eventList: [
        {
          id: 1,
          info: ["미스터쉐프 할인 행사1", "미스터쉐프 할인 행사2"],
          start: "2022-08-01",
          finish: "2022-09-01",
        },
      ],
    },
  ],
};
const DetailCoopTap = () => {
  const [isSelected, setIsSelected] = useState("0");
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.addressSearch(
      testData.storeList[0].partnershipList[0].partnerLocation,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            clickable: true,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${testData.storeList[0].partnershipList[0].partnerName}</div>`,
            removable: false,
          });
          infowindow.open(map, marker);
          map.panTo(coords);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        } else {
          console.log("error");
        }
      }
    );
  }, []);

  return (
    <div className="TapContainer">
      <div className="CoopStoreListContainer">
        <span>협력 중인 가게:</span>
        <div className="CoopStoreList">
          {testData.storeList[0].partnershipList.map((item, i) => {
            return isSelected === `${i}` ? (
              <span
                className="SelectedStoreTag"
                onClick={() => {
                  setIsSelected(`${i}`);
                }}
              >
                {item.partnerName}
              </span>
            ) : (
              <span
                className="UnSelectedStoreTag"
                onClick={() => {
                  setIsSelected(`${i}`);
                }}
              >
                {item.partnerName}{" "}
              </span>
            );
          })}
        </div>
      </div>
      <div className="EventContent">
        <span className="EventTitle">이벤트 내용:</span>
        <span className="EventSubText">
          여긴 아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다. 여긴
          아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다. 여긴
          아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다.여긴
          아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다.
        </span>
      </div>
      <div className="StoreLocation">
        <span>위치 안내:</span>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

export default DetailCoopTap;
