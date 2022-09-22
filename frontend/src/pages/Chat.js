import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SockJS from "sockjs-client";
import { authState, nameState } from "../state";
import { customAxios } from "./customAxios";

//웹소켓 end point 설정
let socket = new SockJS("http://localhost:8080/ws");
let stompClient = Stomp.over(socket);

const Chat = () => {
  const [name, setName] = useRecoilState(nameState);
  const [auth, setAuth] = useRecoilState(authState);
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState("");

  //페이지 렌더링 되기 전에 웹소켓 connect
  useEffect(() => {
    connect();
  }, []);

  console.log("name", name, auth);

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
    console.log("ㅎㅇㅎㅇ");
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
      console.log("Join " + message.sender);
    } else if (message.type === "LEAVE") {
      console.log("Leave ", message.sender);
    } else {
      console.log("Chatting: ", message.content);
      setMessage((prev) => [...prev, message.content]);
    }
  };
  return <div> chat </div>;
};

export default Chat;
