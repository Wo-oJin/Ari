import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import timeConverter from "../util/timeConverter";
import { customAxios } from "./customAxios";

const UserHistory = () => {
  const [data, setData] = useState();
  useEffect(() => {
    customAxios.get("/member/history").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);
  if (!data) {
    return <Loading></Loading>;
  } else {
    return (
      <>
        <Header text={"가게 사용 내역"} back={true}></Header>
        <div className="userHistoryContainer">
          {data.map((item) => {
            <div className="userHistoryItemBox">
              <span className="userHistoryDate">
                {timeConverter(item.visitTime)}
              </span>
              <div className="userHistoryItem">
                <span className="userHistoryStoreName">미스터쉐프</span>
                <span className="userHistoryEvent">
                  콜라 무료로드려오욘ㅇㅁ옴ㄴ옴ㄴ오노
                </span>
              </div>
            </div>;
          })}
        </div>
      </>
    );
  }
};

export default UserHistory;
