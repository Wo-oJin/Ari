import styled from "styled-components";
import logoText from "../../assets/images/ari_logo_text.png";

const StyledFooter = styled.div`
  background: #f1f1f1;
  color: #a2a2a2;
  margin-top: 30px;
  padding: 17px 23px;
  p {
    font-size: 12px;
    padding-bottom: 17px;
    margin: 0;
  }
  td {
    font-size: 9px;
    padding-right: 9px;
  }
`;

const FooterLogo = styled.div`
  width: 48px;
  height: 48px;
  background: url(${logoText});
  background-size: cover;
  filter: grayscale(100%);
  margin-right: 10px;
`;

function Footer({ children, ...rest }) {
  return <StyledFooter {...rest}>{children}</StyledFooter>;
}

export { Footer, FooterLogo };
