const { kakao } = window;

const KakaoMapScript = (data, onMarkerClicked) => {
  const container = document.getElementById("myMap");
  const options = {
    center: new kakao.maps.LatLng(37.2775551775579, 127.04387899081716),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);

  let geoCoder = new kakao.maps.services.Geocoder();

  for (let i = 0; i < data.length; i++) {
    geoCoder.addressSearch(
      data[i].address.roadAddress,
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
            content: `<div style="background-color: #ffffff;border-radius: 20px;border: 2px solid #386ffe; padding: 3px 10px; margin-bottom:40px">${data[i].name}</div>`,
            position: coords,
            yAnchor: 1,
          });
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커 위에 인포윈도우를 표시합니다
            customOverlay.setMap(map);
            map.panTo(coords);
            onMarkerClicked(i);
            kakao.maps.event.addListener(map, "click", () => {
              customOverlay.setMap(null);
            });
          });
        } else {
          console.log("error");
        }
      }
    );
  }
};

export default KakaoMapScript;