import getMarkerData from "./getMarkerData";

const { kakao } = window;

export default function KakaoMapScript() {
  const container = document.getElementById("myMap");
  const options = {
    center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);

  //axios로 마커 정보 받아오기
  let data = getMarkerData();
  console.log(data);
  //   let data = [
  //     {
  //       title: "test1",
  //       address: "경기 수원시 팔달구 아주로 47번길 16",
  //     },
  //     {
  //       title: "test2",
  //       address: "경기 수원시 팔달구 아주로 13번길 19 골든파크",
  //     },
  //   ];
  let geoCoder = new kakao.maps.services.Geocoder();

  for (let i = 0; i < data.storeList.length; i++) {
    geoCoder.addressSearch(
      data[0].storeList[i].address,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${data[0].storeList[i].name}</div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        } else {
          console.log("error");
        }
      }
    );
  }
}
