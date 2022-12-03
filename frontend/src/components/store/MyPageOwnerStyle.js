import styled from "styled-components";

const WelcomeCard = styled.div`
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

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 81px;
  border: 1px solid #d2d2d2;
  border-radius: 25px;
`;

const MidCard = styled.p`
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 3px;
`;

const SubInfo = styled.div`
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

export { WelcomeCard, MainInfo, MidCard, SubInfo, NewItem };
