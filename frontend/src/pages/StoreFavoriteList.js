import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import "../pages/StoreFavoriteList.css";
import axios from 'axios';

const StoreFavoriteList = () => {
    const [likeStores, setLikeStores] = useState([]); // 객체를 요소로 갖는 배열
    const aaa = [];

    // 페이지 처음 렌더링될 때 찜한 가게 리스트 받아오기
    useEffect(() => {
        const initialFavoriteStore = async () => {
            try {
                await axios
                    .get("/member/like", {
                        headers: {
                          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    .then((res) => {
                        // console.log("res.data.data", res.data.data);
                        const dataArr = res.data.data;
                        console.log(dataArr);

                        // setLikeStores 배열의 각 가게 인덱스에 name, address, image 프로퍼티 할당
                        const asdasd = dataArr.map((item, key) => {
                            let likeStoreInfo = {
                                name: item.name,
                                address: item.address,
                                image: `data:image/;base64,${item.image}`,
                                storeId: item.storeId,
                            };
                            console.log(likeStoreInfo);
                            aaa.push(likeStoreInfo);
                        })
                        console.log("asda", aaa);
                        
                        // for (let i = 0; i < dataArr.length; i++) {
                        //     let likeStoreInfo = {
                        //         name: dataArr[i].name,
                        //         address: dataArr[i].address,
                        //         image: `data:image/;base64,${dataArr[i].image}`,
                        //         storeId: dataArr[i].storeId,
                        //     };
                          
                        //     setLikeStores(...likeStores , likeStoreInfo);
                        // }
                    });
            } catch (e) {
                console.log(e);
            }
        }
        initialFavoriteStore();
    }, []);
    if(!aaa) {
        return <h1>로딩 중</h1>
    }else {
        return (
            <>
                <Header text="찜 목록" link="/myPageOwner"></Header>
                <div className="fav-container">
                    {!aaa && aaa.length === 0 ? <p style={{color: "#4E514F", marginTop: "100px"}}>아직 찜 목록이 없습니다.</p>
                    : aaa.map((item, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/detail/${item.storeId}`}>
                                    <div className="fav-list-box">
                                        <img className="fav-store-img" alt="" src={item.image}></img>
                                        <div>
                                            <p className="fav-store-name">{item.name}</p>
                                            <span className="fav-store-address">{item.address}</span>
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
   
    
}

export default StoreFavoriteList;