import { React, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import "../pages/StoreInfoEdit.css";
import DaumPostcode from "react-daum-postcode";
import { customAxios } from "./customAxios";

const Formbox = styled.div`
  margin-bottom: 36px;
  .message {
    font-size: 11px;
    letter-spacing: -1px;
    margin: 0;
    &.error {
      color: #ff2727;
    }
  }
`;

const StoreInfoEdit = () => {
  // 가게 이름, 가게 주소, 상세 주소, 사장님 성함, 가게 전화번호, 이미지, 한 줄 소개, 영업 시간
  const [storeInfoArr, setStoreInfoArr] = useState([]);
  const [uStoreId, setuStoreId] = useState(null);
  const [uStoreName, setuStoreName] = useState("");
  const [uRoadAddress, setuRoadAddress] = useState("");
  const [uDetailAddress, setuDetailAddress] = useState("");
  const [uOwnerName, setuOwnerName] = useState("");
  const [uPhoneNumber, setuPhoneNumber] = useState("");
  const [uImages, setuImages] = useState([]); // base64 인코딩된 문자열이 들어감
  const [uFormImages, setuFormImages] = useState([]); // form data에 담아 보낼 이미지 파일 리스트
  const [uCurrentImagesLength, setuCurrentImagesLength] = useState(0); // 현재 업로드한 이미지 개수
  const [uSubText, setuSubText] = useState("");
  const [uOpenHour, setuOpenHour] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const fileRef = useRef(null); // input[type="file"] DOM 요소에 접근하기 위함

  const navigate = useNavigate();

  const [storeIndex, setStoreIndex] = useState("0"); // 가게 탭 인덱스

  useEffect(() => {
    const initialEdit = async () => {
      try {
        await customAxios.get("/edit/store").then((res) => {
          console.log("res.data.data", res.data.data);
          const dataArr = res.data.data;
          setStoreInfoArr(dataArr);

          // 처음 페이지 렌더링되었을 때 첫 번째 가게에 대한 초기값 세팅
          setuStoreId(dataArr[0].storeId);
          setuStoreName(dataArr[0].storeName);
          setuRoadAddress(dataArr[0].roadAddress);
          setuDetailAddress(dataArr[0].detailAddress);
          setuOwnerName(dataArr[0].ownerName);
          setuPhoneNumber(dataArr[0].phoneNumber);
          setuSubText(dataArr[0].subText || "");
          setuOpenHour(dataArr[0].openHour || "");

          if (dataArr[0].existingImages !== undefined) {
            setuImages(
              dataArr[0].existingImages.map(
                (image) => `data:image/;base64,${image}`
              )
            ); // 미리보기 이미지
            setuCurrentImagesLength(dataArr[0].existingImages.length); // 현재 업로드된 이미지 개수

            // input[type="file"] 요소에 files props 할당하기
            // 1. base64 이미지 url을 file 객체로 디코딩
            let decodeFilesArr = [];
            dataArr[0].existingImages.forEach((image, index) => {
              decodeFilesArr[index] = base64ToFile(
                `data:image/;base64,${image}`,
                `${dataArr[0].storeId}_${index}.png`
              );
            });

            setuFormImages(decodeFilesArr);

            // 2. DataTransfer 객체를 이용하여 FileList의 값을 변경
            const dataTranster = new DataTransfer();

            decodeFilesArr.forEach((file) => {
              dataTranster.items.add(file);
            });

            // 2-1. document.getElementById('images').prop("files", setFilesArr);
            fileRef.current.files = dataTranster.files;
            // console.log(fileRef.current.files);
          }
          setIsLoaded(true);
        });
      } catch (e) {
        console.log(e);
      }
    };
    initialEdit();
  }, []);

  // 가게 탭 바뀌었을 때 입력폼 초기값 설정
  const onClickStore = (e) => {
    setStoreIndex(e.target.id);

    // 처음 페이지 렌더링되었을 때 첫 번째 가게에 대한 초기값 세팅
    let currentStore = storeInfoArr[storeIndex];
    setuStoreId(currentStore.storeId);
    setuStoreName(currentStore.storeName);
    setuRoadAddress(currentStore.roadAddress);
    setuDetailAddress(currentStore.detailAddress);
    setuOwnerName(currentStore.ownerName);
    setuPhoneNumber(currentStore.phoneNumber);
    setuSubText(currentStore.subText || "");
    setuOpenHour(currentStore.openHour || "");

    if (currentStore.existingImages !== undefined) {
      setuImages(
        currentStore.existingImages.map(
          (image) => `data:image/;base64,${image}`
        )
      ); // 미리보기 이미지
      setuCurrentImagesLength(currentStore.existingImages.length); // 현재 업로드된 이미지 개수

      // input[type="file"] 요소에 files props 할당하기
      // 1. base64 이미지 url을 file 객체로 디코딩
      let decodeFilesArr = [];
      currentStore.existingImages.forEach((image, index) => {
        console.log(image);
        decodeFilesArr[index] = base64ToFile(
          `data:image/;base64,${image}`,
          `${currentStore.storeId}_${index}.png`
        );
      });

      setuFormImages(decodeFilesArr);

      // 2. DataTransfer 객체를 이용하여 FileList의 값을 변경
      const dataTranster = new DataTransfer();

      decodeFilesArr.forEach((file) => {
        dataTranster.items.add(file);
      });

      // 2-1. document.getElementById('images').prop("files", setFilesArr);
      fileRef.current.files = dataTranster.files;
      // console.log(fileRef.current.files);
    }
  };

  // 유효성 검사
  const [isStoreName, setIsStoreName] = useState(true);
  const [isAddress, setIsAddress] = useState(true);
  const [isOwnerName, setIsOwnerName] = useState(true);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);

  const [isOpenPost, setIsOpenPost] = useState(false); // daum-postcode api를 팝업처럼 관리하기 위함

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setuRoadAddress(fullAddress); // 도로명주소
    setIsAddress(true);
    setIsOpenPost(false);
  };

  // 가게 이름
  const onChangeStoreName = (e) => {
    setuStoreName(e.target.value);
    setIsStoreName(true);

    if (e.target.value.trim() === "") {
      setIsStoreName(false);
    }
  };

  // 사장님 성함
  const onChangeOwnerName = (e) => {
    setuOwnerName(e.target.value);
    setIsOwnerName(true);

    if (e.target.value.trim() === "") {
      setIsOwnerName(false);
    }
  };

  // 가게 전화번호
  const onChangePhoneNumner = (e) => {
    const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    setuPhoneNumber(e.target.value);

    if (!phoneNumberRegex.test(e.target.value)) {
      setIsPhoneNumber(false);
    } else {
      setIsPhoneNumber(true);
    }
  };

  // 가게 대표 사진 (최대 3장)
  const onChangeImage = (e) => {
    const imageArr = e.target.files; // e.target.files에서 넘어온 이미지들을 배열에 저장

    let imageURLs = [];

    let image;
    const maxImageLength = 3;
    const maxAddImageCnt = maxImageLength - uCurrentImagesLength; // 새로 추가할 이미지의 최대 업로드 개수
    const addImagesLength =
      imageArr.length > maxAddImageCnt ? maxAddImageCnt : imageArr.length;

    setuCurrentImagesLength(uCurrentImagesLength + addImagesLength); // 현재 이미지 개수 저장

    if (imageArr.length > addImagesLength) {
      alert(`최대 등록 가능한 이미지 개수를 초과했습니다.`);
      return false;
    } else {
      setuFormImages([...uFormImages, ...e.target.files]);
    }

    for (let i = 0; i < addImagesLength; i++) {
      image = imageArr[i];

      // 파일 업로드 시 모든 파일 (*.*) 선택 방지 위해 이미지 type을 한 번 더 검증
      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/jpg" &&
        image.type !== "image/png"
      ) {
        setuImages([]);
        alert("JPG 혹은 PNG 확장자의 이미지 파일만 등록 가능합니다.");
        break;
      } else {
        // 이미지 파일 Base64 인코딩: 이미지 미리보기 위함
        const reader = new FileReader();

        reader.readAsDataURL(image); // 파일을 읽고, result 속성에 파일을 나타내는 URL을 저장

        reader.onload = () => {
          // 읽기 완료 시(성공만) 트리거 됨
          imageURLs[i] = reader.result; // reader.result는 preview Image URL임

          setuImages([...uImages, ...imageURLs]); // 기존 이미지 배열에 새로운 이미지 추가
        };
      }
    }
  };

  // 이미지 삭제: images 배열의 데이터 삭제
  const deleteImage = (e) => {
    // 클릭 안 된 것들로만 배열 만들기
    // 1. 미리보기 이미지
    const newImagesArr = uImages.filter(
      (image, index) => index !== parseInt(e.target.name)
    );
    setuImages([...newImagesArr]);

    // 2. 실제로 전달할 파일 객체
    const fromImagesArr = Array.from(uFormImages);

    const newFromImagesArr = fromImagesArr.filter(
      (image, index) => index !== parseInt(e.target.name)
    );
    setuFormImages([...newFromImagesArr]);

    // 현재 업로드된 이미지 개수 변경
    setuCurrentImagesLength(uCurrentImagesLength - 1);
  };

  // base64 인코딩되어 받은 이미지 url을 file 객체로 디코딩
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

  const onSubmit = async (e) => {
    e.preventDefault();

    // 이미지와 json 데이터를 함께 전달하기 위해 FormData 객체에 담아서 전달
    const formData = new FormData();

    if (uFormImages.length > 0) {
      // 이미지 파일이 업로드된 경우
      Array.from(uFormImages).forEach((image) => {
        formData.append("newImages", image); // 이미지 파일 배열 담기
      });
    } else {
      // 업로드된 이미지 파일이 없는 경우
      formData.append("newImages", null);
    }

    formData.append("storeName", uStoreName);
    formData.append("roadAddress", uRoadAddress);
    formData.append("detailAddress", uDetailAddress);
    formData.append("ownerName", uOwnerName);
    formData.append("phoneNumber", uPhoneNumber);
    // formData.append('newImages', uFormImages);
    formData.append("subText", uSubText);
    formData.append("openHour", uOpenHour);

    // console.log("newImages>>"+formData.get("newImages"));

    try {
      await customAxios
        .post("/edit/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(JSON.stringify(res.data));
          alert("수정되었습니다.");
          navigate("/myPageOwner");
        });
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoaded) {
    return <h1>로딩 중</h1>;
  } else {
    return (
      <>
        <Header text="내 가게 정보 수정" back={true}></Header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {storeInfoArr.map((store, index) => {
            return (
              <div
                key={index}
                id={index}
                className="edit-store-tap"
                onClick={onClickStore}
              >
                {store.storeName}
              </div>
            );
          })}
        </div>
        <div className="inputContainer">
          <Formbox>
            <div className="edit-intro">가게 이름:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="storeName"
                value={uStoreName || ""}
                type="text"
                onChange={onChangeStoreName}
                placeholder="가게 이름 입력"
                required
                autoComplete="off"
                maxLength="20"
              />
              <img alt="" src="images/edit_icon.png"></img>
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">가게 주소:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="roadAddress"
                value={uRoadAddress || ""}
                type="text"
                onChange={(e) => setuRoadAddress(e.target.value)}
                placeholder="도로명 주소 검색"
                required
                autoComplete="off"
              />
              <img
                style={{ cursor: "pointer" }}
                alt=""
                src="images/edit_icon.png"
                onClick={onChangeOpenPost}
              ></img>
            </div>
            <div style={{ width: "260px" }}>
              {isOpenPost ? (
                <DaumPostcode
                  className="daumPost"
                  autoClose
                  onComplete={onCompletePost}
                />
              ) : null}
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">상세 주소:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="detailAddress"
                value={uDetailAddress || ""}
                type="text"
                onChange={(e) => setuDetailAddress(e.target.value)}
                placeholder="상세 주소 입력"
                autoComplete="off"
                maxLength="20"
              />
              <img alt="" src="images/edit_icon.png"></img>
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">사장님 성함:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="ownerName"
                value={uOwnerName || ""}
                type="text"
                onChange={onChangeOwnerName}
                placeholder="사장님 성함 입력"
                autoComplete="off"
                maxLength="16"
              />
              <img alt="" src="images/edit_icon.png"></img>
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">가게 전화번호:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="phoneNumber"
                value={uPhoneNumber || ""}
                type="text"
                onChange={onChangePhoneNumner}
                placeholder="010-xxxx-xxxx"
                autoComplete="off"
              />
              <img alt="" src="images/edit_icon.png"></img>
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">
              가게 대표 사진
              <span style={{ fontSize: "15px" }}>&#40;최대 3장&#41;</span>:
            </div>
            <div className="edit-box">
              <input
                style={{ display: "none" }}
                type="file"
                name="images"
                id="images"
                multiple
                accept="image/jpg, image/jpeg, image/png"
                onChange={onChangeImage}
                ref={fileRef}
              />
              <div style={{ display: "flex", marginBottom: "6px" }}>
                <label htmlFor="images">
                  <div className="uploadImage" style={{ cursor: "pointer" }}>
                    <img
                      style={{ paddingTop: "3px" }}
                      alt=""
                      src="images/camera.png"
                    ></img>
                    <span style={{ fontSize: "14px" }}>
                      <span style={{ color: "#386FFE" }}>
                        {uCurrentImagesLength}
                      </span>
                      /3
                    </span>
                  </div>
                </label>
                {uImages &&
                  uImages.map((image, index) => (
                    <div
                      key={index}
                      style={{ position: "relative", marginRight: "9px" }}
                    >
                      <img
                        className="edit-image"
                        alt=""
                        src={image}
                        id={index}
                      ></img>
                      {index === 0 && <div className="mainPick">대표 사진</div>}
                      <label htmlFor={index}></label>
                      <img
                        className="delete-image"
                        alt=""
                        src="images/img_delete.png"
                        name={index}
                        onClick={deleteImage}
                      ></img>
                    </div>
                  ))}
              </div>
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">가게 한 줄 소개:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="subText"
                value={uSubText || ""}
                type="text"
                onChange={(e) => setuSubText(e.target.value)}
                placeholder="가게 한 줄 소개 입력"
                autoComplete="off"
                maxLength="40"
              />
              <img alt="" src="images/edit_icon.png"></img>
            </div>
          </Formbox>
          <Formbox>
            <div className="edit-intro">영업 시간:</div>
            <div className="edit-box">
              <input
                className="edit-input"
                name="openHour"
                value={uOpenHour || ""}
                type="text"
                onChange={(e) => setuOpenHour(e.target.value)}
                placeholder="오전 9:00 ~ 오후 9:00 (연중무휴)"
                autoComplete="off"
                maxLength="30"
              />
              <img alt="" src="images/edit_icon.png"></img>
            </div>
          </Formbox>
        </div>
        <div style={{ width: "304px", margin: "0 auto" }}>
          <div className="edit-buttonContainer">
            <Link to="/myPageOwner">
              <button className="cancelBtn" type="button">
                취소
              </button>
            </Link>
            <form onSubmit={onSubmit}>
              <button
                className="editBtn"
                type="submit"
                disabled={
                  isStoreName && isAddress && isOwnerName && isPhoneNumber
                    ? false
                    : true
                }
              >
                수정
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default StoreInfoEdit;
