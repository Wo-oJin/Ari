import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "./BoardListView.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
const BoardListView = () => {
  const [imageURL, setImageUrl] = useState([]);
  const [load, setLoad] = useState(true);
  const [data, setData] = useState();
  const { articleId } = useParams();
  let isLiked = true;
  let authority = true;
  const getBoardData = async () => {
    axios.get(`/board/list/${articleId}`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    console.log(articleId);
    setLoad(true);
    getBoardData();
    setLoad(false);
    console.log(data);
  }, []);

  const onLikeClick = () => {
    isLiked = !isLiked;
  };
  //아직 데이터가 들어오기 전이면 로딩 중 출력
  if (!data) {
    return <h1>로딩 중...</h1>;
  } else {
    return (
      <>
        <Header text={"제휴 맺기 게시판"} back={true}></Header>
        <div className="viewContainer">
          <img
            className="viewImg"
            alt="img"
            src={`data:image/jpg;base64, ${data.images[0]}`}
          ></img>
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

              <span className="content">{data.content}</span>
            </div>
            <div className="viewContentFooter">
              <div className="likeContainer">
                {isLiked ? (
                  <button className="UnLikeBtn" onClick={onLikeClick}>
                    <FcLike size={"1.8em"}></FcLike>
                  </button>
                ) : (
                  <button className="LikeBtn" onClick={onLikeClick}>
                    <FcLikePlaceholder size={"1.8em"}></FcLikePlaceholder>
                  </button>
                )}
              </div>
              <div className="periodContainer">
                <span className="label">제휴 기간</span>
                <span className="period">{data.period}</span>
              </div>
              <button className="chatBtn">채팅하기</button>
            </div>
            {authority ? (
              <div className="btnBox">
                <button className="modifyBtn">수정</button>
                <button className="deleteBtn">삭제</button>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
};

export default BoardListView;
