import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";
import "./BoardWrite.css";

const BoardWrite = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <span>제휴 맺기 게시글 작성</span>
        <button
          className="backBtn"
          onClick={() => {
            //back btn 클릭 시, 뒤로 가기
            navigate(-1);
          }}
        >
          <MdArrowBackIosNew size={"1.3em"} color="black"></MdArrowBackIosNew>
        </button>
        <button className="completeBtn">완료</button>
      </div>
      <div className="writeContainer">
        <div className="uploadPhotoBox">
          <button className="uploadPhotoBtn">
            <HiOutlineCamera size={"1.7em"}></HiOutlineCamera>
            <div>
              <span className="currentImageNum">2</span>
              <span>/3</span>
            </div>
          </button>

          <div className="photoContainer">
            <img className="uploadedPhoto" src=""></img>

            <button className="deletePhotoBtn">
              <IoMdCloseCircle
                size={"1.5em"}
                color={"B8B8B8"}
              ></IoMdCloseCircle>
            </button>
          </div>
          <div className="photoContainer">
            <img className="uploadedPhoto" src=""></img>
            <button className="deletePhotoBtn">
              <IoMdCloseCircle
                size={"1.5em"}
                color={"B8B8B8"}
              ></IoMdCloseCircle>
            </button>
          </div>
        </div>
        <input
          className="writeTitle"
          placeholder="글 제목 (ex.[요청 업종]~와 제휴 원합니다.)"
        ></input>
        <input
          className="writeDuration"
          placeholder="제휴기간 (일주일/한 달/1년)"
        ></input>
        <textarea
          className="writeContent"
          placeholder="제휴를 함께하고 싶은 가게에게 요청하는 글을 작성해주세요."
        ></textarea>
      </div>
    </>
  );
};

export default BoardWrite;
