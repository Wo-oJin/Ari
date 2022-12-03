import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { customAxios } from "./customAxios";
import { HiPlus } from "react-icons/hi";
import { Container } from "../components/common/Container";
import {
  AddList,
  EventListInfo,
} from "../components/store/StorePrivateEventStyle";
import { StoreTap } from "../components/store/StoreInfoStyle";

const StorePrivateEventList = () => {
  const [privateEvents, setPrivateEvents] = useState([]); // 개인 이벤트
  const [isLoading, setIsLoading] = useState(false);
  const [storeIndex, setStoreIndex] = useState("0"); // 가게 탭 인덱스

  const initialPrivateEvent = async () => {
    // url parmeter 값 가져오기
    const params = new URL(window.location.href).searchParams;
    const storeId = params.get("storeId");

    try {
      const { data } = await customAxios.get("/owner/private-event");
      // [{storeId: 5, storeName: "가게1", eventList: []}, {storeId: 30, storeName: "가게1", eventList: []}]
      setPrivateEvents(data.data);

      // url parameter에 해당하는 가게 탭 설정
      data.data.forEach((store, index) => {
        if (store.storeId === parseInt(storeId)) {
          setStoreIndex(index);
        }
      });
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 페이지 처음 렌더링될 때 개인 이벤트 리스트 받아오기
  useEffect(() => {
    initialPrivateEvent();
  }, []);

  // 가게 탭 바뀌었을 때 입력폼 초기값 설정
  const onClickStore = (e) => {
    setStoreIndex(e.target.id);
  };

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header text="개인 이벤트 등록" back={true} url={"/myPageOwner"}></Header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "327px", marginTop: "26px" }}>
          {privateEvents.map((store, index) => {
            return index === parseInt(storeIndex) ? (
              <StoreTap
                backgroundColor="#386ffe"
                key={index}
                id={index}
                onClick={onClickStore}
              >
                {store.storeName}
              </StoreTap>
            ) : (
              <StoreTap key={index} id={index} onClick={onClickStore}>
                {store.storeName}
              </StoreTap>
            );
          })}
        </div>
      </div>
      <Container>
        <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
          개인 이벤트 목록&#40;{privateEvents[storeIndex].eventList.length}
          &#41;
        </p>
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
                <EventListInfo privateEvent={privateEvent} />
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
          <AddList>
            <HiPlus color="#B9B9B9" size="20" />
          </AddList>
        </Link>
      </Container>
    </>
  );
};

export default StorePrivateEventList;
