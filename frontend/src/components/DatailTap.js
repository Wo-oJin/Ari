import { useEffect, useState } from "react";
import "./DetailTap.css";
const { kakao } = window;

//협력 가게 정보 탭
export const DetailCoopTap = ({ data }) => {
  const [index, setIndex] = useState("0");
  console.log("in detailTap ", data);
  //로드되면 처음에 협력 가게 위치를 카카오맵 상에 마커로 찍기
  useEffect(() => {
    if (data.partners.length > 0) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
        level: 4,
      };
      const map = new kakao.maps.Map(container, options);
      let geoCoder = new kakao.maps.services.Geocoder();
      geoCoder.addressSearch(
        data.partners[index].roadAddress,
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
              content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px;margin-bottom:120px;">${data.partners[index].partnerName}</div>`,
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
    }
  }, [index]);
  if (data.partners.length > 0) {
    return (
      <div className="TapContainer">
        <div className="CoopStoreListContainer">
          <span>협력 중인 가게:</span>
          <div className="CoopStoreList">
            {data.partners &&
              data.partners.map((item, i) => {
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
                    {item.partnerName}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="EventContent">
          <span className="EventTitle">이벤트 내용:</span>
          {data.partners.length > 0 &&
            data.partners[index].infos.map((item, i) => {
              return (
                <span key={i} className="EventSubText">
                  {item.eventInfo}
                </span>
              );
            })}
        </div>
        <div className="StoreLocation">
          <span>위치 안내:</span>
          <div id="map" className="map"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="TapContainer">
        <span>등록된 정보가 없습니다.</span>
      </div>
    );
  }
};

//개인 이벤트 탭
export const PrivateEventTap = ({ data }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.addressSearch(data.address.roadAddress, function (result, status) {
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
          content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px;margin-bottom:120px;">${data.name}</div>`,
          removable: false,
          position: coords,
        });
        customOverlay.setMap(map);
        map.panTo(coords);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      } else {
        console.log("error");
      }
    });
  }, []);
  console.log("in private ", data);
  return (
    <div className="TapContainer">
      <div className="PrivateEventContent">
        <span className="EventTitle">이벤트 내용:</span>
        {data.events && data.events.length > 0 ? (
          data.events.map((item, i) => {
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

export const StoreInfoTap = ({ data }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    let geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.addressSearch(data.address.roadAddress, function (result, status) {
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
          content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px;margin-bottom:120px;">${data.name}</div>`,
          removable: false,
          position: coords,
        });
        customOverlay.setMap(map);
        map.panTo(coords);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      } else {
        console.log("error");
      }
    });
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
          <span className="StoreInfo">{data.ownerName} </span>
          {data.openHour ? (
            <span className="StoreInfo">{data.openHour} </span>
          ) : (
            <span>아직 등록된 정보가 없습니다.</span>
          )}
          {data.phoneNumber ? (
            <span className="StoreInfo">{data.phoneNumber} </span>
          ) : (
            <span>아직 등록된 정보가 없습니다.</span>
          )}
          {data.subText ? (
            <span className="StoreInfo">{data.subText} </span>
          ) : (
            <span>아직 등록된 정보가 없습니다.</span>
          )}
        </div>
      </div>
      <div className="StoreLocation">
        <span>위치 안내:</span>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};
