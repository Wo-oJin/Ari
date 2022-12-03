import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useRecoilState } from "recoil";
import { nameState } from "../state";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";
import { IoIosArrowForward } from "react-icons/io";
import {
  Container,
  SpaceBetweenContainer,
} from "../components/common/Container";
import {
  WelcomeCard,
  MainInfo,
  MidCard,
  SubInfo,
  NewItem,
} from "../components/store/MyPageOwnerStyle";

const MyPageOwner = () => {
  const [name, setName] = useRecoilState(nameState);
  const [coopEventNum, setCoopEventNum] = useState(0);
  const [privateEventNum, setPrivateEventNum] = useState(0);
  const [isNewPartnership, setIsNewPartnership] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialEventNum = async () => {
    try {
      const { data } = await customAxios.get("/owner/event-num");

      setCoopEventNum(data.data[0]);
      setPrivateEventNum(data.data[1]);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const checkNewPartnership = async () => {
    try {
      const { data } = await customAxios.get(
        "/owner/partnership/check/new-request"
      );

      setIsNewPartnership(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkNewPartnership();
    initialEventNum();
  }, []);

  const menu = [
    { title: "내 가게 정보 수정", url: "/storeInfoEdit" },
    { title: "개인 이벤트 등록", url: "/storePrivateEventList" },
    { title: "찜 목록", url: "/storeFavoriteList" },
    {
      title: "협약 요청 목록 ",
      url: "/partnership",
      isNew: isNewPartnership,
    },
    { title: "사장님 단체 채팅방", url: "/public/chat" },
  ];

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header text="마이페이지" back={true} url="/"></Header>
      <Container>
        <WelcomeCard>
          <div style={{ marginLeft: "30px" }}>
            <p
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginTop: "0",
                marginBottom: "9px",
              }}
            >
              {name}
            </p>
            <span style={{ fontSize: "18px" }}>사장님 안녕하세요!</span>
          </div>
        </WelcomeCard>
        <SpaceBetweenContainer width="327px">
          <div style={{ margin: "24px 0" }}>
            <Link to="/partnership">
              <MainInfo>
                <div style={{ textAlign: "center" }}>
                  <MidCard>협력형 제휴</MidCard>
                  <span style={{ fontSize: "20px" }}>{coopEventNum}</span>
                </div>
              </MainInfo>
            </Link>
          </div>
          <div style={{ margin: "24px 0" }}>
            <Link to="/storePrivateEventList">
              <MainInfo>
                <div style={{ textAlign: "center" }}>
                  <MidCard>개인 이벤트</MidCard>
                  <span style={{ fontSize: "20px" }}>{privateEventNum}</span>
                </div>
              </MainInfo>
            </Link>
          </div>
        </SpaceBetweenContainer>
        {menu.map((item, index) => {
          return (
            <div style={{ marginBottom: "12px" }} key={index}>
              <Link to={item.url}>
                <SubInfo>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginLeft: "28px" }}>{item.title}</p>
                    {item.isNew === true ? <NewItem>new</NewItem> : null}
                  </div>
                  <IoIosArrowForward
                    color="#959595"
                    size="20"
                    style={{ marginRight: "20px" }}
                  />
                </SubInfo>
              </Link>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default MyPageOwner;
