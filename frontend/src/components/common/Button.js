import styled from "styled-components";

const StyledMainButton = styled.button`
  width: 260px;
  height: 41px;
  border-style: initial;
  cursor: pointer;
  &:disabled {
    background: #dcdcdc;
    cursor: default;
  }
  color: ${(props) => props.color || "#ffffff"};
  background: ${(props) => props.background || "#386ffe"};
  font-size: ${(props) => props.fontSize || "16px"};
  border-radius: ${(props) => props.borderRadius || "15px"};
  margin-bottom: ${(props) => props.marginBottom || "10px"};
`;

function MainButton({ children, ...rest }) {
  return <StyledMainButton {...rest}>{children}</StyledMainButton>;
}

const StyledHalfButton = styled.button`
  width: 155px;
  height: 36px;
  color: #fbfbfb;
  border: 0.7px solid #d7d7d7;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 57px;
  background-color: ${(props) => props.backgroundColor};
`;

function HalfButton({ children, ...rest }) {
  return <StyledHalfButton {...rest}>{children}</StyledHalfButton>;
}

const StyledSendButton = styled.button`
  width: 76px;
  line-height: 41px;
  border-style: initial;
  border-radius: 5px;
  color: #ffffff;
  background: #386ffe;
  margin-bottom: 11px;
  margin-left: 12px;
  cursor: pointer;
  &:disabled {
    background-color: #dcdcdc;
    cursor: default;
  }
`;

function SendButton({ children, ...rest }) {
  return <StyledSendButton {...rest}>{children}</StyledSendButton>;
}

const StyledRightButton = styled.button`
  float: right;
  font-size: 16px;
  color: #ffffff;
  background: #386ffe;
  border-radius: 10px;
  cursor: pointer;
  padding: 0 16px;
  line-height: 36px;
  margin-top: 24px;
  &:disabled {
    background-color: #dcdcdc;
    cursor: default;
  }
`;

function RightButton({ children, ...rest }) {
  return <StyledRightButton {...rest}>{children}</StyledRightButton>;
}

const StyledStoreButton = styled.button`
  display: flex;
  align-items: center;
  height: 44px;
  font-size: 20px;
  background-color: #386ffe;
  color: #ffffff;
  border-radius: 20px;
  padding: 6px 7px 6px 16px;
  margin-bottom: 19px;
  cursor: pointer;
`;

function StoreButton({ children, ...rest }) {
  return <StyledStoreButton {...rest}>{children}</StyledStoreButton>;
}

export { MainButton, HalfButton, SendButton, RightButton, StoreButton };
