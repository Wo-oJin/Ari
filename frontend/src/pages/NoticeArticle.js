import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { authState } from "../state";
import { customAxios } from "./customAxios";
import { NoticeWriteBtnBox } from "../components/notice/NoticeWriteStyle";
import {
  NoticeArticleContainer,
  NoticeArticleHeader,
  NoticeArticleTitle,
  NoticeArticleDate,
  NoticeArticleContent,
  NoticeArticleText,
  NoticeModifyBtn,
  NoticedeleteBtn,
} from "../components/notice/NoticeArticleStyle";

const NoticeArticle = () => {
  const [data, setData] = useState();
  const { articleId } = useParams();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get(`/notice/${articleId}`).then((res) => {
      setData(res.data);
    });
  }, []);

  const onClick = () => {
    navigate(`/notice/modify/${articleId}`);
  };
  const onClickDelete = () => {
    customAxios.delete(`/admin/notice/${articleId}`).then((res) => {
      if (res.data.result === "success") {
        window.alert(res.data.massage);
        navigate("/notice");
      }
    });
  };
  if (!data) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        <Header text="공지사항" back={true}></Header>
        <NoticeArticleContainer>
          <NoticeArticleHeader>
            <NoticeArticleTitle>{data.title}</NoticeArticleTitle>
            <NoticeArticleDate>{data.createDate}</NoticeArticleDate>
          </NoticeArticleHeader>
          <NoticeArticleContent>
            <NoticeArticleText>{data.content}</NoticeArticleText>
          </NoticeArticleContent>
        </NoticeArticleContainer>
        {auth === 3 && (
          <NoticeWriteBtnBox>
            <NoticeModifyBtn onClick={onClick}>수정</NoticeModifyBtn>
            <NoticedeleteBtn onClick={onClickDelete}>삭제</NoticedeleteBtn>
          </NoticeWriteBtnBox>
        )}
      </>
    );
  }
};

export default NoticeArticle;
