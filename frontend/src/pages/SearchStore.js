import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "./Category.css";
import { customAxios } from "./customAxios";

const SearchStore = () => {
  const params = new URL(window.location.href).searchParams;
  const keyword = params.get("keyword");
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await customAxios.get(`/map/find?keyword=${keyword}`);
      setSearchData(data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (!loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Header text={"제휴 정보"} back={true}></Header>
        <div className="storeContainer">
          <p style={{ width: "335px", margin: "20px 0", fontSize: "16px" }}>
            검색 결과&#40;{searchData.length}&#41;
          </p>
          {searchData.length === 0
            ? null
            : searchData.map((item, index) => {
                return (
                  <Link to={`/detail/${item.storeId}`} key={index}>
                    <div
                      className="storeItem"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(50,50,50,10) 100%), url(data:image/gif;base64,${item.storeImage})`,
                      }}
                    >
                      <div className="ctContentBox">
                        <span className="ctContentName">{item.storeName}</span>
                        <span className="ctContentInfo">
                          {item.eventContent}
                        </span>
                        <span className="ctContentPeriod">
                          {item.eventPeriod}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </>
    );
  }
};

export default SearchStore;
