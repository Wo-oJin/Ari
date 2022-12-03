import styled from "styled-components";
import TextEllipsis from "../common/TextEllipsis";

const StoreImg = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 10px;
  margin-right: 10px;
`;

const StoreName = styled.p`
  font-weight: 600;
  margin: 0;
`;

const StoreAddress = styled.span`
  font-size: 14px;
`;

const StyledListBox = styled.div`
  display: flex;
  align-items: center;
  width: 347px;
  height: 73px;
  border-bottom: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 0 12px;
  margin-bottom: 7px;
`;

function ListBox({ image, name, address, ...rest }) {
  return (
    <StyledListBox {...rest}>
      <StoreImg alt="" src={`data:image/;base64,${image}`}></StoreImg>
      <TextEllipsis>
        <StoreName>{name}</StoreName>
        <StoreAddress>{address}</StoreAddress>
      </TextEllipsis>
    </StyledListBox>
  );
}

export const Line = styled.div`
  width: 300px;
  height: 1px;
  background-color: #dcdcdc;
  border-radius: 5px;
  margin: 50px 0;
`;

export default ListBox;
