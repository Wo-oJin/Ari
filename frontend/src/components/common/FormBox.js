import styled from "styled-components";

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

export default Formbox;
