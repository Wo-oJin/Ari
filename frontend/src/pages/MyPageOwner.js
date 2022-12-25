import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useRecoilState } from "recoil";
import { nameState } from "../state";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";
import { Container } from "../components/common/Container";
import {
  WelcomeCard,
  MidCard,
  SubInfo,
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
        <WelcomeCard name={name} />
        <MidCard
          coopEventNum={coopEventNum}
          privateEventNum={privateEventNum}
        />
        {menu.map((item, index) => {
          return (
            <div style={{ marginBottom: "12px" }} key={index}>
              <Link to={item.url}>
                <SubInfo title={item.title} isNew={item.isNew} />
              </Link>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default MyPageOwner;
