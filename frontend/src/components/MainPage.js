import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiSearch } from "react-icons/fi";
import { customAxios } from "../pages/customAxios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import Cookies from "universal-cookie";
import axios from "axios";

const MainPage = ({ onClick }) => {
  const [count, setCount] = useState(0);
  const [storeList, setStoreList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const cookies = new Cookies();

  const navigate = useNavigate();

  // 토큰 갱신 요청
  const reissue = async () => {
    try {
      await axios
        .post("/auth/reissue", {
          accessToken: cookies.get("accessToken"),
          refreshToken: cookies.get("refreshToken"),
        })
        .then((res) => {
          console.log(res.data.massage);
          if (res.data.result === "fail") {
            // 토큰 갱신 실패
            // recoil persist로 저장된 변수 초기화
            setAuth(0);
            setName("");
            // cookie 지우기
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
          } else {
            // 토큰 갱신 성공
            const {
              accessToken,
              refreshToken,
              refreshTokenExpireIn,
              accessTokenExpireIn,
            } = res.data.data;

            // 쿠키 사용 설정
            axios.defaults.withCredentials = true;

            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정 : 모든 컴포넌트의 요청에서 전역으로 설정되지 않고 있음
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            // 토큰을 secure http only 쿠키에 저장
            cookies.set("refreshToken", refreshToken, {
              path: "/", // 모든 페이지에서 쿠키 사용
              maxAge: 60 * 60 * 24 * 30 * 12, // 쿠키의 만료 시간을 밀리초 단위로 설정
              // sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
              // secure: true, // HTTPS를 통해서만 접근
              // domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
              // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
            });

            cookies.set("accessToken", accessToken, {
              path: "/", // 모든 페이지에서 쿠키 사용
              maxAge: accessTokenExpireIn, // 쿠키의 만료 시간을 밀리초 단위로 설정
              // sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
              // secure: true, // HTTPS를 통해서만 접근
              // domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
              // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
            });

            // 메인페이지에서는 reissue setTimeout 설정 안함!!
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getBannerInfo = async () => {
    try {
      const { data } = await customAxios.get("/random-events");
      setCount(data.count);
      setStoreList(data.storeList);
      setIsLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 메인 페이지 들어올 때마다 실행
  useEffect(() => {
    reissue();
    getBannerInfo();
  }, []);

  // 가게 카테고리
  const menuRow1 = [
    { name: "한식", image: "images/koreanFood.png" },
    { name: "양식", image: "images/westernFood.png" },
    { name: "일식", image: "images/japaneseFood.png" },
    { name: "패스트푸드", image: "images/FastFood.png" },
  ];

  const menuRow2 = [
    { name: "카페", image: "images/cafe.png" },
    { name: "헤어", image: "images/hairshop.png" },
    { name: "술집", image: "images/bar.png" },
    { name: "놀이시설", image: "images/karaoke.png" },
  ];

  // react-slick 캐러셀 설정
  const settings = {
    infinite: true, // 무한 캐러셀
    speed: 500, // 다음 컨텐츠 까지의 속도
    slidesToShow: 1, // 화면에 보이는 컨텐츠 수
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 3000, // 자동 캐러셀 속도
    draggable: true, // 드래그
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
  };

  const searchStore = async () => {
    navigate(`/searchStore?keyword=${keyword}`);
  };

  const handleOnKeyPress = (e) => {
    // 검색어 입력 후 엔터를 누른 경우
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      searchStore();
    }
  };

  const moveToCategory = (e) => {
    let menuIndex = e.target.getAttribute("data-key");
    navigate(`/store/category/${menuIndex}`);
  };

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <div
          onClick={onClick}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "375px" }}>
            <div style={{ padding: "0 28px", marginTop: "85px" }}>
              <div className="mainPage-flex-column-end">
                <img
                  style={{ width: "61px" }}
                  alt=""
                  src="images/ari_logo_text.png"
                ></img>
                <p className="mainPage-intro">우리 주변 제휴 정보</p>
                <p className="mainPage-intro">
                  <span style={{ color: "#386FFE" }}>아리</span>에서
                </p>
              </div>
              <div style={{ position: "relative" }}>
                <div className="mainPage-search-icon" onClick={searchStore}>
                  <FiSearch></FiSearch>
                </div>
                <input
                  onKeyPress={handleOnKeyPress}
                  className="mainPage-store-search"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="제휴 정보를 보고 싶은 가게명을 검색하세요!"
                  maxLength={20}
                ></input>
              </div>
            </div>
            <Slider {...settings}>
              {storeList.map((item, index) => {
                return (
                  <Link to={`/detail/${item.storeId}`} key={index}>
                    <div
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(50,50,50,10) 100%), url(data:image/gif;base64,${item.storeImage})`,
                        backgroundPosition: "center",
                      }}
                      className="mainPage-banner-box"
                    >
                      {/* <img
                        alt=""
                        src={`data:image/;base64,${item.storeImage}`}
                      ></img> */}
                      <p className="mainPage-banner-intro">
                        {item.storeName}
                        <br />
                        제휴 이벤트 확인하기
                      </p>
                      <div className="mainPage-banner-num">
                        {index + 1}/{count}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
            <div style={{ padding: "0 28px", marginTop: "40px" }}>
              <p className="mainPage-subIntro">
                <span className="mainPage-select-intro">골라서</span>
                보는 건 어때요?
              </p>
              <table>
                <tbody>
                  <tr>
                    {menuRow1.map((menu, index) => {
                      return (
                        <td key={index}>
                          <div
                            className="mainPage-flex-column-center"
                            style={{ margin: "0 11px 34px 11px" }}
                          >
                            <img
                              style={{ cursor: "pointer" }}
                              onClick={moveToCategory}
                              alt=""
                              data-key={index + 1}
                              src={menu.image}
                            ></img>
                            <span
                              style={{ marginTop: "9px", fontSize: "12px" }}
                            >
                              {menu.name}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    {menuRow2.map((menu, index) => {
                      return (
                        <td key={index}>
                          <div
                            className="mainPage-flex-column-center"
                            style={{ margin: "0 11px 34px 11px" }}
                          >
                            <img
                              style={{ cursor: "pointer" }}
                              data-key={index + 5}
                              onClick={moveToCategory}
                              alt=""
                              src={menu.image}
                            ></img>
                            <span
                              style={{ marginTop: "9px", fontSize: "12px" }}
                            >
                              {menu.name}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
              <div style={{ clear: "both" }}></div>
              <p className="mainPage-subIntro">전체 목록 보기!</p>
              <div style={{ float: "left", marginLeft: "10px" }}>
                <div className="mainPage-flex-column-center">
                  <img
                    alt=""
                    src="images/seeAll.png"
                    data-key={0}
                    onClick={moveToCategory}
                    style={{ cursor: "pointer" }}
                  ></img>
                  <span style={{ marginTop: "9px", fontSize: "12px" }}>
                    전체
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              alt=""
              style={{
                width: "48px",
                height: "48px",
                filter: "grayscale(100%)",
                marginRight: "10px",
              }}
              src="/images/ari_logo_text.png"
            ></img>
            <span>정보</span>
          </div>
          <table>
            <tbody>
              <tr>
                <td>팀장</td>
                <td>여인수</td>
              </tr>
              <tr>
                <td>대표 이메일</td>
                <td>aritest0222@gmail.com</td>
              </tr>
              <tr>
                <td>대표 연락처</td>
                <td>010-4355-4616</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default MainPage;
