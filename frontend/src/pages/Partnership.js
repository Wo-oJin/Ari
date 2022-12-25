import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "./customAxios";
import { IoIosArrowForward } from "react-icons/io";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { Container } from "../components/common/Container";
import TextEllipsis from "../components/common/TextEllipsis";
import { BigIntro } from "../components/common/Intro";
import { StoreButton } from "../components/common/Button";
import { CustomContainer } from "../components/store/PartnershipStyle";
import { Logo2 } from "../components/common/Logo";

const Partnership = () => {
  const [fromStores, setFromStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 협약 신청자의 가게 리스트 받아오기
  const getFromStoreList = async () => {
    try {
      const { data } = await customAxios.get("/owner/partnership/store-list");

      setFromStores(data.data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFromStoreList();
  }, []);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header text="협약 요청 목록" back={true}></Header>
      <Container>
        <CustomContainer>
          <Logo2 />
          <BigIntro marginBottom="16px">어떤 가게로</BigIntro>
          <BigIntro marginBottom="55px">확인하시나요?</BigIntro>
          {fromStores.map((store, index) => {
            return (
              <StoreButton
                key={index}
                onClick={() =>
                  navigate(`/partnershipList?storeId=${store.storeId}`)
                }
              >
                <TextEllipsis maxWidth="214px">{store.storeName}</TextEllipsis>
                <IoIosArrowForward
                  color="#FAFAFA"
                  size="26"
                  style={{ margin: "0 3px 0 13px" }}
                />
              </StoreButton>
            );
          })}
        </CustomContainer>
      </Container>
    </>
  );
};

export default Partnership;
