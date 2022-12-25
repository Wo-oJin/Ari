import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { authState } from "../state";
import { customAxios } from "./customAxios";
import { BtnBox } from "../components/notice/NoticeWriteStyle";
import {
  Article,
  ModifyBtn,
  DeleteBtn,
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
        <Article
          title={data.title}
          createDate={data.createDate}
          content={data.content}
        />
        {auth === 3 && (
          <BtnBox>
            <ModifyBtn onClick={onClick}>수정</ModifyBtn>
            <DeleteBtn onClick={onClickDelete}>삭제</DeleteBtn>
          </BtnBox>
        )}
      </>
    );
  }
};

export default NoticeArticle;
