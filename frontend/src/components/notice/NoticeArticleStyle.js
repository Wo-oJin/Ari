import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 15px;
  height: 600px;
  border-bottom: 1px solid #dbdbdb;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  height: 15%;
  margin-top: 10px;
  border-bottom: 1px solid #dbdbdb;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Date = styled.span`
  color: #757474;
`;

const Content = styled.div`
  width: 95%;
  height: 85%;
  padding: 10px;
`;

const Text = styled.span`
  width: 350px;
  height: 100%;
  word-break: keep-all;
  white-space: pre-line;
`;

function Article({ title, createDate, content }) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Date>{createDate}</Date>
      </Header>
      <Content>
        <Text>{content}</Text>
      </Content>
    </Container>
  );
}

const StyledModifyBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #386ffe;
  color: white;
  border-radius: 10px;
  font-size: 18px;
`;

function ModifyBtn({ children, ...rest }) {
  return <StyledModifyBtn {...rest}>{children}</StyledModifyBtn>;
}

const StyledDeleteBtn = styled.button`
  width: 75px;
  height: 40px;
  background-color: #d86f6f;
  color: white;
  border-radius: 10px;
  font-size: 18px;
  margin-left: 10px;
`;

function DeleteBtn({ children, ...rest }) {
  return <StyledDeleteBtn {...rest}>{children}</StyledDeleteBtn>;
}

export { Article, ModifyBtn, DeleteBtn };
