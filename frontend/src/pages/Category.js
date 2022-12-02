import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { throttle } from "../util/util";
import "./Category.css";
import { customAxios } from "./customAxios";

const Category = () => {
  let { categoryId } = useParams();
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [menuIndex, setMenuIndex] = useState(categoryId);
  const scrollRef = useRef(null);
  const menuRef = useRef(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let categoryArr = [
    "전체",
    "한식",
    "양식",
    "일식",
    "중식",
    "뷰티/헬스",
    "카페",
    "술집",
    "놀이시설",
    "스터디카페",
  ];

  const getData = async (menuIndex) => {
    setData("");
    setLoading(true);
    await customAxios
      .get(`/category?code=${categoryArr[menuIndex]}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData(null);
      });
    setLoading(false);
  };
  useEffect(() => {
    getData(menuIndex);
  }, []);

  useEffect(() => {
    //메뉴를 클릭하면 메뉴바 자동 슬라이드
    if (menuIndex > 5) {
      scrollRef.current.scrollLeft = 98.5;
    } else if (menuIndex < 4) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [menuIndex]);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };
  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);

  //메뉴 클릭시 index 세팅
  const selectMenu = (e) => {
    setMenuIndex(e.target.getAttribute("data-key"));
    getData(e.target.getAttribute("data-key"));
  };

  return (
    <>
      <Header text={"제휴 정보"} back={true}></Header>
      <div
        className="categoryNav"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {categoryArr.map((item, index) => {
          if (Number(menuIndex) === index) {
            return (
              <span
                ref={menuRef}
                key={index}
                data-key={index}
                className="selectedCategoryMenu"
                onClick={selectMenu}
              >
                {item}
              </span>
            );
          } else {
            return (
              <span
                key={index}
                data-key={index}
                className="categoryMenu"
                onClick={selectMenu}
              >
                {item}
              </span>
            );
          }
        })}
      </div>
      <div className="storeContainer">
        {loading ? <Loading /> : null}
        {data
          ? data.map((item, index) => {
              return (
                <Link key={index} to={`/detail/${item.storeId}`}>
                  <div
                    className="storeItem"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(50,50,50,10) 100%), url(${item.storeImage})`,
                    }}
                  >
                    <div className="ctContentBox">
                      <span className="ctContentName">{item.storeName}</span>
                      <div className="ctContentInfo">{item.eventContent}</div>
                      <span className="ctContentPeriod">
                        {item.eventPeriod}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Category;
