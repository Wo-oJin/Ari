import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Board.css";
import { FiSearch } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const BoardItem = ({ boardId, img, title, author, date }) => {
  return (
    <Link to={`/board/list/${boardId}`}>
      <div className="itemContainer">
        <div className="itemBox">
          <img className="itemImg" src={`data:image/jpg;base64, ${img}`}></img>
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
  const [endPage, setEndPage] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState("");
  const [load, setLoad] = useState(true);
  const [search, setSearch] = useState("");
  const getBoardData = async () => {
    if (!endPage) {
      axios.get(`/board/list?page=${page}`).then((response) => {
        //마지막 페이지가 아니라면
        if (response.data.last === false) {
          setData((prev) => [...prev, ...response.data.content]);
          console.log(`${page}번째 페이지 렌더링 `, data);
        } else {
          setData((prev) => [...prev, ...response.data.content]);
          setEndPage(true);
          console.log("페이지 끝임", data);
        }
      });
    }
  };
  const searchBoardData = async (keyword) => {
    axios.get(`/board/list?keyword=${keyword}`).then((res) => {
      setData(res.data.content);
      setEndPage(true);
    });
  };
  //page 바뀔 때마다 데이터 불러오기
  useEffect(() => {
    setLoad(true);
    getBoardData();
    setLoad(false);
  }, [page]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !load) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, load]);

  const handleOnKeyPress = (e) => {
    if (e.key == "Enter") {
      if (search === null || search === "") {
        //getBoardData();
      } else {
        //기존 데이터 목록에서 검색어가 포함된 데이터만 추출
        searchBoardData(search);
      }
    }
  };

  if (load) {
    return <h1>로딩 중</h1>;
  }

  //onChange 이벤트 발생할 때마다 검색어 최신화
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const deleteSearchWord = () => {
    setSearch("");
  };

  const moveToWritePage = () => {
    window.location.href = "/board/write";
  };
  return (
    <>
      <Header text={"제휴 맺기 게시판"} back={true}></Header>
      <div className="searchContainer">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <div className="serachIcon">
            <FiSearch></FiSearch>
          </div>
          <input
            onKeyPress={handleOnKeyPress}
            className="searchInput"
            type="text"
            value={search}
            placeholder={"검색어를 입력하세요"}
            onChange={onChangeSearch}
          ></input>
          <button className="deleteSearchWordBtn" onClick={deleteSearchWord}>
            <IoMdCloseCircle size={"1.5em"} color={"B8B8B8"}></IoMdCloseCircle>
          </button>
        </form>
        <button className="writeBtn" onClick={moveToWritePage}>
          작성하기
        </button>
      </div>
      {data ? (
        data.map((item, index) => {
          return (
            <BoardItem
              key={index}
              boardId={item.id}
              img={item.image}
              title={item.title}
              author={item.author}
              date={item.createDate}
            />
          );
        })
      ) : (
        <span>data 없음</span>
      )}
      <div ref={ref}> </div>
    </>
  );
};

export default Board;
