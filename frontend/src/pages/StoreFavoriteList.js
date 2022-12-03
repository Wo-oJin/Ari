import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { customAxios } from "./customAxios";
import { Container } from "../components/common/Container";
import ListBox, { Line } from "../components/common/FavoriteList";

const StoreFavoriteList = () => {
  const [likeStores, setLikeStores] = useState([]);
  const [likeArticles, setLikeArticles] = useState([]);
  const [isLoadedStores, setIsLoadedStores] = useState(false);
  const [isLoadedArticles, setIsLoadedArticles] = useState(false);

  const initialFavoriteStore = async () => {
    try {
      const { data } = await customAxios.get("/member/like");

      setLikeStores(data.data);
      setIsLoadedStores(true);
    } catch (e) {
      console.log(e);
    }
  };

  const initialFavoriteArticle = async () => {
    try {
      const { data } = await customAxios.get("/owner/board/like");

      setLikeArticles(data.data);
      setIsLoadedArticles(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 페이지 처음 렌더링될 때 찜한 가게 리스트 받아오기
  useEffect(() => {
    initialFavoriteStore();
    initialFavoriteArticle();
  }, []);

  if (!isLoadedStores || !isLoadedArticles) {
    return <Loading />;
  }

  return (
    <>
      <Header text="찜 목록" back={true}></Header>
      <Container marginTop="7px">
        {likeStores.length === 0 ? (
          <p style={{ color: "#4E514F", margin: "100px 0" }}>
            아직 찜한 가게가 없습니다.
          </p>
        ) : (
          likeStores.map((item, index) => {
            return (
              <div key={index}>
                <Link to={`/detail/${item.storeId}`}>
                  <ListBox
                    image={item.image}
                    name={item.name}
                    address={item.address}
                  ></ListBox>
                </Link>
              </div>
            );
          })
        )}
        <Line />
        {likeArticles.length === 0 ? (
          <p style={{ color: "#4E514F", margin: "100px 0" }}>
            아직 좋아요를 누른 게시글이 없습니다.
          </p>
        ) : (
          likeArticles.map((item, index) => {
            return (
              <div key={index}>
                <Link to={`/board/list/${item.articleId}`}>
                  <ListBox
                    image={item.image}
                    name={item.name}
                    address={item.address}
                  ></ListBox>
                </Link>
              </div>
            );
          })
        )}
      </Container>
    </>
  );
};

export default StoreFavoriteList;
