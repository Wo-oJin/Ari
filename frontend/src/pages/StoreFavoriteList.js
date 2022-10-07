import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "../pages/StoreFavoriteList.css";
import { customAxios } from "./customAxios";

const StoreFavoriteList = () => {
  const [likeStores, setLikeStores] = useState([]);
  const [likeArticles, setLikeArticles] = useState([]);
  const [isLoadedStores, setIsLoadedStores] = useState(false);
  const [isLoadedArticles, setIsLoadedArticles] = useState(false);

  // 페이지 처음 렌더링될 때 찜한 가게 리스트 받아오기
  useEffect(() => {
    const initialFavoriteStore = async () => {
      try {
        await customAxios.get("/member/like").then((res) => {
          setLikeStores(res.data.data);
          setIsLoadedStores(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    initialFavoriteStore();

    const initialFavoriteArticle = async () => {
      try {
        await customAxios.get("/board/like").then((res) => {
          setLikeArticles(res.data.data);
          setIsLoadedArticles(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    initialFavoriteArticle();
  }, []);

  if (!(isLoadedStores && isLoadedArticles)) {
    return <Loading />;
  } else {
    return (
      <>
        <Header text="찜 목록" back={true}></Header>
        <div className="fav-container">
          {likeStores.length === 0 ? (
            <p style={{ color: "#4E514F", margin: "100px 0" }}>
              아직 찜한 가게가 없습니다.
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
          <div
            style={{
              width: "300px",
              height: "1px",
              backgroundColor: "#DCDCDC",
              borderRadius: "5px",
              margin: "50px 0",
            }}
          ></div>
          {likeArticles.length === 0 ? (
            <p style={{ color: "#4E514F", margin: "100px 0" }}>
              아직 좋아요를 누른 게시글이 없습니다.
            </p>
          ) : (
            likeArticles.map((item, index) => {
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

export default StoreFavoriteList;
