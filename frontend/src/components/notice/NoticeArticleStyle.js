import styled from "styled-components";

const StyledNoticeArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 15px;
  height: 600px;
  border-bottom: 1px solid #dbdbdb;
`;

function NoticeArticleContainer({ children, ...rest }) {
  return (
    <StyledNoticeArticleContainer {...rest}>
      {children}
    </StyledNoticeArticleContainer>
  );
}

const StyledNoticeArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  height: 15%;
  margin-top: 10px;
  border-bottom: 1px solid #dbdbdb;
`;

function NoticeArticleHeader({ children, ...rest }) {
  return (
    <StyledNoticeArticleHeader {...rest}>{children}</StyledNoticeArticleHeader>
  );
}

const StyledNoticeArticleTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;

function NoticeArticleTitle({ children, ...rest }) {
  return (
    <StyledNoticeArticleTitle {...rest}>{children}</StyledNoticeArticleTitle>
  );
}

const StyledNoticeArticleDate = styled.span`
  color: #757474;
`;

function NoticeArticleDate({ children, ...rest }) {
  return (
    <StyledNoticeArticleDate {...rest}>{children}</StyledNoticeArticleDate>
  );
}

const StyledNoticeArticleContent = styled.div`
  width: 95%;
  height: 85%;
  padding: 10px;
`;

function NoticeArticleContent({ children, ...rest }) {
  return (
    <StyledNoticeArticleContent {...rest}>
      {children}
    </StyledNoticeArticleContent>
  );
}

const StyledNoticeArticleText = styled.span`
  width: 350px;
  height: 100%;
  word-break: keep-all;
  white-space: pre-line;
`;

function NoticeArticleText({ children, ...rest }) {
  return (
    <StyledNoticeArticleText {...rest}>{children}</StyledNoticeArticleText>
  );
}

const StyledNoticeModifyBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #386ffe;
  color: white;
  border-radius: 10px;
  font-size: 18px;
`;

function NoticeModifyBtn({ children, ...rest }) {
  return <StyledNoticeModifyBtn {...rest}>{children}</StyledNoticeModifyBtn>;
}

const StyledNoticedeleteBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #d86f6f;
  color: white;
  border-radius: 10px;
  font-size: 18px;
  margin-left: 10px;
`;

function NoticedeleteBtn({ children, ...rest }) {
  return <StyledNoticedeleteBtn {...rest}>{children}</StyledNoticedeleteBtn>;
}

export {
  NoticeArticleContainer,
  NoticeArticleHeader,
  NoticeArticleTitle,
  NoticeArticleDate,
  NoticeArticleContent,
  NoticeArticleText,
  NoticeModifyBtn,
  NoticedeleteBtn,
};
