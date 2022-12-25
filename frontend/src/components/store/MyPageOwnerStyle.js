import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const StyledWelcomeCard = styled.div`
  display: flex;
  align-items: center;
  width: 327px;
  height: 164px;
  background-color: #386ffe;
  color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 31px;
`;

const Name = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 9px;
`;

const WelcomeText = styled.span`
  font-size: 18px;
`;

const Container = styled.div`
  margin-left: 30px;
`;

function WelcomeCard({ name }) {
  return (
    <StyledWelcomeCard>
      <Container>
        <Name>{name}</Name>
        <WelcomeText>사장님 안녕하세요!</WelcomeText>
      </Container>
    </StyledWelcomeCard>
  );
}

const MidCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 327px;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 81px;
  border: 1px solid #d2d2d2;
  border-radius: 25px;
`;

const MidCardText = styled.p`
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 3px;
`;

const Container2 = styled.div`
  margin: 24px 0;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const NumText = styled.span`
  font-size: 20px;
`;

function MidCard({ coopEventNum, privateEventNum }) {
  return (
    <MidCardContainer>
      <Container2>
        <Link to="/partnership">
          <MainInfo>
            <TextCenter>
              <MidCardText>협력형 제휴</MidCardText>
              <NumText>{coopEventNum}</NumText>
            </TextCenter>
          </MainInfo>
        </Link>
      </Container2>
      <Container2>
        <Link to="/storePrivateEventList">
          <MainInfo>
            <TextCenter>
              <MidCardText>개인 이벤트</MidCardText>
              <NumText>{privateEventNum}</NumText>
            </TextCenter>
          </MainInfo>
        </Link>
      </Container2>
    </MidCardContainer>
  );
}

const StyledSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 327px;
  height: 60px;
  border: 0.7px solid #d7d7d7;
  border-radius: 15px;
`;

const NewItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  height: 15px;
  font-size: 10px;
  color: #ffffff;
  background: #386ffe;
  border-radius: 10px;
  margin-left: 10px;
`;

const Container3 = styled.div`
  display: flex;
  align-items: center;
`;

const SubText = styled.p`
  margin-left: 28px;
`;

function SubInfo({ title, isNew }) {
  return (
    <StyledSubInfo>
      <Container3>
        <SubText>{title}</SubText>
        {isNew === true ? <NewItem>new</NewItem> : null}
      </Container3>
      <IoIosArrowForward
        color="#959595"
        size="20"
        style={{ marginRight: "20px" }}
      />
    </StyledSubInfo>
  );
}

export { WelcomeCard, MidCard, SubInfo };
