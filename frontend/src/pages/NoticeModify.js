import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "./NoticeWrite.css";

const NoticeModify = () => {
  const { articleId } = useParams();
  const [title, setTitle] = useState();
  const [context, setContext] = useState();
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContext = (e) => {
    setContext(e.target.value);
  };
  const onClick = () => {
    //여기서 axios 전송
    console.log(title, context);
  };
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <div className="noticeWriteContainer">
        <div className="noticeWriteHeader">
          <span className="noticeTitleTag">공지 제목</span>
          <input
            className="noticeTitleInput"
            placeholder="제목을 입력해주세요"
            value={title || ""}
            onChange={onChangeTitle}
          ></input>
        </div>
        <div className="noticeWriteContentBox">
          <span className="noticeWriteContentTag">공지 내용</span>
          <textarea
            className="noticeWriteContentInput"
            placeholder="내용을 입력해주세요."
            value={context || ""}
            onChange={onChangeContext}
          ></textarea>
        </div>
      </div>
      <div className="noticeWriteBtnBox">
        <button className="noticeWriteCompleteBtn" onClick={onClick}>
          작성 완료
        </button>
      </div>
    </>
  );
};

export default NoticeModify;
