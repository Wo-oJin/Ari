import { React, useState } from "react";
import { useLocation } from "react-router";
import Header from '../components/Header';
import styled from 'styled-components';
import "../pages/StoreInfoEdit.css";
import DaumPostcode from "react-daum-postcode";
import axios from 'axios';

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
    const { data } = useLocation();
    // console.log(JSON.stringify(data));

    // 가게 이름, 가게 주소, 상세 주소, 사장님 성함, 가게 전화번호, 이미지, 한 줄 소개, 영업 시간
    const [storeName, setStoreName] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [images, setImages] = useState([]);
    const [currentImagesLength, setCurrentImagesLength] = useState(0); // 현재 업로드한 이미지 개수
    const [subText, setSubText] = useState("");
    const [openHour, setOpenHour] = useState("");

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
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
    
        setRoadAddress(fullAddress); // 도로명주소
        setIsAddress(true);
        setIsOpenPost(false);
    };

    const onChangeStoreName = (e) => {
        setStoreName(e.target.value);

        if (e.target.value.trim() === '') {
            setIsStoreName(false);
        }
    }

    const onChangeOwnerName = (e) => {
        setOwnerName(e.target.value);

        if (e.target.value.trim() === '') {
            setIsOwnerName(false);
        }
    }

    const onChangePhoneNumner = (e) => {
        setPhoneNumber(e.target.value);

        if (e.target.value.trim() === '') {
            setIsPhoneNumber(false);
        }
    }

    const onChangeImage = (e) => {
        const imageArr = e.target.files; // e.target.files에서 넘어온 이미지들을 배열에 저장

        let imageURLs = [];

        let image;
        const maxAddImageCnt = 3 - currentImagesLength; // 새로 추가할 이미지의 최대 업로드 개수
        const addImagesLength = imageArr.length > maxAddImageCnt ? maxAddImageCnt : imageArr.length;

        setCurrentImagesLength(currentImagesLength + addImagesLength); // 현재 이미지 개수 저장

        if (imageArr.length > addImagesLength) {
            alert(`최대 등록 가능한 이미지 개수를 초과했습니다.`);
        }

        for (let i = 0; i < addImagesLength; i++) {
            image = imageArr[i];

            // 파일 업로드 시 모든 파일 (*.*) 선택 방지 위해 이미지 type을 한 번 더 검증
            if (image.type !== "image/jpeg" && image.type !== "image/jpg" && image.type !== "image/png") {
                setImages([]);
                alert('JPG 혹은 PNG 확장자의 이미지 파일만 등록 가능합니다.');
                break;
            } else {
                // 이미지 파일 Base64 인코딩
                const reader = new FileReader();

                reader.readAsDataURL(image); // Blob이나 File의 내용 읽어오기

                reader.onload = () => {
                    imageURLs[i] = reader.result; // reader.result는 preview Image URL임

                    setImages([...images, ...imageURLs]); // 기존 이미지 배열에 새로운 이미지 추가
                };
            }
        }
    }

    // 이미지 삭제: images 배열의 데이터 삭제
    const deleteImage = (e) => {
        // 클릭 안 된 것들로만 배열 만들기
        const newImageArr = images.filter((image, index) => index !== parseInt(e.target.name));

        setImages([...newImageArr]);
        setCurrentImagesLength(currentImagesLength - 1);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios
                .post('/edit/store', {
                    storeName: storeName,
                    roadAddress: roadAddress,
                    detailAddress: detailAddress,
                    ownerName: ownerName,
                    phoneNumber: phoneNumber,
                    images: images,
                    subText: subText,
                    openHour: openHour,
                })
                .then((res) => {
                    alert(res.data.massage);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Header text="내 가게 정보 수정" link="/mypageOwner"></Header>
            <div className="inputContainer">
                <Formbox>
                        <div className="edit-intro">가게 이름:</div>
                        <div className="edit-box">
                            <input className="edit-input"
                                name="storeName"
                                value={storeName}
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
                        <input className="edit-input"
                            name="roadAddress"
                            value={roadAddress}
                            type="text"
                            onChange={e => setRoadAddress(e.target.value)}
                            placeholder="도로명 주소 검색"
                            required
                            autoComplete="off"
                        />
                        <img style={{cursor: "pointer"}} alt="" src="images/edit_icon.png" onClick={onChangeOpenPost}></img>
                    </div>
                    <div style={{width: "260px"}}>{isOpenPost ? (<DaumPostcode className="daumPost" autoClose onComplete={onCompletePost} />) : null}</div>
                </Formbox>
                <Formbox>
                    <div className="edit-intro">상세 주소:</div>
                    <div className="edit-box">
                        <input className="edit-input"
                            name="detailAddress"
                            value={detailAddress}
                            type="text"
                            onChange={e => setDetailAddress(e.target.value)}
                            placeholder="상세 주소 입력"
                            autoComplete="off"
                        />
                        <img alt="" src="images/edit_icon.png"></img>
                    </div>
                </Formbox>
                <Formbox>
                    <div className="edit-intro">사장님 성함:</div>
                    <div className="edit-box">
                        <input className="edit-input"
                            name="ownerName"
                            value={ownerName}
                            type="text"
                            onChange={onChangeOwnerName}
                            placeholder="사장님 성함 입력"
                            autoComplete="off"
                        />
                        <img alt="" src="images/edit_icon.png"></img>
                    </div>
                </Formbox>
                <Formbox>
                    <div className="edit-intro">가게 전화번호:</div>
                    <div className="edit-box">
                        <input className="edit-input"
                            name="phoneNumber"
                            value={phoneNumber}
                            type="text"
                            onChange={onChangePhoneNumner}
                            placeholder="010-xxxx-xxxx"
                            autoComplete="off"
                        />
                        <img alt="" src="images/edit_icon.png"></img>
                    </div>
                </Formbox>
                <Formbox>
                    <div className="edit-intro">가게 대표 사진
                    <span style={{fontSize: "15px"}}>&#40;최대 3장&#41;</span>:</div>
                    <div className="edit-box">
                        <input style={{display: "none"}}
                            name="image"
                            id="image"
                            type="file"
                            multiple
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={onChangeImage}
                        />
                        <div style={{display: "flex"}}>
                            <label htmlFor="image">
                                <div className="imageBox" style={{cursor: "pointer"}}>
                                    <img style={{paddingTop: "3px"}} alt="" src="images/camera.png"></img>
                                    <span style={{fontSize: "14px"}}>
                                        <span style={{color: "#386FFE"}}>{currentImagesLength}</span>/3
                                    </span>
                                </div>
                            </label>
                            {images && images.map((image, index) => (
                                <div key={index} style={{position: "relative", marginRight: "9px"}}>
                                    <img className="edit-image" alt="" src={image} id={index}></img>
                                    {index === 0 && (
                                        <div className="mainPick">대표 사진</div>
                                    )}
                                    <label htmlFor={index}>
                                        
                                    </label>
                                    <img className="delete-image" alt="" src="images/img_delete.png" name={index} onClick={deleteImage}></img>
                                </div>
                            ))}
                        </div>
                    </div>
                </Formbox>
                <Formbox>
                    <div className="edit-intro">가게 한 줄 소개:</div>
                    <div className="edit-box">
                        <input className="edit-input"
                            name="subText"
                            value={subText}
                            type="text"
                            onChange={e => setSubText(e.target.value)}
                            placeholder="가게 한 줄 소개 입력"
                            autoComplete="off"
                        />
                        <img alt="" src="images/edit_icon.png"></img>
                    </div>
                </Formbox>
                <Formbox>
                    <div className="edit-intro">영업 시간:</div>
                    <div className="edit-box">
                        <input className="edit-input"
                            name="openHour"
                            value={openHour}
                            type="text"
                            onChange={e => setOpenHour(e.target.value)}
                            placeholder="오전 9:00 ~ 오후 9:00 (연중무휴)"
                            autoComplete="off"
                        />
                        <img alt="" src="images/edit_icon.png"></img>
                    </div>
                </Formbox>
            </div>
            <form onSubmit={onSubmit}>
                <div style={{width: "304px", margin: "0 auto"}}>
                    <div className="edit-buttonContainer">
                        <button className="cancelBtn" type="button">
                            취소
                        </button>
                        <button className="editBtn" type="submit"
                            disabled={(isStoreName && isAddress && isOwnerName && isPhoneNumber) ? false : true}>
                            수정
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default StoreInfoEdit;