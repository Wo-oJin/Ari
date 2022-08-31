import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import "./Board.css";
import { FiSearch } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const BoardItem = ({ boardId, img, title, author, date }) => {
  return (
    <Link to={`/board/${boardId}`}>
      <div className="itemContainer">
        <div className="itemBox">
          <img className="itemImg" src={"/images/photo.png"}></img>
          <div className="itemContent">
            <span className="itemTitle">{title}</span>
            <span className="itemAuthor">{author}</span>
            <span className="itemDate">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
const Board = () => {
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [data, setData] = useState("");
  const [load, setLoad] = useState(true);
  const [search, setSearch] = useState();
  const getBoardData = async () => {
    axios.get(`/board/list?page=${page}`).then((response) => {
      if (response.data) setData((prev) => [...prev, ...response.data]);
      setLoad(false);
    });
  };
  //page 바뀔 때마다 데이터 불러오기
  useEffect(() => {
    setLoad(true);
    getBoardData();
  }, [page]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !load) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, load]);

  if (load) {
    return <h1>로딩 중</h1>;
  }
  console.log(data);

  //onChange 이벤트 발생할 때마다 검색어 최신화
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  //검색을 실행
  const onSearch = (e) => {
    e.preventDefault();
    //만약 검색어가 없다면 전체 데이터 반환
    if (search === null || search === "") {
      getBoardData();
    } else {
      //기존 데이터 목록에서 검색어가 포함된 데이터만 추출
      const filterData = data.filter((item) => item.title.includes(search));
      setData(filterData);
      console.log("검색 ", filterData);
    }
    //검색어 초기화
    setSearch("");
  };
  const deleteSearchWord = () => {
    setSearch("");
  };
  return (
    <>
      <Header text={"제휴 맺기 게시판"} back={true}></Header>
      <div className="searchContainer">
        <form
          className="searchForm"
          onSubmit={(e) => {
            onSearch(e);
          }}
        >
          <div className="serachIcon">
            <FiSearch></FiSearch>
          </div>
          <input
            className="searchInput"
            type="text"
            value={search || ""}
            placeholder={"검색어를 입력하세요"}
            onChange={onChangeSearch}
          ></input>
          <button className="deleteSearchWordBtn" onClick={deleteSearchWord}>
            <IoMdCloseCircle size={"1.5em"} color={"B8B8B8"}></IoMdCloseCircle>
          </button>
        </form>
        <button className="writeBtn">작성하기</button>
      </div>
      {data ? (
        data.map((item, index) => {
          return (
            <BoardItem
              key={index}
              boardId={item.id}
              img={""}
              title={item.title}
              author={item.author}
              date={item.createDate}
            />
          );
        })
      ) : (
        <span>data 없음</span>
      )}
      <div ref={ref}> 무한 스크롤링 옵저버 </div>
    </>
  );
};

export default Board;
