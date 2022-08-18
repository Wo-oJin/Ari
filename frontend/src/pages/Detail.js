import "./Detail.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import {
  DetailCoopTap,
  PrivateEventTap,
  StoreInfoTap,
} from "../components/DatailTap";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [data, setData] = useState(null);
  const { storeId } = useParams();
  console.log(storeId);
  useEffect(() => {
    const getDetailData = async () => {
      axios.get(`/map/store/${storeId}`).then((response) => {
        setData(response.data.storeList);
      });
    };
    getDetailData();
  }, []);
  console.log("in Detail ", data);
  //좋아요 유무를 확인하기 위한 테스트용 변수
  const [isLiked, setIsLiked] = useState(false);
  //클릭한 탭의 인덱스를 관리하기 위한 변수 선언
  const [tapIndex, setTapIndex] = useState("0");

  //좋아요 클릭 함수
  const onLikeClick = () => {
    setIsLiked(!isLiked);
  };
  //탭 클릭 함수
  const onTapClick = (e) => {
    setTapIndex(e.target.id);
  };
  //탭 인덱스에 따라 다른 내용을 보여주는 함수
  const SwitchTap = (i, data) => {
    switch (i) {
      case "0":
        return <DetailCoopTap data={data} />;
      case "1":
        return <PrivateEventTap data={data} />;
      case "2":
        return <StoreInfoTap data={data} />;
    }
  };
  if (data === null) {
    return <div>로딩 중</div>;
  }
  return (
    <div className="DetailContainer">
      <div className="Wrapper">
        <img src="../images/detail.png" alt="이미지"></img>
      </div>
      <div className="DetailContentModal">
        <span className="ContentTitle">{data[0].name}</span>
        <div key={0} className="LikeContainer">
          {isLiked ? (
            <button className="UnLikeBtn" onClick={onLikeClick}>
              <FcLike size={"1.2em"}></FcLike>
            </button>
          ) : (
            <button className="LikeBtn" onClick={onLikeClick}>
              <FcLikePlaceholder size={"1.2em"}></FcLikePlaceholder>
            </button>
          )}
          <span className="LikeText">찜 목록에 추가</span>
        </div>
        <div className="LabelContainer">
          {data[0].partners.length > 0 ? (
            <span className="Label">
              {data[0].partners[0].partnerName} +{data[0].partners.length} 제휴
              중
            </span>
          ) : null}
          {data[0].private_event ? <span>이벤트 중</span> : null}
          {data[0].stamp ? <span>스탬프 가능</span> : null}
        </div>
      </div>
      <div className="BottomContainer">
        <div className="SwitchTap">
          {tapIndex === "0" ? (
            <div id="0" className="TapBold" onClick={onTapClick}>
              함께하는 이벤트
            </div>
          ) : (
            <div id="0" className="Tap" onClick={onTapClick}>
              함께하는 이벤트
            </div>
          )}
          {tapIndex === "1" ? (
            <div id="1" className="TapBold" onClick={onTapClick}>
              개인 이벤트
            </div>
          ) : (
            <div id="1" className="Tap" onClick={onTapClick}>
              개인 이벤트
            </div>
          )}
          {tapIndex === "2" ? (
            <div id="2" className="TapBold" onClick={onTapClick}>
              가게 정보
            </div>
          ) : (
            <div id="2" className="Tap" onClick={onTapClick}>
              가게 정보
            </div>
          )}
        </div>
        {SwitchTap(tapIndex, data)}
      </div>
    </div>
  );
};

export default Detail;
