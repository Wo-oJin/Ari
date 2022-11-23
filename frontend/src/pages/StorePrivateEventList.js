import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "../pages/StorePrivateEventList.css";
import { customAxios } from "./customAxios";
import { HiPlus } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

const StorePrivateEventList = () => {
  const [privateEvents, setPrivateEvents] = useState([]); // 개인 이벤트
  const [isLoaded, setIsLoaded] = useState(false);

  const [storeIndex, setStoreIndex] = useState("0"); // 가게 탭 인덱스

  // 페이지 처음 렌더링될 때 개인 이벤트 리스트 받아오기
  useEffect(() => {
    // url parmeter 값 가져오기
    const params = new URL(window.location.href).searchParams;
    const storeId = params.get("storeId");

    const initialPrivateEvent = async () => {
      try {
        await customAxios.get("/owner/private-event").then((res) => {
          // [{storeId: 5, storeName: "가게1", eventList: []}, {storeId: 30, storeName: "가게1", eventList: []}]
          setPrivateEvents(res.data.data);

          // url parameter에 해당하는 가게 탭 설정
          res.data.data.forEach((store, index) => {
            if (store.storeId === parseInt(storeId)) {
              setStoreIndex(index);
            }
          });
          setIsLoaded(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    initialPrivateEvent();
  }, []);

  // 가게 탭 바뀌었을 때 입력폼 초기값 설정
  const onClickStore = (e) => {
    setStoreIndex(e.target.id);
  };

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <Header
          text="개인 이벤트 등록"
          back={true}
          url={"/myPageOwner"}
        ></Header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "312px", marginTop: "26px" }}>
            {privateEvents.map((store, index) => {
              return index === parseInt(storeIndex) ? (
                <button
                  key={index}
                  id={index}
                  className="edit-store-tap-active"
                  onClick={onClickStore}
                >
                  {store.storeName}
                </button>
              ) : (
                <button
                  key={index}
                  id={index}
                  className="edit-store-tap"
                  onClick={onClickStore}
                >
                  {store.storeName}
                </button>
              );
            })}
          </div>
        </div>
        <div className="container">
          <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
            개인 이벤트 목록&#40;{privateEvents[storeIndex].eventList.length}
            &#41;
          </p>
          {/* 개인 이벤트 내용이 담긴 문자열 배열 받아서 map 함수로 리스트 구성 */}
          {privateEvents[storeIndex].eventList.map((privateEvent, index) => {
            return (
              <div key={index}>
                <Link
                  to="/storeEditPrivateEvent"
                  state={{
                    storeId: privateEvents[storeIndex].storeId,
                    index: index,
                    info: privateEvent,
                  }}
                >
                  <div className="event-list-info">
                    <p className="event-text-ellipsis">{privateEvent}</p>
                    <IoIosArrowForward
                      color="#959595"
                      size="20"
                      style={{ marginRight: "20px" }}
                    />
                  </div>
                </Link>
              </div>
            );
          })}

          <Link
            to="/storeAddPrivateEvent"
            state={{
              storeId: privateEvents[storeIndex].storeId,
            }}
          >
            <div className="addList">
              <HiPlus color="#B9B9B9" size="20" />
            </div>
          </Link>
        </div>
      </>
    );
  }
};

export default StorePrivateEventList;
