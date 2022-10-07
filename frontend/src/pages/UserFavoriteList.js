import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "../pages/StoreFavoriteList.css";
import { customAxios } from "./customAxios";
import Loading from "../components/Loading";

const UserFavoriteList = () => {
  const [likeStores, setLikeStores] = useState([]); // 객체를 요소로 갖는 배열
  const [isLoaded, setIsLoaded] = useState(false);

  // 페이지 처음 렌더링될 때 찜한 가게 리스트 받아오기
  useEffect(() => {
    const initialFavoriteStore = async () => {
      try {
        await customAxios.get("/member/like").then((res) => {
          setLikeStores(res.data.data);
          setIsLoaded(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    initialFavoriteStore();
  }, []);

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <Header text="찜 목록" back={true}></Header>
        <div className="fav-container">
          {likeStores.length === 0 ? (
            <p style={{ color: "#4E514F", marginTop: "100px" }}>
              아직 찜 목록이 없습니다.
            </p>
          ) : (
            likeStores.map((item, index) => {
              return (
                <div key={index}>
                  <Link to={`/detail/${item.storeId}`}>
                    <div className="fav-list-box">
                      <img
                        className="fav-store-img"
                        alt=""
                        src={`data:image/;base64,${item.image}`}
                      ></img>
                      <div className="text-ellipsis">
                        <p className="fav-store-name">{item.name}</p>
                        <span className="fav-store-address">
                          {item.address}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }
};

export default UserFavoriteList;
