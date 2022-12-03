import styled from "styled-components";

const StyledInput = styled.input`
  width: 230px;
  line-height: 22px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 9px 14px;
  &::placeholder {
    color: #a3a3a3;
  }
  margin-bottom: ${(props) => props.marginBottom};
  font-size: ${(props) => props.fontSize};
`;

function Input({ children, ...rest }) {
  return <StyledInput {...rest}>{children}</StyledInput>;
}

const StyledShortInput = styled.input`
  width: 142px;
  line-height: 22px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 9px 14px;
  &::placeholder {
    color: #a3a3a3;
  }
  margin-bottom: ${(props) => props.marginBottom};
  text-transform: ${(props) => props.textTransform};
`;

function ShortInput({ children, ...rest }) {
  return <StyledShortInput {...rest}>{children}</StyledShortInput>;
}

export { Input, ShortInput };
