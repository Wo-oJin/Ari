import styled from "styled-components";
import selectArrow from "../../assets/images/selectArrow.png";

const GenderContainer = styled.div`
  width: 260px;
  margin-top: 9px;
`;

const GenderWrap = styled.div`
  display: inline-flex;
  align-items: center;
  label {
    color: #a3a3a3;
    font-size: 14px;
    margin-right: 29px;
  }
  input[type="radio"],
  input[type="radio"]:checked {
    appearance: none;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 100%;
    margin: 0;
    margin-right: 0.4rem;
  }
  input[type="radio"] {
    background-color: #d9d9d9;
    border: 3px solid #d9d9d9;
  }
  input[type="radio"]:checked {
    background-color: #386ffe;
  }
  &:first-child {
    margin-left: 10px;
  }
`;

const Current = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #386ffe;
  margin-right: 5px;
`;

const Normal = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-right: 5px;
`;

const StyledSelectAge = styled.select`
  width: 140px;
  height: 41px;
  color: #a3a3a3;
  appearance: none;
  background: url(${selectArrow}) calc(100% - 15px) center no-repeat;
  border-radius: 5px;
  padding: 9px 30px;
  border: 1px solid #dcdcdc;
`;

function SelectAge({ children, ...rest }) {
  return <StyledSelectAge {...rest}>{children}</StyledSelectAge>;
}

export { GenderContainer, GenderWrap, Current, Normal, SelectAge };
