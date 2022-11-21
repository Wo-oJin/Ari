import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../components/Header";
import { authState } from "../state";
import { customAxios } from "./customAxios";
import "./Notice.css";
import Loading from "../components/Loading";

const Notice = () => {
  const [data, setData] = useState();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  useEffect(() => {
    customAxios.get("/notice").then((res) => {
      setData(res.data);
    });
  }, []);

  const onClick = (e) => {
    navigate(`/notice/${e.target.getAttribute("data-key")}`);
  };

  const moveToWrite = () => {
    navigate("/notice/write");
  };
  if (!data) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        <Header text="공지사항" back={true}></Header>
        <div className="noticeContainer">
          <div className="noticeBanner"></div>
          <div className="noticeArticlesContainer">
            {data &&
              data.map((item, index) => {
                return (
                  <div className="noticeArticle" key={index}>
                    <span
                      className="noticeTitle"
                      onClick={onClick}
                      data-key={item.id}
                    >
                      {item.title}
                    </span>
                    <span className="noticeDate">{item.createDate}</span>
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
  }
};

export default Notice;
