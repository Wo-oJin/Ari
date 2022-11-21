import React, { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./StoreModal.css";
const StoreModal = ({
  data,
  isModalOpend,

  setIsmModalOpened,
}) => {
  //영역 바깥을 클릭하면 모달창이 꺼지도록 모달 컴포넌트를 ref로 지정
  const modalRef = useRef();

  useEffect(() => {
    //컴포넌트가 생성된 시점에 mousedown이벤트를 추가하고 clickModalOutside 호출
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      //컴포넌트가 소멸된 시점에 mousedown이벤트를 삭제
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  //모달 바깥을 클릭하면 모달창과 인포박스를 끄기
  const clickModalOutside = (event) => {
    if (modalRef && !modalRef.current.contains(event.target)) {
      setIsmModalOpened(false);
    }
  };

  return (
    <Link to={`/detail/${data.storeId}`}>
      <div
        className="StoreModal SlideAnimation"
        ref={modalRef}
        value={isModalOpend}
      >
        <img
          className="StoreImg"
          src={`data:image/jpg;base64, ${data.image}`}
          width={"100%"}
          alt="images"
        ></img>
        <div className="StoreModalContent">
          <span className="StoreModalTitle">{data.name}</span>
          <div className="StoreModalLabels">
            <>
              {data.partnersName.length > 0 ? (
                <span className="Label">
                  {data.partnersName[0]} +{data.partnersName.length} 제휴 중
                </span>
              ) : null}
            </>
            <>
              {data.private_event ? (
                <span className="Label">이벤트 중</span>
              ) : null}
            </>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreModal;
