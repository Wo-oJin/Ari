import { React, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import MainButton from '../components/common/Mainbutton';
import { nicknameState } from '../state';
import { signUserData } from '../services/sign/signUserData';
import Header from '../components/Header';
import "../pages/SignupUser.css";

const Intro = styled.div`
    color: #3D3D3D;
`;

const Input = styled.input`
    width: 230px;
    line-height: 22px;
    border: 1px solid #DCDCDC;
    border-radius: 5px;
    padding: 9px 14px;
    &::placeholder {
        color: #A3A3A3;
    }
`;

const CertificationInput = styled.input`
    width: 142px;
    line-height: 22px;
    border: 1px solid #DCDCDC;
    border-radius: 5px;
    padding: 9px 14px;
    margin-bottom: 21px;
    &::placeholder {
        color: #A3A3A3;
    }
`;

const SendButton = styled.button`
    width: 76px;
    line-height: 41px;
    border-style: initial;
    border-radius: 5px;
    color: #FFFFFF;
    background: #386FFE;
    margin-bottom: 11px;
    margin-left: 12px;
    cursor: pointer;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 83px;
    margin-bottom: 65px;
`;

const Formbox = styled.div`
    margin-bottom: 20px;
    .message {
        font-size: 11px;
        letter-spacing: -1px;
        margin: 0;
        &.success {
            color: #8f8c8b;
        }
        &.error {
            color: #ff2727;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SignupUser = () => {
    const [uNickname, setuNickname] = useRecoilState(nicknameState);

    const navigate = useNavigate();

    // 이메일, 비밀번호, 닉네임, 연령대, 성별
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    // 오류 메세지 상태 저장
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
    const [nicknameMessage, setNicknameMessage] = useState("");

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    // 이메일
    const onChangeEmail = (e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        setEmail(e.target.value);

        if (!emailRegex.test(e.target.value)) {
            setEmailMessage('이메일 형식을 다시 확인해주세요.');
            setIsEmail(false);
        } else {
            setEmailMessage('올바른 이메일 형식입니다.');
            setIsEmail(true);
        }
    };

    // 비밀번호
    const onChangePassword = (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        setPassword(e.target.value);

        if (!passwordRegex.test(e.target.value)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.');
            setIsPassword(false);
        } else {
            setPasswordMessage('안전한 비밀번호입니다.');
            setIsPassword(true);
        }
        // password가 바뀔 때에도 passwordCheck와 일치한지 확인
        if (passwordCheck !== e.target.value) {
            setPasswordCheckMessage('일치하지 않는 비밀번호입니다.');
            setIsPasswordCheck(false);
        } else {
            setPasswordCheckMessage('비밀번호가 일치합니다.');
            setIsPasswordCheck(true);
        }
    };

    // 비밀번호 확인
    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
        // console.log("password>>"+password);
        // console.log("passwordCheck>>"+passwordCheck);
        if (password !== e.target.value) {
            setPasswordCheckMessage('일치하지 않는 비밀번호입니다.');
            setIsPasswordCheck(false);
        } else {
            setPasswordCheckMessage('비밀번호가 일치합니다.');
            setIsPasswordCheck(true);
        }
    };

    // 닉네임
    const onChangeNickname = (e) => {
        setNickname(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 5) {
            setNicknameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
            setIsNickname(false);
        } else {
            setNicknameMessage('올바른 닉네임 형식입니다.');
            setIsNickname(true);
        }
    };

    // 입력한 인증번호
    const [certificationNumber, setCertificationNumber] = useState("");

    const onChangeCertificationNumber = (e) => {
        setCertificationNumber(e.target.value);
    };

    // 인증번호 확인
    const [emailCheckMessage, setEmailCheckMessage] = useState("");
    const [isEmailCheck, setIsEmailCheck] = useState(false);

    // 이메일로 인증번호 보내고, 보낸 인증번호를 emailCode에 저장
    const sendEmailCode = async () => {
        alert('전송되었습니다.');
        if (!isEmail) {
            alert('이메일 주소를 입력해주세요.');
            return false;
        }
        try {
            await axios
                .post("/auth/email", {
                    email: email,
                });
        } catch (e) {
            console.log(e);
        }
    }

    // 인증 확인 눌러서 post 요청 보내면 일치할 경우 200, 이외의 경우에는 400을 응답
    const onEmailCheck = async () => {
        try {
            await axios
                .post("/auth/email-auth", {
                    "code": certificationNumber,
                })
                .then((res) => {
                    if (res.data.state === 200) {
                        // console.log(res.data.state);
                        setEmailCheckMessage('인증에 성공했습니다.');
                        setIsEmailCheck(true);
                    } else {
                        // console.log(res.data.state);
                        setEmailCheckMessage('잘못된 인증번호입니다.');
                        setIsEmailCheck(false);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    // 연령대 드롭다운
    const onChangeAge = (e) => {
        setAge(e.target.value);
    }

    // 성별 라디오
    const onChangeGender = (e) => {
        setGender(e.target.value)
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await signUserData({
            email: email,
            password: password,
            nickname: nickname,
            age: age,
            gender: gender,
        });

        // fetch("auth/signup-user", { // signup User api 주소
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //         nickname: nickname,
        //         age: age,
        //         gender: gender,
        //     }),
        // })
        // .then((response) => {
        //     if (response.status === 200) {
        //         return response.json()
        //     } else {
        //         console.error(`HTTP error! status: ${response.status}`)
        //     }
        // })
        // .then((jsonData) => console.log(jsonData))
        // .catch((error) => console.log(error));

        // setuNickname(result); // recoil

        alert("회원가입이 완료되었습니다.");
        navigate("/login"); // 로그인 공통 페이지로 이동
    }

    return (
        <>
            <Header text="회원가입" link="/"></Header>
            
                <InputContainer>
                    <Formbox>
                        <Intro>이메일 주소</Intro>
                        <Input
                            name="email"
                            value={email}
                            type="email"
                            onChange={onChangeEmail}
                            placeholder="이메일 주소 입력"
                            required
                            autoComplete="off"
                        />
                        {email.length > 0 && <p className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</p>}
                    </Formbox>
                    <Formbox>
                        <Intro>메일 인증</Intro>
                        <div>
                            <CertificationInput
                                name="certificationNumber"
                                value={certificationNumber}
                                type="text"
                                onChange={onChangeCertificationNumber}
                                placeholder="인증번호 입력"
                                required
                                autoComplete="off"
                            />
                            <SendButton onClick={sendEmailCode}>전송</SendButton>
                        </div>
                        <MainButton
                            radius="5px"
                            color="#FFFFFF"
                            background="#386FFE;"
                            onClick={onEmailCheck}
                            disabled={(certificationNumber.length > 0) ? false : true}
                            text="인증 확인"
                        />
                        {certificationNumber.length > 0 && <p className={`message ${isEmailCheck ? 'success' : 'error'}`}>{emailCheckMessage}</p>}
                    </Formbox>
                    <Formbox>
                        <Intro>비밀번호</Intro>
                        <Input
                            name="password"
                            value={password}
                            type="password"
                            onChange={onChangePassword}
                            placeholder="비밀번호 입력"
                            required
                            autoComplete="off"
                        />
                        {password.length > 0 && <p className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</p>}
                    </Formbox>
                    <Formbox>
                        <Intro>비밀번호 확인</Intro>
                        <Input
                            name="passwordCheck"
                            value={passwordCheck}
                            type="password"
                            onChange={onChangePasswordCheck}
                            placeholder="비밀번호 재입력"
                            required
                            autoComplete="off"
                        />
                        {passwordCheck.length > 0 && <p className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{passwordCheckMessage}</p>}
                    </Formbox>
                    <Formbox>
                        {/* 닉네임 중복 확인도 넣어야 할 듯 */}
                        <Intro>닉네임</Intro>
                        <Input
                            name="nickname"
                            value={nickname}
                            type="text"
                            onChange={onChangeNickname}
                            placeholder="닉네임 입력"
                            required
                            autoComplete="off"
                        />
                        {nickname.length > 0 && <p className={`message ${isNickname ? 'success' : 'error'}`}>{nicknameMessage}</p>}
                    </Formbox>
                    
                    <Formbox>
                        <Intro>연령대</Intro>
                        <div style={{width: "260px"}}>
                            <select onChange={onChangeAge} className="age">
                                <option value="10">10대</option>
                                <option value="20">20대</option>
                                <option value="30">30대</option>
                                <option value="40">40대</option>
                                <option value="50">50대</option>
                                <option value="60">60대</option>
                                <option value="70">70대 이상</option>
                            </select>
                        </div>
                    </Formbox>
                    <Formbox>
                        <Intro>성별</Intro>
                        <div style={{width: "260px"}}>
                            <input type="radio" name="gender" value="male" onChange={onChangeGender} required></input>남
                            <input type="radio" name="gender" value="female" onChange={onChangeGender}></input>여
                        </div>
                    </Formbox>
                </InputContainer>
                <form onSubmit={onSubmit}>
                <ButtonContainer>
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#386FFE;"
                        type="submit"
                        disabled={(isNickname && isEmail && isPassword && isPasswordCheck && isEmailCheck) ? false : true}
                        text="회원가입"
                    />
                </ButtonContainer>
            </form>
        </>
    )
}

export default SignupUser;