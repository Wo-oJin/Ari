import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "./BoardListView.css";
const BoardListView = () => {
  const [load, setLoad] = useState();
  const [data, setData] = useState();
  const { articleId } = useParams();
  useEffect(() => {
    console.log(articleId);
    setLoad(true);
    const getDetailData = async () => {
      axios.get(`/board/list/${articleId}`).then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoad(false);
      });
    };
    getDetailData();
    console.log(data);
  }, [articleId]);

  if (load) {
    return <h1>로딩 중...</h1>;
  }
  return (
    <>
      <Header text={"제휴 맺기 게시판"}></Header>
      <div className="viewContainer">
        <img className="viewImg" alt="img"></img>
        <div className="viewContentBox">
          <div className="viewContentHeader">
            <span className="author">{data.author}</span>
            <span className="location">어쩌구 저쩌구</span>
          </div>
          <div className="viewContentMiddle">
            <div className="viewContentTop">
              <span className="title">{data.title}</span>
              <span className="writeDate">{data.createDate}</span>
            </div>

            <span className="content"></span>
          </div>
          <div className="viewContentFooter">
            <div className="likeContainer"></div>
            <div className="periodContainer">
              <span className="label">제휴 기간</span>{" "}
              <span className="period"></span>
            </div>
            <button className="chatBtn">채팅하기</button>
          </div>
          <div className="btnBox">
            <button className="modifyBtn">수정</button>
            <button className="deleteBtn">삭제</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardListView;
