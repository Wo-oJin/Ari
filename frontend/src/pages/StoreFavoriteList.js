import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import "../pages/StoreFavoriteList.css";
import axios from 'axios';

const StoreFavoriteList = () => {
    const [likeStores, setLikeStores] = useState([]); // 객체를 요소로 갖는 배열

    // 페이지 처음 렌더링될 때 찜한 가게 리스트 받아오기
    useEffect(() => {
        const initialFavoriteStore = async () => {
            try {
                await axios
                    .get("/member/favorite_list", {
                        headers: {
                          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    .then((res) => {
                        // console.log("res.data.data", res.data.data);
                        const dataArr = res.data.data;

                        // setLikeStores 배열의 각 가게 인덱스에 name, address, image 프로퍼티 할당
                        for (let i = 0; i < dataArr.length; i++) {
                            let likeStoreInfo = {
                                name: dataArr[i].name,
                                address: dataArr[i].address,
                                image: `data:image/;base64,${dataArr[i].image}`,
                                storeId: dataArr[i].storeId,
                            };

                            setLikeStores([...likeStores, likeStoreInfo]);
                        }
                    });
            } catch (e) {
                console.log(e);
            }
        }
        initialFavoriteStore();
    }, []);

    return (
        <>
            <Header text="찜 목록" link="/myPageOwner"></Header>
            <div className="fav-container">
                {likeStores.length === 0 ? <p style={{color: "#4E514F", marginTop: "100px"}}>아직 찜 목록이 없습니다.</p>
                : likeStores.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/detail/${likeStores[index].storeId}`}>
                                <div className="fav-list-box">
                                    <img className="fav-store-img" alt="" src={likeStores[index].image}></img>
                                    <div>
                                        <p className="fav-store-name">{likeStores[index].name}</p>
                                        <span className="fav-store-address">{likeStores[index].address}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default StoreFavoriteList;