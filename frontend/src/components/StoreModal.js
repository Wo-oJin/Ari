import React from "react";
import "./StoreModal.css";
const StoreModal = ({ data }) => {
  console.log(data);
  return (
    <div className="StoreModal">
      <img className="StoreImg" src="../images/photo.png" width={"100%"}></img>
      <div className="StoreModalContent">
        <span className="StoreModalTitle">{data.title}</span>
        <div className="StoreModalLabels">
          <>
            {data.eventList[0][0] ? (
              <span className="Label">{data.eventList[0][1]} +제휴 중</span>
            ) : null}
          </>
          <>
            {data.eventList[1] ? (
              <span className="Label">이벤트 중</span>
            ) : null}
          </>
          <>
            {data.eventList[2] ? (
              <span className="Label">스탬프 가능</span>
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
