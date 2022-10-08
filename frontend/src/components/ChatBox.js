import { useEffect } from "react";
import "./ChatBox.css";

export const MyChatBox = ({ content, createTime }) => {
  return (
    <div className="chatBoxContainer">
      <div className="chatBox">
        <div className="leftBox">
          <span className="createTime">{createTime}</span>
        </div>
        <div className="rightBox">
          <span className="myContent">{content}</span>
        </div>
      </div>
    </div>
  );
};

export const OtherChatBox = ({ content, createTime, sender }) => {
  return (
    <div className="otherChatBoxContainer">
      <div className="otherChatBox">
        <div className="otherLeftBox">
          <span className="sender">{sender}</span>
          <span className="otherContent">{content}</span>
        </div>
        <div className="otherRightBox">
          <span className="otherCreateTime">{createTime}</span>
        </div>
      </div>
    </div>
  );
};
