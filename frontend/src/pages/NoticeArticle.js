import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "./NoticeArticle.css";

const NoticeArticle = () => {
  const { articleId } = useParams();
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
    </>
  );
};

export default NoticeArticle;
