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

const StyledColumnEndContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

function ColumnEndContainer({ children, ...rest }) {
  return (
    <StyledColumnEndContainer {...rest}>{children}</StyledColumnEndContainer>
  );
}

const StyledCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CenterContainer({ children, ...rest }) {
  return <StyledCenterContainer {...rest}>{children}</StyledCenterContainer>;
}

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

export {
  Container,
  ColumnEndContainer,
  CenterContainer,
  SpaceBetweenContainer,
};
