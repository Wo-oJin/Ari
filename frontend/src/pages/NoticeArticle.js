import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../components/Header";
import { authState } from "../state";
import "./NoticeArticle.css";
import "./NoticeWrite.css";

const NoticeArticle = () => {
  const { articleId } = useParams();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const testAuth = 3;
  const onClick = () => {
    console.log(articleId);
    navigate(`/notice/modify/${articleId}`);
  };
  const onClickDelete = () => {
    console.log(articleId, "삭제");
  };
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <div className="noticeArticleContainer">
        <div className="noticeArticleHeader">
          <span className="noticeArticleTitle">첫 번째 공지사항입니다.</span>
          <span className="noticeArticleDate">2022.10.31</span>
        </div>
        <div className="noticeArticleContent">
          <span className="noticleArticleText">
            안녕하세요 첫 번째 공지사항 글입니다. 안녕하세요 첫 번째 공지사항
            글입니다. 안녕하세요 첫 번째 공지사항 글입니다. 안녕하세요 첫 번째
            공지사항 글입니다. 안녕하세요 첫 번째 공지사항 글입니다. 안녕하세요
            첫 번째 공지사항 글입니다. 안녕하세요 첫 번째 공지사항
            글입니다.안녕하세요 첫 번째 공지사항 글입니다.안녕하세요 첫 번째
            공지사항 글입니다.안녕하세요 첫 번째 공지사항 글입니다.
          </span>
        </div>
      </div>
      {testAuth === 3 && (
        <div className="noticeWriteBtnBox">
          <button className="noticeModifyBtn" onClick={onClick}>
            수정
          </button>
          <button className="noticedeleteBtn" onClick={onClickDelete}>
            삭제
          </button>
        </div>
      )}
    </>
  );
};

export default NoticeArticle;
