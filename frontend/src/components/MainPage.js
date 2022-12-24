import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiSearch } from "react-icons/fi";
import { customAxios } from "../pages/customAxios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import { Container, ColumnEndContainer } from "./common/Container";
import { SmallLogo } from "../components/common/Logo";
import {
  Intro,
  StoreSearch,
  SearchIcon,
  BannerContainer,
  Banner,
  BannerText,
  SubIntro,
  SelectIntro,
  BannerBox,
  BannerIntro,
  BannerNum,
  CatecoryImg,
} from "./mainPage/MainPageStyle";
import { Footer, FooterLogo } from "./common/Footer";

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
    { name: "전체" },
    { name: "한식" },
    { name: "양식" },
    { name: "일식" },
    { name: "중식" },
  ];

  const menuRow2 = [
    { name: "뷰티/헬스" },
    { name: "카페" },
    { name: "술집" },
    { name: "놀이시설" },
    { name: "스터디카페" },
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

  const moveToNotice = () => {
    navigate("/notice/1");
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
              <ColumnEndContainer>
                <SmallLogo />
                {/* <img
                  style={{ width: "61px" }}
                  alt=""
                  src="images/ari_logo_text.png"
                ></img> */}
                <Intro>우리 주변 제휴 정보</Intro>
                <Intro>
                  <span style={{ color: "#386FFE" }}>아리</span>에서
                </Intro>
              </ColumnEndContainer>

              <BannerContainer>
                <Banner onClick={moveToNotice}>
                  <BannerText>처음 오신 분들 클릭!</BannerText>
                </Banner>
              </BannerContainer>

              <div style={{ position: "relative" }}>
                <SearchIcon onClick={searchStore}>
                  <FiSearch />
                </SearchIcon>
                <StoreSearch
                  onKeyPress={handleOnKeyPress}
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="제휴 정보를 보고 싶은 가게명을 검색하세요!"
                  maxLength={20}
                ></StoreSearch>
              </div>
            </div>
            <Slider {...settings}>
              {storeList.map((item, index) => {
                return (
                  <Link to={`/detail/${item.storeId}`} key={index}>
                    <BannerBox
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(50,50,50,10) 100%), url(data:image/gif;base64,${item.storeImage})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      {/* <img
                        alt=""
                        src={`data:image/;base64,${item.storeImage}`}
                      ></img> */}
                      <BannerIntro>
                        {item.storeName}
                        <br />
                        제휴 이벤트 확인하기
                      </BannerIntro>
                      <BannerNum>
                        {index + 1}/{count}
                      </BannerNum>
                    </BannerBox>
                  </Link>
                );
              })}
            </Slider>
            <div style={{ padding: "0 5px", marginTop: "40px" }}>
              <SubIntro>
                <SelectIntro>골라서</SelectIntro>
                보는 건 어때요?
              </SubIntro>
              <table>
                <tbody>
                  <tr>
                    {menuRow1.map((menu, index) => {
                      return (
                        <td key={index}>
                          <Container style={{ margin: "0 11px 34px 11px" }}>
                            <CatecoryImg
                              onClick={moveToCategory}
                              alt=""
                              data-key={index}
                              index={index}
                            ></CatecoryImg>
                            <span
                              style={{ marginTop: "9px", fontSize: "12px" }}
                            >
                              {menu.name}
                            </span>
                          </Container>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    {menuRow2.map((menu, index) => {
                      return (
                        <td key={index}>
                          <Container style={{ margin: "0 11px 34px 11px" }}>
                            <CatecoryImg
                              onClick={moveToCategory}
                              alt=""
                              data-key={index + 5}
                              index={index + 5}
                            ></CatecoryImg>
                            <span
                              style={{ marginTop: "9px", fontSize: "12px" }}
                            >
                              {menu.name}
                            </span>
                          </Container>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
              <div style={{ clear: "both" }}></div>
            </div>
          </div>
        </div>
        <Footer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FooterLogo />
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
        </Footer>
      </>
    );
  }
};

export default MainPage;
