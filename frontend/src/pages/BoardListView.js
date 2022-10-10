import { customAxios } from "./customAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import "../components/MainPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BoardListView.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import ConvertDate from "../components/ConvertDate";

const BoardListView = () => {
  const navigate = useNavigate();
  //좋아요 유무를 확인하기 위한 변수
  const [isFavorited, setIsfavorited] = useState(false);
  //작성자 확인을 위한 변수
  const [authority, setAuthority] = useState(false);
  //서버로부터 받아오는 게시물 데이터를 위한 변수
  const [data, setData] = useState();
  //게시글 id
  const { articleId } = useParams();
  //삭제 팝업 확인을 위한 변수
  const [isDeletePopUpOpend, setIsDeletePopUpOpend] = useState(false);

  const [convertDate, setConvertDate] = useState("");

  const getBoardData = async () => {
    customAxios.get(`/board/list/${articleId}`).then((response) => {
      console.log(response.data);
      setData(response.data);
      setIsfavorited(response.data.favorite);
      setAuthority(response.data.authority);
      setConvertDate(ConvertDate(response.data.createDate));
      console.log("asdasdsd", convertDate);
    });
  };

  useEffect(() => {
    getBoardData();
  }, []);

  //찜 버튼 클릭 함수
  const onLikeClick = async () => {
    await customAxios
      .post(`/board/favorite/toggle?articleId=${data.articleId}`)
      .then((res) => {
        setIsfavorited(!isFavorited);
        console.log("찜 성공");
      });
  };

  //수정 버튼 클릭 함수
  const modifyHandler = () => {
    navigate(`/board/update/${articleId}`);
  };

  //삭제 버튼 클릭시 팝업 토글 함수
  const togglePopUp = () => {
    setIsDeletePopUpOpend(!isDeletePopUpOpend);
  };

  //게시글 삭제 함수
  const deleteHandler = async () => {
    await customAxios.delete(`/board/delete/${articleId}`).then((res) => {
      alert("삭제되었습니다.");
    });
    //팝업 닫기
    setIsDeletePopUpOpend(!isDeletePopUpOpend);
    //뒤로 이동
    navigate(-1);
  };

  // react-slick 캐러셀 설정
  const settings = {
    infinite: true, // 무한 캐러셀
    speed: 500, // 다음 컨텐츠 까지의 속도
    slidesToShow: 1, // 화면에 보이는 컨텐츠 수
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    autoplay: false, // 자동 캐러셀
    autoplaySpeed: 3000, // 자동 캐러셀 속도
    draggable: true, // 드래그
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
  };

  //아직 데이터가 들어오기 전이면 로딩 중 출력
  if (!data) {
    return <h1>로딩 중...</h1>;
  } else {
    return (
      <>
        <Header text={"제휴 맺기 게시판"} back={true}></Header>
        <div className="viewContainer">
          <div className="viewContentBox">
            <Slider {...settings}>
              {data.images.map((item, index) => {
                return (
                  <div className="viewImgContainer" key={index}>
                    <img
                      className="viewImg"
                      alt=""
                      src={`data:image/;base64,${item}`}
                    ></img>
                  </div>
                );
              })}
            </Slider>
            <div className="viewContentHeader">
              <span className="author">{data.author}</span>
              <span className="location">{data.location}</span>
            </div>
            <div className="viewContentMiddle">
              <div className="viewContentTop">
                <span className="title">{data.title}</span>
                <span className="writeDate">{convertDate}</span>
              </div>

              <span className="content">{data.content}</span>
            </div>
            <div className="viewContentFooter">
              <div className="likeContainer">
                {isFavorited ? (
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
              <button
                className="chatBtn"
                onClick={() =>
                  navigate("/partnershipWrite", {
                    state: { articleId: articleId, storeId: data.storeId },
                  })
                }
              >
                협약 신청
              </button>
            </div>
            {authority ? (
              <div className="btnBox">
                <button className="modifyBtn" onClick={modifyHandler}>
                  수정
                </button>
                <button className="deleteBtn" onClick={togglePopUp}>
                  삭제
                </button>
              </div>
            ) : null}
          </div>
          {authority && isDeletePopUpOpend ? (
            <div className="deletePopUp">
              <span>삭제하시겠습니까?</span>
              <div className="popUpBtnBox">
                <button className="popUpCancleBtn" onClick={togglePopUp}>
                  취소
                </button>
                <button className="popUpDeleteBtn" onClick={deleteHandler}>
                  삭제
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
};

export default BoardListView;
