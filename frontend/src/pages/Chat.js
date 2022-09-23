import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import SockJS from "sockjs-client";
import { MyChatBox, OtherChatBox } from "../components/ChatBox";
import Header from "../components/Header";
import { authState, nameState } from "../state";
import { customAxios } from "./customAxios";
import "./Chat.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";

import SendChatForm from "../components/SendChatForm";

let socket;
let stompClient;
const Chat = () => {
  const [name, setName] = useRecoilState(nameState);
  const [auth, setAuth] = useRecoilState(authState);
  const [chat, setChat] = useState("");
  const [recMessage, setRecMessage] = useState("");
  const [messageList, setMessageList] = useState("");
  const navigate = useNavigate();
  const myRef = useRef();
  const scrollToElement = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });

  //페이지 렌더링 되기 전에 웹소켓 connect
  useEffect(() => {
    //웹소켓 end point 설정
    socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    connect();
    console.log("유즈 이펙트 실행");

    return () => {
      stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (recMessage) {
      scrollToElement();
    }
  }, [recMessage]);

  //사장님 권한으로만 접근 가능
  if (auth !== 2) {
    return <div>사장님이 아니면 접근 불가</div>;
  }

  //websocket connet
  const connect = () => {
    stompClient.connect({}, onConnected, () => {
      console.log("Error");
    });
  };

  //connect 되면 채팅 기록 받아오고 subscribe 열기
  const onConnected = async () => {
    await customAxios.get("/chat/room").then((res) => {
      //여기서 채팅 기록 받아오기
      console.log(res.data);
      setMessageList(res.data.data);
      //받은 roomID를 기반으로 subscribe 주소 열기
      stompClient.subscribe("/topic/public", onMessageReceived);

      console.log("send 이전");
      // 유저 네임을 서버에게 알리기
      stompClient.send(
        "/app/chat/addUser",
        {},
        JSON.stringify({ sender: name, type: "JOIN" })
      );

      console.log("send 이후");
    });
  };

  //message 수신 받을 때
  const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);

    if (message.type === "JOIN") {
      console.log("JOIN!!!");
      setRecMessage((prev) => [...prev, message]);
    } else if (message.type === "LEAVE") {
      console.log("LEAVE!!");
      setRecMessage((prev) => [...prev, message]);
    } else {
      console.log("Chatting: ", message);
      setRecMessage((prev) => [...prev, message]);
      console.log("채팅 받은 이후 e", recMessage);
    }
  };

  const sendMessage = () => {
    if (chat && stompClient) {
      console.log("send 실행됨, chat: ", chat);
      let chatMessage = {
        sender: name,
        content: chat,
        type: "CHAT",
      };
      stompClient.send(
        "/app/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setChat("");
    }
  };

  const onSubmit = () => {
    sendMessage();
  };

  const onChange = (e) => {
    setChat(e.target.value);
  };

  if (!messageList) {
    return <div>로딩 중</div>;
  } else {
    return (
      <div className="allContainer">
        <div className="header">
          <span>채팅</span>
          <button
            className="backBtn"
            onClick={() => {
              //뒤로 가기 클릭 시, Leave 메시지 날리기
              let chatMessage = {
                sender: name,
                type: "LEAVE",
              };
              stompClient.send(
                "/app/chat/sendMessage",
                {},
                JSON.stringify(chatMessage)
              );
              //back btn 클릭 시, 뒤로 가기
              navigate(-1);
            }}
          >
            <MdArrowBackIosNew size={"1.3em"} color="black"></MdArrowBackIosNew>
          </button>

          <button className="rightBtn">
            <Link to={"/"}>
              <AiOutlineClose size={"1.3em"}></AiOutlineClose>
            </Link>
          </button>
        </div>
        <div className="chatContainer">
          {messageList &&
            messageList.map((item, key) => {
              return (
                <div>
                  <div className="dateContainer">
                    <span className="date">{item.date}</span>
                  </div>
                  {item.messages &&
                    item.messages.map((item, key) => {
                      if (item.type === "JOIN") {
                        return (
                          <div className="dateContainer">
                            <span className="date">{item.content}</span>
                          </div>
                        );
                      } else if (item.type === "Leave") {
                        return (
                          <div className="dateContainer">
                            <span className="date">{item.content}</span>
                          </div>
                        );
                      } else if (item.type === "CHAT") {
                        if (item.sender === name) {
                          console.log("내 채팅임 이거");
                          return (
                            <MyChatBox
                              createTime={item.createTime}
                              content={item.content}
                            ></MyChatBox>
                          );
                        } else {
                          return (
                            <OtherChatBox
                              createTime={item.createTime}
                              content={item.content}
                              sender={item.sender}
                            ></OtherChatBox>
                          );
                        }
                      }
                    })}
                </div>
              );
            })}
          {recMessage &&
            recMessage.map((item, key) => {
              if (item.type === "JOIN") {
                return (
                  <div className="dateContainer">
                    <span className="date">{item.content}</span>
                  </div>
                );
              } else if (item.type === "Leave") {
                return (
                  <div className="dateContainer">
                    <span className="date">{item.content}</span>
                  </div>
                );
              } else if (item.type === "CHAT") {
                if (item.sender === name) {
                  console.log("내 채팅임 이거");
                  return (
                    <MyChatBox
                      createTime={item.createTime}
                      content={item.content}
                    ></MyChatBox>
                  );
                } else {
                  return (
                    <OtherChatBox
                      createTime={item.createTime}
                      content={item.content}
                      sender={item.sender}
                    ></OtherChatBox>
                  );
                }
              }
            })}
          <div className="lastElement" ref={myRef}></div>
        </div>
        <SendChatForm onChange={onChange} onSubmit={onSubmit} chat={chat} />
      </div>
    );
  }
};

export default React.memo(Chat);
