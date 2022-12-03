import styled from "styled-components";

const StyledKakao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 41px;
  color: #181600;
  background: #fee500;
  border-radius: 15px;
  margin-bottom: 11px;
  cursor: pointer;
`;

function Kakao({ children, ...rest }) {
  return <StyledKakao {...rest}>{children}</StyledKakao>;
}

const StyledNaver = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 41px;
  color: #ffffff;
  background: #03c75a;
  border-radius: 15px;
  margin-bottom: 11px;
  cursor: pointer;
`;

function Naver({ children, ...rest }) {
  return <StyledNaver {...rest}>{children}</StyledNaver>;
}

export { Kakao, Naver };
