import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

function Container({ children, ...rest }) {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
}

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.width};
`;

function SpaceBetweenContainer({ children, ...rest }) {
  return (
    <StyledSpaceBetweenContainer {...rest}>
      {children}
    </StyledSpaceBetweenContainer>
  );
}

export { Container, CenterContainer, SpaceBetweenContainer };
