import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../components/Header";
import { authState } from "../state";
import { customAxios } from "./customAxios";
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
  const [data, setData] = useState();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  useEffect(() => {
    customAxios.get("/admin/notice").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const onClick = (e) => {
    console.log(e.target.getAttribute("data-key"));
    navigate(`/notice/${e.target.getAttribute("data-key")}`);
  };

  const moveToWrite = () => {
    navigate("/notice/write");
  };
  return (
    <>
      <Header text="공지사항" back={true}></Header>
      <div className="noticeContainer">
        <div className="noticeBanner"></div>
        <div className="noticeArticlesContainer">
          {testData.map((item, index) => {
            return (
              <div className="noticeArticle" key={index}>
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
        {auth === 3 && (
          <div className="btnContainer">
            <button className="noticeWriteBtn" onClick={moveToWrite}>
              글쓰기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Notice;
