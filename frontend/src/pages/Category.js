import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
  let categoryArr = [
    "한식",
    "양식",
    "일식",
    "패스트푸드",
    "카페",
    "헤어",
    "술집",
    "놀이시설",
  ];
  let testData = [
    {
      storeId: 1,
      storeImg: "/images/testImg.png",
      storeName: "미스터쉐프",
      eventContent: "학생증 제시하면 음료수 무료",
      eventLength: 3,
      eventPeriod: "2022/09/01 ~ 2022/10/01",
    },
    {
      storeId: 2,
      storeImg: "images/testImg.png",
      storeName: "아주맛있는집",
      eventContent: "학생증 제시하면 음료수 무료",
      eventLength: 2,
      eventPeriod: "2022/09/01 ~ 2022/10/01",
    },
    {
      storeId: 3,
      storeImg: "images/testImg.png",
      storeName: "카리스마",
      eventContent: "학생증 제시하면 음료수 무료",
      eventLength: 1,
      eventPeriod: "2022/09/01 ~ 2022/10/01",
    },
  ];
  useEffect(() => {
    if (categoryId < 10) {
      categoryId = "0" + categoryId;
    }
    const getData = async () => {
      await customAxios.get(`/map/category?code=${categoryId}`).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    };
    getData();
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
          if (Number(menuIndex) === index + 1) {
            return (
              <span
                ref={menuRef}
                key={index}
                data-key={index + 1}
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
                data-key={index + 1}
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
        {data ? (
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="storeItem"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(50,50,50,10) 100%), url(data:image/gif;base64,${item.storeImage})`,
                }}
              >
                <div className="ctContentBox">
                  <span className="ctContentName">{item.storeName}</span>
                  <span className="ctContentInfo">{item.eventContent}</span>
                  <span className="ctContentPeriod">
                    {testData[0].eventPeriod}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Category;
