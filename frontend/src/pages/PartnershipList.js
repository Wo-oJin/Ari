import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customAxios } from "./customAxios";
import { IoIosArrowForward } from "react-icons/io";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { Container } from "../components/common/Container";
import TextEllipsis from "../components/common/TextEllipsis";
import {
  EventListInfo,
  Tap,
  TapActive,
  PartnershipState,
} from "../components/store/PartnershipStyle";

const PartnershipList = () => {
  const [requestList, setRequestList] = useState([]);
  const [isSentByMe, setIsSentByMe] = useState(false); // 내가 한 요청의 경우 new 표시 안 띄우기 위한 flag
  const [isLoading, setIsLoading] = useState(false);
  const taps = ["내가 받은 요청", "내가 한 요청", "처리된 요청"];
  const [tapIndex, setTapIndex] = useState("0"); // 탭 인덱스

  // url 파라미터로 전달된 storeId 받아오기
  const params = new URL(window.location.href).searchParams;
  const storeId = params.get("storeId");

  // 내가 받은 요청을 초기 리스트로 세팅
  const initialList = async () => {
    try {
      const { data } = await customAxios.get(
        `/owner/partnership/received?storeId=${storeId}`
      );

      setRequestList(data.data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initialList();
  }, []);

  const onClickTap = async (e) => {
    setTapIndex(e.target.id);

    switch (e.target.id) {
      case "0": // 내가 받은 요청
        try {
          const { data } = await customAxios.get(
            `/owner/partnership/received?storeId=${storeId}`
          );

          setRequestList(data.data);
        } catch (e) {
          console.log(e);
        }
        break;
      case "1": // 내가 한 요청
        try {
          const { data } = await customAxios.get(
            `/owner/partnership/send?storeId=${storeId}`
          );

          setRequestList(data.data);
          setIsSentByMe(true);
        } catch (e) {
          console.log(e);
        }
        break;
      case "2": // 처리된 요청
        try {
          const { data } = await customAxios.get(
            `/owner/partnership/completed?storeId=${storeId}`
          );

          setRequestList(data.data);
        } catch (e) {
          console.log(e);
        }
        break;
      default:
    }
  };

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header text="협약 요청 목록" back={true}></Header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "312px", marginTop: "26px" }}>
          {taps.map((tap, index) => {
            return index === parseInt(tapIndex) ? (
              <TapActive key={index} id={index} onClick={onClickTap}>
                {tap}
              </TapActive>
            ) : (
              <Tap key={index} id={index} onClick={onClickTap}>
                {tap}
              </Tap>
            );
          })}
        </div>
      </div>
      <Container marginTop="31px">
        {requestList.map((request, index) => {
          return (
            <div key={index}>
              <Link
                to="/partnershipView"
                state={{
                  storeId: storeId,
                  partnershipId: request.partnershipId,
                  partnershipState: request.partnershipState,
                }}
              >
                <EventListInfo>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextEllipsis maxWidth="200px">
                      {request.storeName}
                    </TextEllipsis>
                    {request.partnershipState === "WAITING" &&
                    isSentByMe === false &&
                    request.read === false ? (
                      <span className="new">new</span>
                    ) : null}
                  </div>
                  {request.partnershipState === "WAITING" ? (
                    <IoIosArrowForward color="#959595" size="20" />
                  ) : request.partnershipState === "REJECTED" ? (
                    <PartnershipState backgroundColor="#D86F6F">
                      거절
                    </PartnershipState>
                  ) : (
                    <PartnershipState backgroundColor="#386ffe">
                      승인
                    </PartnershipState>
                  )}
                </EventListInfo>
              </Link>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default PartnershipList;
