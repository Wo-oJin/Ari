import styled from "styled-components";
import banner from "../../assets/images/Ari_banner3x.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const StyledBanner = styled.div`
  width: 90%;
  min-height: 80px;
  margin: 15px;
  border-radius: 15px;
  background-image: url(${banner});
  background-size: cover;
`;

function Banner({ children, ...rest }) {
  return <StyledBanner {...rest}>{children}</StyledBanner>;
}

const ArticlesContainer = styled.div`
  width: 90%;
  border-bottom: 1px solid #dbdbdb;
`;

const StyledArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  height: 55px;
  padding: 10px;
  border-top: 1px solid #dbdbdb;
  cursor: pointer;
`;

function Article({ children, ...rest }) {
  return <StyledArticle {...rest}>{children}</StyledArticle>;
}

const StyledTitle = styled.span`
  font-size: 18px;
`;

function Title({ children, ...rest }) {
  return <StyledTitle {...rest}>{children}</StyledTitle>;
}

const Date = styled.span`
  font-size: 14px;
  color: #7c7c7c;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
`;

const StyledWriteBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #386ffe;
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 18px;
`;

function WriteBtn({ children, ...rest }) {
  return <StyledWriteBtn {...rest}>{children}</StyledWriteBtn>;
}

export {
  Container,
  Banner,
  ArticlesContainer,
  Article,
  Title,
  Date,
  BtnContainer,
  WriteBtn,
};
