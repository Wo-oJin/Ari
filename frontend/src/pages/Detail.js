import "./Detail.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import { DetailCoopTap, PrivateEventTap } from "../components/DatailTap";

const testData = {
  storeList: [
    {
      id: 1,
      name: "미스터쉐프",
      owner_name: "우영우",
      address: "경기 수원시 팔달구 아주로 47번길 16",
      phoneNumber: "010-1234-5678",
      private_event: true,
      stamp: false,
      partnershipList: [
        {
          partnership_id: 1,
          partnerName: "아맛집",
          partnerLocation: "경기 수원시 팔달구 아주로 47번길 16",
          info: [
            "아맛집에서 10000원 이상 구매 시 전 메뉴 500원 할인",
            "아맛집에서 5000원 이상 구매 시 전 메뉴 100원 할인",
          ],
        },
      ],
      eventList: [
        {
          id: 1,
          info: ["미스터쉐프 할인 행사1", "미스터쉐프 할인 행사2"],
          start: "2022-08-01",
          finish: "2022-09-01",
        },
      ],
    },
  ],
};
const Detail = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchingData = async () => {
      await setData(testData);
    };
    fetchingData();
  }, []);
  console.log(data);
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
        return <DetailCoopTap />;
      case "1":
        return <PrivateEventTap />;
      case "2":
        return <div>3</div>;
    }
  };
  return (
    <div className="DetailContainer">
      <div className="Wrapper">
        <img src="../images/detail.png"></img>
      </div>
      <div className="DetailContentModal">
        <span className="ContentTitle">미스터쉐프</span>
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
          {testData.storeList[0].partnershipList.length > 0 ? (
            <span className="Label">
              {testData.storeList[0].partnershipList[0].partnerName} +제휴 중
            </span>
          ) : null}
          {testData.storeList[0].private_event ? <span>이벤트 중</span> : null}
          {testData.storeList[0].stamp ? <span>스탬프 가능</span> : null}
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
        {SwitchTap(tapIndex, testData)}
      </div>
    </div>
  );
};

export default Detail;
