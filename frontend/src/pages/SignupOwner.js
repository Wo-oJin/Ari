import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../pages/SignupOwner.css";
import useHistoryState from "use-history-state";
import { Container, CenterContainer } from "../components/common/Container";
import Formbox from "../components/common/FormBox";
import { Intro } from "../components/common/Intro";
import { Input, ShortInput } from "../components/common/Input";
import { MainButton, SendButton } from "../components/common/Button";
import {
  GenderContainer,
  GenderWrap,
  Current,
  Normal,
} from "../components/signup/SignupStyle";

const SignupOwner = () => {
  // 이메일, 비밀번호, 연령대, 성별
  // use-history-state hook : 뒤로가기 시 입력값 유지하기 위함
  const [email, setEmail] = useHistoryState("", "email");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [age, setAge] = useHistoryState("20", "age");
  const [gender, setGender] = useHistoryState("male", "gender");

  // 입력한 인증번호
  const [certificationNumber, setCertificationNumber] = useHistoryState(
    "",
    "certificationNumber"
  );
  const [sendText, setSendText] = useHistoryState("전송", "sendText");

  // 오류 메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useHistoryState(false, "isEmail");
  const [isUniqueEmail, setIsUniqueEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // 인증번호 확인
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const navigate = useNavigate();

  // 이메일
  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(e.target.value);

    if (!emailRegex.test(e.target.value)) {
      setEmailMessage("이메일 형식을 다시 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다.");
      setIsEmail(true);
    }
  };

  // 이메일 중복 확인
  const checkEmail = async () => {
    try {
      const { data } = await axios.post("/auth/check-email", {
        email,
      });

      if (data.result === "success") {
        setEmailMessage("사용 가능한 이메일입니다.");
        setIsUniqueEmail(true);
      } else {
        setEmailMessage(data.massage);
        setIsUniqueEmail(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 비밀번호
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }

    // password가 바뀔 때에도 passwordCheck와 일치한지 확인
    if (passwordCheck !== e.target.value) {
      setPasswordCheckMessage("일치하지 않는 비밀번호입니다.");
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setIsPasswordCheck(true);
    }
  };

  // 비밀번호 확인
  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);

    if (password !== e.target.value) {
      setPasswordCheckMessage("일치하지 않는 비밀번호입니다.");
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setIsPasswordCheck(true);
    }
  };

  // 이메일로 인증번호 보내기
  const sendEmailCode = async () => {
    alert("전송되었습니다."); // 전송까지 시간이 좀 걸리지만 일단 전송 확인 메세지부터 띄움
    setSendText("재전송");

    try {
      await axios.post("/auth/email", {
        email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 인증 확인 눌러서 post 요청 보내면 일치할 경우 200, 이외의 경우에는 400을 응답
  const onEmailCheck = async () => {
    try {
      const { data } = await axios.post("/auth/email-auth", {
        code: certificationNumber.toUpperCase(),
      });

      if (data.state === 200) {
        setEmailCheckMessage("인증에 성공했습니다.");
        setIsEmailCheck(true);
      } else {
        setEmailCheckMessage(data.massage);
        setIsEmailCheck(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const data = {
    email: email,
    password: password,
    age: age,
    gender: gender,
  };

  const onNext = () => {
    navigate("/signupOwner2", { state: data });
  };

  return (
    <>
      <Header text="회원가입" back={true}></Header>
      <Container marginTop="30px" marginBottom="30px">
        <Formbox>
          <Intro>이메일 주소</Intro>
          <div>
            <ShortInput
              name="email"
              value={email}
              type="email"
              onChange={onChangeEmail}
              placeholder="이메일 주소 입력"
              required
            />
            <SendButton onClick={checkEmail} disabled={isEmail ? false : true}>
              중복 확인
            </SendButton>
          </div>
          {email.length > 0 && (
            <p className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </p>
          )}
        </Formbox>
        <Formbox>
          <Intro>메일 인증</Intro>
          <div>
            <ShortInput
              marginBottom="21px"
              textTransform="uppercase"
              name="certificationNumber"
              value={certificationNumber}
              type="text"
              onChange={(e) => setCertificationNumber(e.target.value)}
              placeholder="인증번호 입력"
              required
            />
            <SendButton
              onClick={sendEmailCode}
              disabled={isEmail && isUniqueEmail ? false : true}
            >
              {sendText}
            </SendButton>
          </div>
          <MainButton
            borderRadius="5px"
            onClick={onEmailCheck}
            disabled={
              certificationNumber.length > 0 && !isEmailCheck ? false : true
            }
          >
            인증 확인
          </MainButton>
          {certificationNumber.length > 0 && (
            <p className={`message ${isEmailCheck ? "success" : "error"}`}>
              {emailCheckMessage}
            </p>
          )}
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
          />
          {password.length > 0 && (
            <p className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </p>
          )}
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
          />
          {passwordCheck.length > 0 && (
            <p className={`message ${isPasswordCheck ? "success" : "error"}`}>
              {passwordCheckMessage}
            </p>
          )}
        </Formbox>
        <Formbox>
          <Intro>연령대</Intro>
          <div style={{ width: "260px" }}>
            <select
              name="age"
              onChange={(e) => setAge(e.target.value)}
              className="select-age"
              defaultValue={age}
            >
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
          <GenderContainer>
            <GenderWrap>
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={(e) => setGender(e.target.value)}
                defaultChecked={gender === "male" ? true : false}
              ></input>
              <label htmlFor="male">남</label>
            </GenderWrap>
            <GenderWrap>
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={(e) => setGender(e.target.value)}
                defaultChecked={gender === "female" ? true : false}
              ></input>
              <label htmlFor="female">여</label>
            </GenderWrap>
          </GenderContainer>
        </Formbox>
      </Container>
      <CenterContainer>
        <Current />
        <Normal />
      </CenterContainer>
      <Container marginTop="9px">
        <MainButton
          borderRadius="15px"
          type="submit"
          onClick={onNext}
          disabled={
            isEmail &&
            isUniqueEmail &&
            isPassword &&
            isPasswordCheck &&
            isEmailCheck
              ? false
              : true
          }
        >
          다음
        </MainButton>
      </Container>
    </>
  );
};

export default SignupOwner;
