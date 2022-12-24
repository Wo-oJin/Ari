import styled from "styled-components";
import banner from "../../assets/images/Ari_banner3x.png";

const StyledNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

function NoticeContainer({ children, ...rest }) {
  return <StyledNoticeContainer {...rest}>{children}</StyledNoticeContainer>;
}

const StyledNoticeBanner = styled.div`
  width: 90%;
  min-height: 80px;
  margin: 15px;
  border-radius: 15px;
  background-image: url(${banner});
  background-size: cover;
`;

function NoticeBanner({ children, ...rest }) {
  return <StyledNoticeBanner {...rest}>{children}</StyledNoticeBanner>;
}

const StyledNoticeArticlesContainer = styled.div`
  width: 90%;
  border-bottom: 1px solid #dbdbdb;
`;

function NoticeArticlesContainer({ children, ...rest }) {
  return (
    <StyledNoticeArticlesContainer {...rest}>
      {children}
    </StyledNoticeArticlesContainer>
  );
}

const StyledNoticeArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  height: 55px;
  padding: 10px;
  border-top: 1px solid #dbdbdb;
  cursor: pointer;
`;

function NoticeArticle({ children, ...rest }) {
  return <StyledNoticeArticle {...rest}>{children}</StyledNoticeArticle>;
}

const StyledNoticeTitle = styled.span`
  font-size: 18px;
`;

function NoticeTitle({ children, ...rest }) {
  return <StyledNoticeTitle {...rest}>{children}</StyledNoticeTitle>;
}

const StyledNoticeDate = styled.span`
  font-size: 14px;
  color: #7c7c7c;
`;

function NoticeDate({ children, ...rest }) {
  return <StyledNoticeDate {...rest}>{children}</StyledNoticeDate>;
}

const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
`;

function BtnContainer({ children, ...rest }) {
  return <StyledBtnContainer {...rest}>{children}</StyledBtnContainer>;
}

const StyledNoticeWriteBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #386ffe;
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 18px;
`;

function NoticeWriteBtn({ children, ...rest }) {
  return <StyledNoticeWriteBtn {...rest}>{children}</StyledNoticeWriteBtn>;
}

export {
  NoticeContainer,
  NoticeBanner,
  NoticeArticlesContainer,
  NoticeArticle,
  NoticeTitle,
  NoticeDate,
  BtnContainer,
  NoticeWriteBtn,
};
