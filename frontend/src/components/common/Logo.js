import styled from "styled-components";
import logoText from "../../assets/images/ari_logo_text.png";

const Logo = styled.div`
  width: 97px;
  height: 97px;
  background-image: url(${logoText});
  background-size: cover;
  background-position: center;
  margin: 50px auto;
`;

const SmallLogo = styled.div`
  width: 61px;
  height: 61px;
  background-image: url(${logoText});
  background-size: cover;
`;

export { Logo, SmallLogo };
