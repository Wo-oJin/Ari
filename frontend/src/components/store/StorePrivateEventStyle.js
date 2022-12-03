import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import TextEllipsis from "../common/TextEllipsis";

const StyledEventForm = styled.textarea`
  box-sizing: border-box;
  width: 327px;
  height: 213px;
  border: 0.7px solid #d7d7d7;
  border-radius: 15px;
  font-size: 16px;
  font-family: "Work Sans";
  padding: 18px 19px;
  outline: none;
  resize: none;
`;

function EventForm({ children, ...rest }) {
  return <StyledEventForm {...rest}>{children}</StyledEventForm>;
}

const StyledEventListInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 327px;
  height: 60px;
  border: 0.7px solid #d7d7d7;
  border-radius: 15px;
  margin-bottom: 17px;
  cursor: pointer;
`;

function EventListInfo({ privateEvent, ...rest }) {
  return (
    <StyledEventListInfo {...rest}>
      <TextEllipsis maxWidth="250px" paddingLeft="28px">
        {privateEvent}
      </TextEllipsis>
      <IoIosArrowForward
        color="#959595"
        size="20"
        style={{ marginRight: "20px" }}
      />
    </StyledEventListInfo>
  );
}

const AddList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 327px;
  height: 60px;
  border: 0.7px dashed #d7d7d7;
  border-radius: 15px;
  cursor: pointer;
`;

export { EventForm, EventListInfo, AddList };
