import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Container,
  WriteHeader,
  TitleTag,
  ContentTag,
  TitleInput,
  ContentBox,
  ContentInput,
  BtnBox,
  CompleteBtn,
} from "../components/notice/NoticeWriteStyle";

const NoticeWrite = () => {
  //기능 완성 후 관리자 권한 확인 필요함
  const [title, setTitle] = useState();
  const [context, setContext] = useState();
  const navigate = useNavigate();
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContext = (e) => {
    setContext(e.target.value);
  };
  const onClick = () => {
    //여기서 axios 전송
    axios
      .post("/admin/notice", {
        content: context,
        createDate: Date.now(),
        title: title,
      })
      .then((res) => {
        if (res.data.result === "success") {
          window.alert(res.data.massage);
          navigate("/notice");
        } else {
          window.alert("일시적인 오류가 발생했습니다.");
          navigate("/notice");
        }
      });
  };
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <Container>
        <WriteHeader>
          <TitleTag>공지 제목</TitleTag>
          <TitleInput
            placeholder="제목을 입력해주세요"
            value={title || ""}
            onChange={onChangeTitle}
          />
        </WriteHeader>
        <ContentBox>
          <ContentTag>공지 내용</ContentTag>
          <ContentInput
            placeholder="내용을 입력해주세요."
            value={context || ""}
            onChange={onChangeContext}
          />
        </ContentBox>
      </Container>
      <BtnBox>
        <CompleteBtn onClick={onClick}>작성 완료</CompleteBtn>
      </BtnBox>
    </>
  );
};

export default NoticeWrite;
