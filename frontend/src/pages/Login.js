import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginData } from "../services/login/loginData";
import { emailState, nicknameState } from "../state";

const Input = styled.input`
  width: 230px;
  line-height: 22px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 9px 14px;
  &::placeholder {
    color: #a3a3a3;
  }
`;

const SubContainer = styled.div`
  width: 260px;
  margin: 0 auto;
  font-size: 12px;
  color: #4e514f;
`;

const SubAlign = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginButton = styled.button`
  width: 260px;
  height: 41px;
  border-style: initial;
  border-radius: 15px;
  color: #ffffff;
  margin-bottom: 10px;
  background: #386ffe;
  &:disabled {
    background: #dcdcdc;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Formbox = styled.div`
  position: relative;
  margin-bottom: 20px;
  .message {
    font-size: 11px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -10px;
    left: 0;
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

const Login = () => {
  const [uEmail, setuEmail] = useRecoilState(emailState);
  const [uNickname, setuNickname] = useRecoilState(nicknameState);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await loginData({
      email: email,
      password: password,
    });

    if (result === "") {
      // 해당하는 회원 정보가 없는 경우 로그인 실패
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    } else {
      // 로그인 성공
      setuEmail(result.email); // recoil
      setuNickname(result.nickname); // recoil

      alert("로그인이 완료되었습니다.");
      navigate("/main"); // 메인 페이지로 이동
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Formbox>
            <Input
              name="email"
              value={email}
              type="email"
              onChange={onChange}
              placeholder="이메일 주소 입력"
              required
              autoComplete="off"
            />
          </Formbox>
          <Formbox>
            <Input
              name="password"
              value={password}
              type="password"
              onChange={onChange}
              placeholder="비밀번호 입력"
              required
              autoComplete="off"
            />
          </Formbox>
        </InputContainer>
        <ButtonContainer>
          <LoginButton
            type="submit"
            disabled={!(email !== "" && password !== "")}
          >
            로그인
          </LoginButton>
        </ButtonContainer>
        <SubContainer>
          <SubAlign>
            <Link to="/">
              <span>이메일 회원가입</span>
            </Link>
            <span>이메일 찾기</span>
            <span>비밀번호 찾기</span>
          </SubAlign>
        </SubContainer>
      </form>
    </>
  );
};

export default Login;
