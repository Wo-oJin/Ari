import { React, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import MainButton from '../components/common/Mainbutton';
import Header from '../components/Header';
import "../pages/SignupOwner.css";

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

const SignupOwner = () => {
    // 이메일, 비밀번호, 연령대, 성별
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [age, setAge] = useState("20");
    const [gender, setGender] = useState("male");

    // 입력한 인증번호
    const [certificationNumber, setCertificationNumber] = useState("");

    // 오류 메세지 상태 저장
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);

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

    // 인증번호 확인
    const [emailCheckMessage, setEmailCheckMessage] = useState("");
    const [isEmailCheck, setIsEmailCheck] = useState(false);

    // 이메일로 인증번호 보내기
    const sendEmailCode = async () => {
        if (!isEmail) {
            alert('이메일 주소를 확인해주세요.');
            return false;
        }
        alert('전송되었습니다.');
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
                        setEmailCheckMessage(res.data.massage);
                        setIsEmailCheck(false);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    const data = {
        email: email,
        password: password,
        age: age,
        gender: gender,
    }

    return (
        <>
            <Header text="회원가입" link="/loginOwner"></Header>
            <div className="inputContainer">
                <Formbox>
                    <div className="intro">이메일 주소</div>
                    <input className="inputBox"
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
                    <div className="intro">메일 인증</div>
                    <div>
                        <input className="certificationInput"
                            name="certificationNumber"
                            value={certificationNumber}
                            type="text"
                            onChange={e => setCertificationNumber(e.target.value)}
                            placeholder="인증번호 입력"
                            required
                            autoComplete="off"
                        />
                        <button className="sendBtn" onClick={sendEmailCode}>전송</button>
                    </div>
                    <MainButton
                        radius="5px"
                        color="#FFFFFF"
                        background="#386FFE;"
                        onClick={onEmailCheck}
                        disabled={(certificationNumber.length > 0 && !isEmailCheck) ? false : true}
                        text="인증 확인"
                    />
                    {certificationNumber.length > 0 && <p className={`message ${isEmailCheck ? 'success' : 'error'}`}>{emailCheckMessage}</p>}
                </Formbox>
                <Formbox>
                    <div className="intro">비밀번호</div>
                    <input className="inputBox"
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
                    <div className="intro">비밀번호 확인</div>
                    <input className="inputBox"
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
                    <div className="intro">연령대</div>
                    <div style={{width: "260px"}}>
                        <select onChange={e => setAge(e.target.value)} className="select-age" defaultValue="20">
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
                    <div className="intro">성별</div>
                    <div className="genderContainer">
                        <div className="gender-wrap">
                            <input type="radio" name="gender" value="male" id="male" onChange={e => setGender(e.target.value)} defaultChecked></input>
                            <label htmlFor="male">남</label>
                        </div>
                        <div className="gender-wrap">
                            <input type="radio" name="gender" value="female" id="female" onChange={e => setGender(e.target.value)}></input>
                            <label htmlFor="female">여</label>
                        </div>
                    </div>
                </Formbox>
            </div>
            <div className="flexContainer">
                <div className="current"></div>
                <div className="normal"></div>
            </div>
            <Link to="/signupOwner2" state={{ data: data }}>
                <div className="buttonContainer">
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#386FFE;"
                        type="submit"
                        disabled={(isEmail && isPassword && isPasswordCheck && isEmailCheck) ? false : true}
                        // disabled={(isEmail && isPassword && isPasswordCheck) ? false : true}
                        text="다음"
                    />
                </div>
            </Link>
        </>
    )
}

export default SignupOwner;