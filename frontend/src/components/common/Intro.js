import styled from "styled-components";

const Intro = styled.p`
  font-size: 16px;
  color: #3d3d3d;
  margin: 0;
`;

const StyledBigIntro = styled.p`
  font-size: 30px;
  margin-bottom: ${(props) => props.marginBottom || "0"};
`;

function BigIntro({ children, ...rest }) {
  return <StyledBigIntro {...rest}>{children}</StyledBigIntro>;
}

export { Intro, BigIntro };
