import styled from "styled-components";

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

export { GenderContainer, GenderWrap, Current, Normal };
