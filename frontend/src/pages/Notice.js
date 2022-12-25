import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../components/Header";
import { authState } from "../state";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";
import {
  Container,
  Banner,
  ArticlesContainer,
  Article,
  Title,
  Date,
  BtnContainer,
  WriteBtn,
} from "../components/notice/NoticeStyle";

const Notice = () => {
  const [data, setData] = useState();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  useEffect(() => {
    customAxios.get("/notice").then((res) => {
      setData(res.data);
    });
  }, []);

  const onClick = (e) => {
    navigate(`/notice/${e.target.getAttribute("data-key")}`);
  };

  const moveToWrite = () => {
    navigate("/notice/write");
  };
  if (!data) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        <Header text="공지사항" back={true}></Header>
        <Container>
          <Banner
            onClick={() => {
              window.open(
                "https://sky-drive-16d.notion.site/ARI-94ad2e39504046a3ac11ee5fb2f33382",
                "_blank"
              );
            }}
          />
          <ArticlesContainer>
            {data &&
              data.map((item, index) => {
                return (
                  <Article key={index}>
                    <Title onClick={onClick} data-key={item.id}>
                      {item.title}
                    </Title>
                    <Date>{item.createDate}</Date>
                  </Article>
                );
              })}
          </ArticlesContainer>
          {auth === 3 && (
            <BtnContainer>
              <WriteBtn onClick={moveToWrite}>글쓰기</WriteBtn>
            </BtnContainer>
          )}
        </Container>
      </>
    );
  }
};

export default Notice;
