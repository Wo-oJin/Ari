import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log(e.target.getAttribute("data-key"));
    navigate(`/notice/${e.target.getAttribute("data-key")}`);
  };
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <div className="noticeContainer">
        <div className="noticeBanner"></div>
        <div className="noticeArticlesContainer">
          {testData.map((item, index) => {
            return (
              <div className="noticeArticle">
                <span
                  className="noticeTitle"
                  onClick={onClick}
                  data-key={index}
                >
                  {item.title}
                </span>
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
