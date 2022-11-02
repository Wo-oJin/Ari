import Header from "../components/Header";
import "./Notice.css";

const testData = [
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
  {
    title: "첫 번쨰 공지사항입니다.",
    date: "2022/10/31",
  },
];

const Notice = () => {
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <div className="noticeContainer">
        <div className="noticeBanner"></div>
        <div className="noticeArticlesContainer">
          {testData.map((item, index) => {
            return (
              <div className="noticeArticle" key={index}>
                <span className="noticeTitle">{item.title}</span>
                <span className="noticeDate">{item.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notice;
