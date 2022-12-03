import styled from "styled-components";
import { CenterContainer } from "../common/Container";

const StyledLoginSubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  font-size: 14px;
  color: #4e514f;
`;

function LoginSubMenu({ children, ...rest }) {
  return (
    <CenterContainer>
      <StyledLoginSubMenu {...rest}>{children}</StyledLoginSubMenu>
    </CenterContainer>
  );
}

export { LoginSubMenu };
