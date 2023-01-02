import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DaumPostcode from "react-daum-postcode";
import { customAxios } from "./customAxios";
import { HiOutlineCamera } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { Container } from "../components/common/Container";
import Formbox from "../components/common/FormBox";
import { RightButton, SendButton } from "../components/common/Button";
import {
  Intro,
  Box,
  Input,
  Textarea,
  Image,
  UploadImage,
  DeleteImage,
  MainPick,
} from "../components/store/StoreInfoStyle";

const StoreInfoAdd = () => {
  // 가게 이름, 가게 주소, 상세 주소, 사장님 성함, 사장님 전화번호, 가게 전화번호, 이미지, 한 줄 소개, 영업 시간
  const [uStoreName, setuStoreName] = useState("");
  const [uRoadAddress, setuRoadAddress] = useState("");
  const [uDetailAddress, setuDetailAddress] = useState("");
  const [uOwnerName, setuOwnerName] = useState("");
  const [uOwnerPhoneNumber, setuOwnerPhoneNumber] = useState("");
  const [uStorePhoneNumber, setuStorePhoneNumber] = useState("");
  const [uImages, setuImages] = useState([]); // base64 인코딩된 문자열이 들어감
  const [uFormImages, setuFormImages] = useState([]); // form data에 담아 보낼 이미지 파일 리스트
  const [uSubText, setuSubText] = useState("");
  const [uOpenHour, setuOpenHour] = useState("");
  const navigate = useNavigate();

  // 유효성 검사
  const [isStoreName, setIsStoreName] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isOwnerName, setIsOwnerName] = useState(false);
  const [isOwnerPhoneNumber, setIsOwnerPhoneNumber] = useState(false);

  // daum-postcode api를 팝업처럼 관리하기 위함
  const [isOpenPost, setIsOpenPost] = useState(false);

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

  // 사장님 전화번호
  const onChangeOwnerPhoneNumber = (e) => {
    const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    setuOwnerPhoneNumber(e.target.value);

    if (!phoneNumberRegex.test(e.target.value)) {
      setIsOwnerPhoneNumber(false);
    } else {
      setIsOwnerPhoneNumber(true);
    }
  };

  // 가게 대표 사진 (최대 3장)
  const onChangeImage = (e) => {
    const imageArr = e.target.files; // e.target.files에서 넘어온 이미지들을 배열에 저장
    const maxImageLength = 3;
    const maxAddImageCnt = maxImageLength - uFormImages.length; // 새로 추가할 이미지의 최대 업로드 개수

    // 1. 파일 업로드 개수 검증
    if (imageArr.length > maxAddImageCnt) {
      alert("최대 등록 가능한 이미지 개수를 초과했습니다.");
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

    Array.from(imageArr).forEach((image) => {
      setuFormImages((prev) => [...prev, image]);

      // 이미지 파일 Base64 인코딩: 이미지 미리보기 위함
      const reader = new FileReader();

      reader.readAsDataURL(image); // 파일을 읽고, result 속성에 파일을 나타내는 URL을 저장

      reader.onload = () => {
        // 읽기 완료 시(성공만) 트리거 됨
        setuImages((prev) => [...prev, reader.result]); // reader.result는 preview Image URL임
      };
    });
  };

  // 이미지 삭제: images 배열의 데이터 삭제
  const deleteImage = (e) => {
    // 클릭 안 된 것들로만 배열 만들기
    // 1. 미리보기 이미지
    const newImagesArr = uImages.filter(
      (image, index) => index !== parseInt(e.target.id)
    );
    setuImages(newImagesArr);

    // 2. 실제로 전달할 파일 객체
    const newFormImagesArr = uFormImages.filter(
      (image, index) => index !== parseInt(e.target.id)
    );
    setuFormImages(newFormImagesArr);
  };

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
    formData.append("phoneNumber", uOwnerPhoneNumber);
    formData.append("storePhoneNumber", uStorePhoneNumber);
    formData.append("subText", uSubText);
    formData.append("openHour", uOpenHour);

    try {
      await customAxios.post("/owner/add/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("추가되었습니다.");
      navigate("/storeInfoEdit");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header text="내 가게 추가" back={true}></Header>
      <Container>
        <Formbox>
          <Intro>가게 이름:</Intro>
          <Box>
            <Input
              name="storeName"
              value={uStoreName || ""}
              type="text"
              onChange={onChangeStoreName}
              placeholder="가게 이름 입력"
              required
              maxLength="20"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
        <Formbox>
          <Intro>가게 주소:</Intro>
          <Box>
            <Textarea
              name="roadAddress"
              value={uRoadAddress || ""}
              type="text"
              onChange={(e) => setuRoadAddress(e.target.value)}
              placeholder="도로명 주소 검색"
              required
              readOnly
            />
            <SendButton onClick={onChangeOpenPost}>주소 찾기</SendButton>
          </Box>
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
          <Intro>상세 주소:</Intro>
          <Box>
            <Input
              name="detailAddress"
              value={uDetailAddress || ""}
              type="text"
              onChange={(e) => setuDetailAddress(e.target.value)}
              placeholder="상세 주소 입력"
              maxLength="20"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
        <Formbox>
          <Intro>사장님 성함:</Intro>
          <Box>
            <Input
              name="ownerName"
              value={uOwnerName || ""}
              type="text"
              onChange={onChangeOwnerName}
              placeholder="사장님 성함 입력"
              maxLength="16"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
        <Formbox>
          <Intro>사장님 전화번호:</Intro>
          <Box>
            <Input
              name="phoneNumber"
              value={uOwnerPhoneNumber || ""}
              type="text"
              onChange={onChangeOwnerPhoneNumber}
              placeholder="010-xxxx-xxxx"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
        <Formbox>
          <Intro>가게 전화번호:</Intro>
          <Box>
            <Input
              name="storePhoneNumber"
              value={uStorePhoneNumber || ""}
              type="text"
              onChange={(e) => setuStorePhoneNumber(e.target.value)}
              placeholder="010-xxxx-xxxx"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
        <Formbox>
          <Intro>
            가게 대표 사진
            <span style={{ fontSize: "15px" }}>&#40;최대 3장&#41;</span>:
          </Intro>
          <Box>
            <input
              style={{ display: "none" }}
              type="file"
              name="images"
              id="images"
              multiple
              accept="image/jpg, image/jpeg, image/png"
              onChange={onChangeImage}
            />
            <div style={{ display: "flex", marginBottom: "6px" }}>
              <label htmlFor="images">
                <UploadImage>
                  <HiOutlineCamera
                    size={"1.7em"}
                    style={{ paddingTop: "3px" }}
                  />
                  <span style={{ fontSize: "14px" }}>
                    <span style={{ color: "#386FFE" }}>
                      {uFormImages.length}
                    </span>
                    /3
                  </span>
                </UploadImage>
              </label>
              {uImages &&
                uImages.map((image, index) => (
                  <div
                    key={index}
                    style={{ position: "relative", marginRight: "9px" }}
                  >
                    <Image alt="" src={image} id={index} />
                    {index === 0 && <MainPick>대표 사진</MainPick>}
                    <DeleteImage id={index} onClick={deleteImage} />
                  </div>
                ))}
            </div>
          </Box>
        </Formbox>
        <Formbox>
          <Intro>가게 한 줄 소개:</Intro>
          <Box>
            <Textarea
              height="26px"
              name="subText"
              value={uSubText || ""}
              type="text"
              onChange={(e) => setuSubText(e.target.value)}
              placeholder="가게 한 줄 소개 입력"
              maxLength="250"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
        <Formbox>
          <Intro>영업 시간:</Intro>
          <Box>
            <Input
              name="openHour"
              value={uOpenHour || ""}
              type="text"
              onChange={(e) => setuOpenHour(e.target.value)}
              placeholder="오전 9:00 ~ 오후 9:00 (연중무휴)"
              maxLength="30"
            />
            <BiEditAlt color="#A3A3A3" size="22" />
          </Box>
        </Formbox>
      </Container>
      <div style={{ width: "327px", margin: "0 auto" }}>
        <RightButton
          onClick={onSubmit}
          disabled={
            isStoreName && isAddress && isOwnerName && isOwnerPhoneNumber
              ? false
              : true
          }
        >
          추가
        </RightButton>
      </div>
    </>
  );
};

export default StoreInfoAdd;
