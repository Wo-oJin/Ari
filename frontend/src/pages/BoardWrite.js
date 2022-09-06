import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";
import "./BoardWrite.css";
import axios from "axios";

const BoardWrite = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [postImages, setPostImages] = useState();
  //업로드된 이미지를 확인하기 위한 변수
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [content, setcContent] = useState("");
  const navigate = useNavigate();
  const imgRef = useRef();
  let newImageURL = [];

  useEffect(() => {
    console.log("현재 상태: ", imageUrl);
  }, [imageUrl]);

  const sendData = async () => {
    let formData = new FormData();
    postImages.map((item) => {
      formData.append("files", item);
    });
    formData.append("title", title);
    formData.append("content", content);
    formData.append("period", period);

    axios
      .post("/board/write", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        console.log(res);
      });
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("제목: ", title);
  };
  const onChangePeriod = (e) => {
    setPeriod(e.target.value);
    console.log("기간: ", period);
  };
  const onChangeContent = (e) => {
    setcContent(e.target.value);
    console.log("내용: ", content);
  };
  const onChangeImage = () => {
    if (imageUrl.length >= 3) {
      window.alert("3장 이상의 이미지는 등록할 수 없습니다.");
    } else {
      //업로드된 이미지가 3장 미만이라면 imageURL 배열에 추가
      if (imgRef.current.files.length > 0) {
        const imageFiles = [...imgRef.current.files];
        setPostImages(imageFiles);
        imageFiles.map((item) => {
          const reader = new FileReader();
          reader.readAsDataURL(item);
          reader.onloadend = () => {
            setImageUrl((prev) => [...prev, reader.result]);
          };
        });
      }
    }
  };

  const deletePhoto = (e) => {
    //버튼 바깥쪽이나 빈 공간을 잘못 클릭한 경우 처리
    if (!e.target.parentNode.parentNode.id) {
      return;
    } else {
      newImageURL = imageUrl.filter((item, index) => {
        return index !== Number(e.target.parentNode.parentNode.id);
      });
      setImageUrl(newImageURL);
    }
  };
  console.log("저장된 이미지 배열", imageUrl);

  const submitHandler = (e) => {
    e.preventDefault();
    sendData();
  };
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
      </div>
      <div className="writeContainer">
        <form
          className="writeForm"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div className="uploadPhotoBox">
            <label htmlFor="uploadPhotoInput" className="uploadPhotoBtn">
              <HiOutlineCamera size={"1.7em"}></HiOutlineCamera>
              <div>
                <span className="currentImageNum">{imageUrl.length}</span>
                <span>/3</span>
              </div>
            </label>
            <input
              id="uploadPhotoInput"
              type="file"
              onChange={onChangeImage}
              ref={imgRef}
              multiple={true}
            ></input>
            <div className="photoContainer">
              {imageUrl.map((item, index) => {
                return (
                  <div>
                    <img alt={index} className="uploadedPhoto" src={item}></img>
                    <button id={index} className="deletePhotoBtn">
                      <IoMdCloseCircle
                        id={index}
                        size={"1.5em"}
                        color={"B8B8B8"}
                        onClick={deletePhoto}
                      ></IoMdCloseCircle>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <input
            className="writeTitle"
            placeholder="글 제목 (ex.[요청 업종]~와 제휴 원합니다.)"
            onChange={onChangeTitle}
          ></input>
          <input
            className="writeDuration"
            placeholder="제휴기간 (일주일/한 달/1년)"
            onChange={onChangePeriod}
          ></input>
          <textarea
            className="writeContent"
            placeholder="제휴를 함께하고 싶은 가게에게 요청하는 글을 작성해주세요."
            onChange={onChangeContent}
          ></textarea>
          <button className="completeBtn" type="submit">
            완료
          </button>
        </form>
      </div>
    </>
  );
};

export default BoardWrite;
