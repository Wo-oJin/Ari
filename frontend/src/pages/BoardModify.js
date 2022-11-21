import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";
import "./BoardWrite.css";
import { customAxios } from "./customAxios";
const BoardModify = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [postImages, setPostImages] = useState();
  //업로드된 이미지를 확인하기 위한 변수
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [content, setcContent] = useState("");
  const [authorStore, setAuthorStore] = useState("");
  const [selected, setSelected] = useState();
  const [authorList, setAuthorList] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const imgRef = useRef();
  const { articleId } = useParams();
  let newImageURL = [];

  function base64ToFile(base64, fileName) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  //처음 페이지에 접근하면 작성자의 가게들을 받아오기
  useEffect(() => {
    const getData = async () => {
      await customAxios.get(`/owner/board/update/${articleId}`).then((res) => {
        setData(res.data);
        setTitle(res.data.title);
        setPeriod(res.data.period);
        setcContent(res.data.content);
        setImageUrl(
          res.data.images.map((image) => `data:image/;base64,${image}`)
        );
        let decodeFilesArr = [];
        res.data.images.forEach((image, index) => {
          decodeFilesArr[index] = base64ToFile(
            `data:image/;base64,${image}`,
            `${res.data.storeId}_${index}.png`
          );
        });
        setPostImages(...decodeFilesArr);
      });
    };
    const getStoreData = async () => {
      await customAxios.get("/member/stores").then((res) => {
        setAuthorList(res.data.storeList);
      });
    };
    getStoreData();
    getData();
  }, []);
  //작성한 내용을 POST
  const sendData = async () => {
    let formData = new FormData();
    if (postImages.length > 0) {
      postImages.map((item) => {
        formData.append("files", item);
      });
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("period", period);

    customAxios
      .put(`/owner/board/update/${articleId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //작성 완료되면 게시물 리스트 페이지로 리다이렉트
        navigate("/board/list");
      });
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangePeriod = (e) => {
    setPeriod(e.target.value);
  };
  const onChangeContent = (e) => {
    setcContent(e.target.value);
  };
  const onChangeImage = (e) => {
    const imageArr = e.target.files; // e.target.files에서 넘어온 이미지들을 배열에 저장
    const maxImageLength = 3;
    const maxAddImageCnt = maxImageLength - imageUrl.length; // 새로 추가할 이미지의 최대 업로드 개수

    // 1. 파일 업로드 개수 검증
    if (imageArr.length > maxAddImageCnt) {
      window.alert("3장 이상의 이미지는 등록할 수 없습니다.");
      return;
    }

    // 2. 파일 업로드 시 모든 파일 (*.*) 선택 방지 위해 이미지 type을 한 번 더 검증
    for (let i = 0; i < imageArr.length; i++) {
      if (
        imageArr[i].type !== "image/jpeg" &&
        imageArr[i].type !== "image/jpg" &&
        imageArr[i].type !== "image/png"
      ) {
        alert("JPG 혹은 PNG 확장자의 이미지 파일만 등록 가능합니다.");
        return;
      }
    }

    //업로드된 이미지가 3장 미만이라면 imageURL 배열에 추가
    if (imgRef.current.files.length > 0) {
      const imageFiles = [...imgRef.current.files];
      setPostImages((prev) => [prev, ...imageFiles]);
      imageFiles.map((item) => {
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onloadend = () => {
          setImageUrl((prev) => [...prev, reader.result]);
        };
      });
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

  const submitHandler = (e) => {
    e.preventDefault();
    sendData();
  };

  const changeSelectHandler = (e) => {
    setAuthorStore(authorList[e.target.value].storeName);
    setSelected(authorList[e.target.value].storeName);
  };
  if (!data) {
    return <h1>로딩 중</h1>;
  } else {
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
                    <div key={index}>
                      <img
                        alt={index}
                        className="uploadedPhoto"
                        src={item}
                      ></img>
                      <button
                        id={index}
                        className="deletePhotoBtn"
                        type="button"
                      >
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
              value={title}
            ></input>
            <div className="writeAuthor" placeholder="작성자 가게 선택">
              <span>작성자 가게 선택</span>
              <select className="writeSelect" onChange={changeSelectHandler}>
                {authorList &&
                  authorList.map((item, index) => {
                    if (item.storeName === data.author) {
                      return (
                        <option key={index} value={index} selected>
                          {item.storeName}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={index}>
                          {item.storeName}
                        </option>
                      );
                    }
                  })}
              </select>
            </div>

            <input
              className="writeDuration"
              placeholder="제휴기간 (일주일/한 달/1년)"
              onChange={onChangePeriod}
              value={period}
            ></input>
            <textarea
              className="writeContent"
              placeholder="제휴를 함께하고 싶은 가게에게 요청하는 글을 작성해주세요."
              onChange={onChangeContent}
              value={content}
            ></textarea>
            <button className="completeBtn" type="submit">
              완료
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default BoardModify;
