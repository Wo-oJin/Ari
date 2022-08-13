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
    geoCoder.addressSearch(data[i].address, function (result, status) {
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
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${data[i].name}</div>`,
          removable: false,
        });
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
          map.panTo(coords);
          onMarkerClicked(i);
          kakao.maps.event.addListener(map, "click", () => {
            infowindow.close();
          });
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      } else {
        console.log("error");
      }
    });
  }
};

<<<<<<< HEAD
export default KakaoMapScript;
=======
export default KakaoMapScript;
>>>>>>> upstream/signup
