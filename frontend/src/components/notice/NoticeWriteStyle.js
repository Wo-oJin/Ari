import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  min-height: 520px;
  padding: 15px;
`;

const WriteHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 90px;
  margin-bottom: 15px;
`;

const TitleTag = styled.span`
  font-size: 18px;
  height: 40px;
`;

const StyledTitleInput = styled.input`
  max-width: 100%;
  height: 50px;
  border: none;
  font-size: 18px;
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

function TitleInput({ children, ...rest }) {
  return <StyledTitleInput {...rest}>{children}</StyledTitleInput>;
}

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 450px;
`;

const ContentTag = styled.span`
  font-size: 18px;
  height: 40px;
`;

const StyledContentInput = styled.textarea`
  max-width: 100%;
  min-height: 410px;
  border: none;
  font-size: 18px;
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

function ContentInput({ children, ...rest }) {
  return <StyledContentInput {...rest}>{children}</StyledContentInput>;
}

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: flex-start;
  max-width: 100%;
  max-height: 45px;
  padding: 0 15px 15px 15px;
`;

const StyledCompleteBtn = styled.button`
  width: 85px;
  height: 40px;
  background-color: #386ffe;
  color: white;
  border-radius: 10px;
  font-size: 18px;
`;

function CompleteBtn({ children, ...rest }) {
  return <StyledCompleteBtn {...rest}>{children}</StyledCompleteBtn>;
}

export {
  Container,
  WriteHeader,
  TitleTag,
  ContentTag,
  TitleInput,
  ContentBox,
  ContentInput,
  BtnBox,
  CompleteBtn,
};
