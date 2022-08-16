import "./DetailTap.css";
const DetailCoopTap = ({ testData }) => {
  console.log(testData);
  return (
    <div className="TapContainer">
      <div className="CoopStoreListContainer">
        <span>협력 중인 가게:</span>
        <div className="CoopStoreList">
          {testData.storeList[0].partnershipList.map((item) => {
            <span>{item.partnerName}</span>;
          })}
          <span>아주 맛있는 집</span>
          <span>맥도날드</span>
          <span>카리스마</span>
        </div>
      </div>
      <div className="EventContent">
        <span className="EventTitle">이벤트 내용:</span>
        <span className="EventSubText">
          여긴 아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다. 여긴
          아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다. 여긴
          아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다.여긴
          아주맛있는집과의 협력 이벤트 내용이 담겨있는 컨테이너입니다.
        </span>
      </div>
      <div className="StoreLocation">
        <span>위치 안내:</span> <div className="map"></div>
      </div>
    </div>
  );
};

export default DetailCoopTap;
