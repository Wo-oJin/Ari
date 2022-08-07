import React from "react";
import "./StoreModal.css";
const StoreModal = () => {
  return (
    <div className="StoreModal">
      <img src="../images/photo.png"></img>
      <div className="StoreModalContent">
        <span className="StoreModalTitle">미스터쉐프</span>
        <div className="StoreModalLabels">
          <span className="Label">아맛집+ 제휴 중</span>
          <span className="Label">이벤트 중</span>
          <span className="Label">스탬프 가능</span>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
