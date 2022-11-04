import Header from "../components/Header";
import "./NoticeWrite.css";

const NoticeWrite = () => {
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <div className="noticeWriteContainer">
        <div className="noticeWriteHeader">
          <span className="noticeTitleTag">공지 제목</span>
          <input
            className="noticeTitleInput"
            placeholder="제목을 입력해주세요"
          ></input>
        </div>
        <div className="noticeWriteContentBox">
          <span className="noticeWriteContentTag">공지 내용</span>
          <textarea
            className="noticeWriteContentInput"
            placeholder="내용을 입력해주세요."
          ></textarea>
        </div>
      </div>
      <div className="noticeWriteBtnBox">
        <button className="noticeWriteCompleteBtn">작성 완료</button>
      </div>
    </>
  );
};

export default NoticeWrite;
