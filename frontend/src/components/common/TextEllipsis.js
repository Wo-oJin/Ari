import styled from "styled-components";

const StyledTextEllipsis = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.maxWidth};
  padding-left: ${(props) => props.paddingLeft};
`;

function TextEllipsis({ children, ...rest }) {
  return <StyledTextEllipsis {...rest}>{children}</StyledTextEllipsis>;
}
export default TextEllipsis;
