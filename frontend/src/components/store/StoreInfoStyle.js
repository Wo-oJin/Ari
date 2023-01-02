import styled from "styled-components";
import deleteBtn from "../../assets/images/img_delete.png";

const Intro = styled.p`
  font-size: 19px;
  margin-bottom: 6px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 327px;
  border-bottom: 1px solid #a3a3a3;
  padding: 5px 0;
`;

const StyledInput = styled.input`
  width: 265px;
  border: none;
  outline: none;
  font-size: 16px;
  &::placeholder {
    color: #4e514f;
  }
`;

function Input({ children, ...rest }) {
  return <StyledInput {...rest}>{children}</StyledInput>;
}

const StyledTextarea = styled.textarea`
  width: 265px;
  border: none;
  outline: none;
  font-size: 16px;
  resize: none;
  &::placeholder {
    color: #4e514f;
  }
  height: ${(props) => props.height};
`;

function Textarea({ children, ...rest }) {
  return <StyledTextarea {...rest}>{children}</StyledTextarea>;
}

const StyledImage = styled.img`
  width: 63px;
  height: 63px;
  border-radius: 10px;
`;

function Image({ children, ...rest }) {
  return <StyledImage {...rest}>{children}</StyledImage>;
}

const UploadImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 63px;
  height: 63px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  margin-right: 17px;
  cursor: pointer;
`;

const StyledDeleteImage = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  background-image: url(${deleteBtn});
  background-size: cover;
  top: -3px;
  right: -3px;
  cursor: pointer;
`;

function DeleteImage({ children, ...rest }) {
  return <StyledDeleteImage {...rest}>{children}</StyledDeleteImage>;
}

const MainPick = styled.div`
  position: absolute;
  width: 63px;
  height: 17px;
  background: #386ffe;
  border-radius: 0 0 10px 10px;
  bottom: 5px;
  left: 0;
  font-size: 8px;
  color: #ffffff;
  text-align: center;
  line-height: 17px;
`;

const StyledStoreTap = styled.button`
  display: inline-block;
  width: 96px;
  line-height: 26px;
  border-radius: 20px;
  font-size: 11px;
  color: #ffffff;
  cursor: pointer;
  padding: 0 8px;
  margin: 8px 4px 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) => props.backgroundColor || "#c7c7ca"};
`;

function StoreTap({ children, ...rest }) {
  return <StyledStoreTap {...rest}>{children}</StyledStoreTap>;
}

const AddStoreTap = styled.button`
  width: 96px;
  height: 26px;
  border-radius: 20px;
  border: 0.7px dashed #c7c7ca;
  font-size: 11px;
  color: #ffffff;
  cursor: pointer;
  margin: 8px 4px 0 4px;
  img {
    width: 11px;
  }
`;

export {
  Intro,
  Box,
  Input,
  Textarea,
  Image,
  UploadImage,
  DeleteImage,
  MainPick,
  StoreTap,
  AddStoreTap,
};
