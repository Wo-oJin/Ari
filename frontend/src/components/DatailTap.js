import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { customAxios } from "../pages/customAxios";
import { authState } from "../state";
import "./DetailTap.css";
const { kakao } = window;

let testState = false;

//협력 가게 정보 탭
export const DetailCoopTap = ({ data }) => {
  const [index, setIndex] = useState("0");
  //버튼 사용 인증 상태
  const [isOpened, setisOpened] = useState(false);
  const [target, setTarget] = useState();
  const [value, setValue] = useState();
  const [auth, setAuth] = useRecoilState(authState);
  console.log("현재 유저 상태: ", auth);
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
  //버튼 클릭시 사용 인증 전송
  const sendVerify = async (e) => {
    if (!e.target.classList.contains("verifiedBtn")) {
      await customAxios
        .post("/history/record-button", {
          storeName: data.name,
          eventInfo: data.events[e.target.getAttribute("data-key")].info,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.result === "success") {
            e.target.classList.remove("sendVerifyBtn");
            e.target.classList.add("verifiedBtn");
            e.target.innerText = "사용 완료";
          }
        });
    } else {
      window.alert("이미 사용 완료하셨습니다.");
    }
  };

  const togglePopUp = (e) => {
    if (!e.target.classList.contains("verifiedBtn")) {
      setisOpened((prev) => !prev);
      setTarget(e.target);
    } else {
      window.alert("이미 사용 완료하셨습니다.");
    }
  };

  //버튼 클릭시 인증코드 전송
  const sendVerifyKey = async (e) => {
    console.log(`/history/check-code?code=${value}&ownerId=${data.ownerId}`);

    await customAxios
      .post(`/history/check-code?code=${value}&ownerId=${data.ownerId}`)
      .then(async (res) => {
        if (res.data.result === "success") {
          await customAxios
            .post("/history/record-code", {
              storeName: data.name,
              eventInfo: data.events[target.getAttribute("data-key")].info,
            })
            .then(() => {
              window.alert("인증되었습니다");
              setisOpened(false);
              target.classList.remove("sendVerifyBtn");
              target.classList.add("verifiedBtn");
              target.innerText = "사용 완료";
            });
        } else {
          window.alert("인증번호가 일치하지 않습니다.");
        }
      });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  if (data.partners.length > 0) {
    return (
      <div className="TapContainer">
        {isOpened ? (
          <div className="VerifyCodePopUp">
            <div className="VerifyForm">
              <input
                className="VerifyInput"
                placeholder="인증번호를 입력하세요."
                type="text"
                value={value}
                onChange={onChange}
              ></input>
              <button className="VerifyCodeBtn" onClick={sendVerifyKey}>
                확인
              </button>
            </div>

            <button className="ClosePopUpBtn" onClick={togglePopUp}>
              닫기
            </button>
          </div>
        ) : null}

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
                <div className="eventBox">
                  <span key={i} className="EventSubText">
                    {i + 1}. {item.eventInfo}
                  </span>
                  {auth === 4 && (
                    <button
                      data-key={i}
                      className="sendVerifyBtn"
                      onClick={sendVerify}
                    >
                      사용 인증
                    </button>
                  )}
                  {auth === 1 && (
                    <button
                      data-key={i}
                      className="sendVerifyBtn"
                      onClick={togglePopUp}
                    >
                      인증코드
                    </button>
                  )}
                </div>
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
  //버튼 사용 인증 상태
  const [isOpened, setisOpened] = useState(false);
  const [target, setTarget] = useState();
  const [value, setValue] = useState();

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

  //버튼 클릭시 사용 인증 전송
  const sendVerify = async (e) => {
    if (!e.target.classList.contains("verifiedBtn")) {
      await customAxios
        .post("/history/record-button", {
          storeName: data.name,
          eventInfo: data.events[e.target.getAttribute("data-key")].info,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.result === "success") {
            e.target.classList.remove("sendVerifyBtn");
            e.target.classList.add("verifiedBtn");
            e.target.innerText = "사용 완료";
          }
        });
    } else {
      window.alert("이미 사용 완료하셨습니다.");
    }
  };

  const togglePopUp = (e) => {
    if (!e.target.classList.contains("verifiedBtn")) {
      setisOpened((prev) => !prev);
      setTarget(e.target);
    } else {
      window.alert("이미 사용 완료하셨습니다.");
    }
  };

  //버튼 클릭시 인증코드 전송
  const sendVerifyKey = async (e) => {
    console.log(`/history/check-code?code=${value}&ownerId=${data.ownerId}`);

    await customAxios
      .post(`/history/check-code?code=${value}&ownerId=${data.ownerId}`)
      .then(async (res) => {
        if (res.data.result === "success") {
          await customAxios
            .post("/history/record-code", {
              storeName: data.name,
              eventInfo: data.events[target.getAttribute("data-key")].info,
            })
            .then(() => {
              window.alert("인증되었습니다");
              setisOpened(false);
              target.classList.remove("sendVerifyBtn");
              target.classList.add("verifiedBtn");
              target.innerText = "사용 완료";
            });
        } else {
          window.alert("인증번호가 일치하지 않습니다.");
        }
      });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="TapContainer">
      {isOpened ? (
        <div className="VerifyCodePopUp">
          <div className="VerifyForm">
            <input
              className="VerifyInput"
              placeholder="인증번호를 입력하세요."
              type="text"
              value={value}
              onChange={onChange}
            ></input>
            <button className="VerifyCodeBtn" onClick={sendVerifyKey}>
              확인
            </button>
          </div>

          <button className="ClosePopUpBtn" onClick={togglePopUp}>
            닫기
          </button>
        </div>
      ) : null}

      <div className="PrivateEventContent">
        <span className="EventTitle">이벤트 내용:</span>
        {data.events && data.events.length > 0 ? (
          data.events.map((item, i) => {
            return (
              <div className="eventBox">
                <span className="PrivateEventSubText" key={i}>
                  {i + 1}. {item.info}
                </span>
                {testState ? (
                  <button
                    data-key={i}
                    className="sendVerifyBtn"
                    onClick={sendVerify}
                  >
                    사용 인증
                  </button>
                ) : (
                  <button
                    data-key={i}
                    className="sendVerifyBtn"
                    onClick={togglePopUp}
                  >
                    인증코드
                  </button>
                )}
              </div>
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
          {data.openTime ? (
            <span className="StoreInfo">{data.openTime} </span>
          ) : (
            <span className="StoreInfo">아직 등록된 정보가 없습니다.</span>
          )}
          {data.phoneNumber ? (
            <span className="StoreInfo">{data.phoneNumber} </span>
          ) : (
            <span className="StoreInfo">아직 등록된 정보가 없습니다.</span>
          )}
          {data.subText ? (
            <span className="StoreInfo">{data.subText} </span>
          ) : (
            <span className="StoreInfo">아직 등록된 정보가 없습니다.</span>
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
