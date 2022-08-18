import { useEffect, useState } from "react";
import "./DetailTap.css";
const { kakao } = window;
const testData = {
  storeList: [
    {
      id: 1,
      name: "미스터쉐프",
      owner_name: "우영우",
      open_time: "연중무휴, 오전 10:00 ~ 오후 10:00",
      sub_text: "여기는 한국 최고 한식집인 미스터쉐프입니다.",
      address: "경기 수원시 팔달구 아주로 47번길 16",
      phoneNumber: "010-1234-5678",
      private_event: true,
      stamp: false,
      partnershipList: [
        {
          partnership_id: 1,
          partnerName: "아주맛있는집",
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
        {
          partnership_id: 2,
          partnerName: "맥도날드",
          partnerLocation: "경기도 수원시 영통구 아주로 46",
          info: [
            "맥도날드에서 10000원 이상 구매 시 전 메뉴 500원 할인",
            "맥도날드에서 5000원 이상 구매 시 전 메뉴 100원 할인",
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
        {
          partnership_id: 2,
          partnerName: "맥도날드",
          partnerLocation: "경기도 수원시 영통구 아주로 46",
          info: [
            "맥도날드에서 10000원 이상 구매 시 전 메뉴 500원 할인",
            "맥도날드에서 5000원 이상 구매 시 전 메뉴 100원 할인",
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
          info: "미스터쉐프 할인 행사1",
          start: "2022-08-01",
          finish: "2022-09-01",
        },
        {
          id: 2,
          info: "미스터쉐프 할인 행사2",
          start: "2022-08-01",
          finish: "2022-09-01",
        },
      ],
    },
  ],
};
//협력 가게 정보 탭
export const DetailCoopTap = () => {
  const [index, setIndex] = useState("0");
  //로드되면 처음에 협력 가게 위치를 카카오맵 상에 마커로 찍기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.addressSearch(
      testData.storeList[0].partnershipList[index].partnerLocation,
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
          var customOverlay = new kakao.maps.CustomOverlay({
            content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px;margin-bottom:120px;">${testData.storeList[0].partnershipList[index].partnerName}</div>`,
            removable: false,
            position: coords,
          });
          customOverlay.setMap(map);
          map.panTo(coords);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        } else {
          console.log("error");
        }
      }
    );
  }, [index]);

  return (
    <div className="TapContainer">
      <div className="CoopStoreListContainer">
        <span>협력 중인 가게:</span>
        <div className="CoopStoreList">
          {testData.storeList[0].partnershipList.map((item, i) => {
            return index === `${i}` ? (
              <span
                className="SelectedStoreTag"
                onClick={() => {
                  setIndex(`${i}`);
                }}
                key={i}
              >
                {item.partnerName}
              </span>
            ) : (
              <span
                className="UnSelectedStoreTag"
                onClick={() => {
                  setIndex(`${i}`);
                }}
                key={i}
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
          {testData.storeList[0].partnershipList[index].info}
        </span>
      </div>
      <div className="StoreLocation">
        <span>위치 안내:</span>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

//개인 이벤트 탭
export const PrivateEventTap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.addressSearch(
      testData.storeList[0].address,
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
          var customOverlay = new kakao.maps.CustomOverlay({
            content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px;margin-bottom:120px;">${testData.storeList[0].name}</div>`,
            removable: false,
            position: coords,
          });
          customOverlay.setMap(map);
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
      <div className="PrivateEventContent">
        <span className="EventTitle">이벤트 내용:</span>
        {testData.storeList[0].private_event ? (
          testData.storeList[0].eventList.map((item, i) => {
            return (
              <span className="PrivateEventSubText" key={i}>
                {i + 1}. {item.info}
              </span>
            );
          })
        ) : (
          <span>현재 진행 중인 이벤트가 없습니다</span>
        )}
      </div>
      <div className="StoreLocation">
        <span>위치 안내:</span>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

export const StoreInfoTap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.addressSearch(
      testData.storeList[0].address,
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
          var customOverlay = new kakao.maps.CustomOverlay({
            content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px;margin-bottom:120px;">${testData.storeList[0].name}</div>`,
            removable: false,
            position: coords,
          });
          customOverlay.setMap(map);
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
      <span className="EventTitle">가게 정보:</span>
      <div className="StoreContainer">
        <div className="StoreContentL">
          <span className="StoreInfo">상호명: </span>
          <span className="StoreInfo">운영시간: </span>
          <span className="StoreInfo">전화번호: </span>
          <span className="StoreInfo">한 줄 소개: </span>
        </div>
        <div className="StoreContentR">
          <span className="StoreInfo">{testData.storeList[0].name} </span>
          <span className="StoreInfo">{testData.storeList[0].open_time} </span>
          <span className="StoreInfo">
            {testData.storeList[0].phoneNumber}{" "}
          </span>
          <span className="StoreInfo">{testData.storeList[0].sub_text} </span>
        </div>
      </div>
      <div className="StoreLocation">
        <span>위치 안내:</span>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};
