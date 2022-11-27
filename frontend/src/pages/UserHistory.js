import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import timeConverter from "../util/timeConverter";
import { customAxios } from "./customAxios";
import "./UserHistory.css";

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
            return (
              <>
                <div className="userHistoryItemBox">
                  <div className="visitTimeBox">
                    {" "}
                    <span className="userHistoryDate">
                      {item.visitTime.substr(0, 10)}
                    </span>
                    <span className="userHistoryTime">
                      {timeConverter(item.visitTime)}
                    </span>
                  </div>

                  <div className="userHistoryItem">
                    <span className="userHistoryStoreName">
                      {item.storeName}
                    </span>
                    <span className="userHistoryEvent">{item.eventInfo}</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
};

export default UserHistory;
