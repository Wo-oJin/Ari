import styled from "styled-components";

const CustomContainer = styled.div`
  box-sizing: border-box;
  width: 375px;
  padding: 0 54px;
  margin-top: 95px;
`;

const EventListInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 327px;
  height: 60px;
  border: 0.7px solid #d7d7d7;
  border-radius: 15px;
  margin-bottom: 17px;
  padding: 0 20px;
  cursor: pointer;
`;

const StyledTap = styled.button`
  width: 96px;
  line-height: 26px;
  font-size: 11px;
  border-radius: 20px;
  background-color: #c7c7ca;
  color: #ffffff;
  cursor: pointer;
  margin: 8px 4px 0 4px;
`;

function Tap({ children, ...rest }) {
  return <StyledTap {...rest}>{children}</StyledTap>;
}

const StyledTapActive = styled.button`
  width: 96px;
  line-height: 26px;
  font-size: 11px;
  border-radius: 20px;
  background-color: #386ffe;
  color: #ffffff;
  cursor: pointer;
  margin: 8px 4px 0 4px;
`;

function TapActive({ children, ...rest }) {
  return <StyledTapActive {...rest}>{children}</StyledTapActive>;
}

const StyledPartnershipState = styled.div`
  width: 38px;
  line-height: 20.97px;
  border-radius: 10px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
`;

function PartnershipState({ children, ...rest }) {
  return <StyledPartnershipState {...rest}>{children}</StyledPartnershipState>;
}

const InfoForm = styled.div`
  box-sizing: border-box;
  width: 327px;
  min-height: 213px;
  border: 0.7px solid #d7d7d7;
  border-radius: 15px;
  font-size: 16px;
  padding: 18px 19px;
  outline: none;
  resize: none;
  td {
    padding-bottom: 21px;
    &:first-child {
      width: 100px;
      vertical-align: top;
    }
    &:last-child {
      font-size: 14px;
      color: #4a4a4a;
    }
  }
`;

const Period = styled.div`
  display: flex;
  align-items: center;
  width: 325px;
  height: 45px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 18px;
  input {
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #868585;
    text-align: center;
  }
  &::placeholder {
    color: #868585;
  }
`;

const StyledTextarea = styled.textarea`
  box-sizing: border-box;
  width: 325px;
  height: 330px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  padding: 16px 0;
  outline: none;
  resize: none;
  &::placeholder {
    color: #868585;
  }
`;

function Textarea({ children, ...rest }) {
  return <StyledTextarea {...rest}>{children}</StyledTextarea>;
}

export {
  CustomContainer,
  EventListInfo,
  Tap,
  TapActive,
  PartnershipState,
  InfoForm,
  Period,
  Textarea,
};
