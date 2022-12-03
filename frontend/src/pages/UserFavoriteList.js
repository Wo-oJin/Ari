import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { customAxios } from "./customAxios";
import { Container } from "../components/common/Container";
import ListBox from "../components/common/FavoriteList";

const UserFavoriteList = () => {
  const [likeStores, setLikeStores] = useState([]); // 객체를 요소로 갖는 배열
  const [isLoading, setIsLoading] = useState(false);

  const initialFavoriteStore = async () => {
    try {
      const { data } = await customAxios.get("/member/like");

      setLikeStores(data.data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 페이지 처음 렌더링될 때 찜한 가게 리스트 받아오기
  useEffect(() => {
    initialFavoriteStore();
  }, []);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header text="찜 목록" back={true}></Header>
      <Container>
        {likeStores.length === 0 ? (
          <p style={{ color: "#4E514F", marginTop: "100px" }}>
            아직 찜 목록이 없습니다.
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
      </Container>
    </>
  );
};

export default UserFavoriteList;
