import React from "react";
import { IoSendSharp } from "react-icons/io5";
const SendChatForm = ({ onChange, onSubmit, chat }) => {
  return (
    <div className="sendMessageContainer">
      <div className="sendBox">
        <input
          className="sendInput"
          onChange={onChange}
          value={chat}
          type="text"
        ></input>
        <button className="chatSendBtn" type="submit" onClick={onSubmit}>
          <IoSendSharp size={"2.0em"} color={"#727171"}></IoSendSharp>
        </button>
      </div>
    </div>
  );
};

export default React.memo(SendChatForm);
