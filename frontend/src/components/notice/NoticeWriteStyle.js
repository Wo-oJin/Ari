import styled from "styled-components";

const StyledNoticeWriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  min-height: 520px;
  padding: 15px;
`;

function NoticeWriteContainer({ children, ...rest }) {
  return (
    <StyledNoticeWriteContainer {...rest}>
      {children}
    </StyledNoticeWriteContainer>
  );
}

const StyledNoticeWriteHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 90px;
  margin-bottom: 15px;
`;

function NoticeWriteHeader({ children, ...rest }) {
  return (
    <StyledNoticeWriteHeader {...rest}>{children}</StyledNoticeWriteHeader>
  );
}

const StyledNoticeTitleTag = styled.span`
  font-size: 18px;
  height: 40px;
`;

function NoticeTitleTag({ children, ...rest }) {
  return <StyledNoticeTitleTag {...rest}>{children}</StyledNoticeTitleTag>;
}

const StyledNoticeTitleInput = styled.input`
  max-width: 100%;
  height: 50px;
  border: none;
  font-size: 18px;
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

function NoticeTitleInput({ children, ...rest }) {
  return <StyledNoticeTitleInput {...rest}>{children}</StyledNoticeTitleInput>;
}

const StyledNoticeWriteContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 450px;
`;

function NoticeWriteContentBox({ children, ...rest }) {
  return (
    <StyledNoticeWriteContentBox {...rest}>
      {children}
    </StyledNoticeWriteContentBox>
  );
}

const StyledNoticeWriteContentTag = styled.span`
  font-size: 18px;
  height: 40px;
`;

function NoticeWriteContentTag({ children, ...rest }) {
  return (
    <StyledNoticeWriteContentTag {...rest}>
      {children}
    </StyledNoticeWriteContentTag>
  );
}

const StyledNoticeWriteContentInput = styled.textarea`
  max-width: 100%;
  min-height: 410px;
  border: none;
  font-size: 18px;
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

function NoticeWriteContentInput({ children, ...rest }) {
  return (
    <StyledNoticeWriteContentInput {...rest}>
      {children}
    </StyledNoticeWriteContentInput>
  );
}

const StyledNoticeWriteBtnBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: flex-start;
  max-width: 100%;
  max-height: 45px;
  padding: 0 15px 15px 15px;
`;

function NoticeWriteBtnBox({ children, ...rest }) {
  return (
    <StyledNoticeWriteBtnBox {...rest}>{children}</StyledNoticeWriteBtnBox>
  );
}

const StyledNoticeWriteCompleteBtn = styled.button`
  width: 85px;
  height: 40px;
  background-color: #386ffe;
  color: white;
  border-radius: 10px;
  font-size: 18px;
`;

function NoticeWriteCompleteBtn({ children, ...rest }) {
  return (
    <StyledNoticeWriteCompleteBtn {...rest}>
      {children}
    </StyledNoticeWriteCompleteBtn>
  );
}

export {
  NoticeWriteContainer,
  NoticeWriteHeader,
  NoticeTitleTag,
  NoticeWriteContentTag,
  NoticeTitleInput,
  NoticeWriteContentBox,
  NoticeWriteContentInput,
  NoticeWriteBtnBox,
  NoticeWriteCompleteBtn,
};
