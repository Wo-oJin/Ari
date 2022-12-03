import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";
import {
  Container,
  SpaceBetweenContainer,
} from "../components/common/Container";
import { HalfButton } from "../components/common/Button";
import { InfoForm } from "../components/store/PartnershipStyle";

const PartnershipView = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const getPartnershipInfo = async () => {
    try {
      const { data } = await customAxios.get(
        `/owner/partnership/info?storeId=${state.storeId}&partnershipId=${state.partnershipId}`
      );

      setData(data.data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartnershipInfo();
  }, []);

  const onRejected = async () => {
    try {
      await customAxios.post(
        `/owner/partnership/reject?storeId=${state.storeId}&partnershipId=${state.partnershipId}`
      );

      alert("협약 요청이 거절되었습니다.");
      navigate(`/partnershipList?storeId=${state.storeId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onApproved = async () => {
    try {
      await customAxios.post(
        `/owner/partnership/approve?storeId=${state.storeId}&partnershipId=${state.partnershipId}`
      );

      alert("제휴 맺기가 성공적으로 처리되었습니다.");
      navigate(`/partnershipList?storeId=${state.storeId}`);
    } catch (e) {
      console.log(e);
    }
  };

  // 날짜 앞에 0 붙이기
  function addZero(date) {
    if (date < 10) {
      const zeroDate = ("00" + date).slice(-2);
      return zeroDate;
    }
    return date;
  }

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header text="협약 내용" back={true}></Header>
      <Container>
        <div
          style={{ boxSizing: "border-box", width: "375px", padding: "24px" }}
        >
          <p style={{ width: "327px", margin: "32px 0", fontSize: "19px" }}>
            협력형 제휴 내용
          </p>
          <InfoForm>
            <table>
              <tbody>
                <tr>
                  <td>제휴 가게:</td>
                  <td>{data.storeNames.join(", ")}</td>
                </tr>
                <tr>
                  <td>제휴 기간:</td>
                  <td>
                    {data.startDate.map((date) => addZero(date)).join("/")} ~{" "}
                    {data.finishDate.map((date) => addZero(date)).join("/")}
                  </td>
                </tr>
                <tr>
                  <td>제휴 내용:</td>
                  <td style={{ fontSize: "12px", color: "#868585" }}>
                    {data.content}
                  </td>
                </tr>
              </tbody>
            </table>
          </InfoForm>
          {data.partnershipState === "WAITING" && data.sentByMe === false ? (
            <div
              style={{ width: "327px", margin: "0 auto", marginTop: "16px" }}
            >
              <SpaceBetweenContainer>
                <HalfButton
                  type="button"
                  onClick={onRejected}
                  backgroundColor="#ff6767"
                >
                  거절
                </HalfButton>
                <HalfButton
                  type="submit"
                  onClick={onApproved}
                  backgroundColor="#386ffe"
                >
                  수락
                </HalfButton>
              </SpaceBetweenContainer>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default PartnershipView;
