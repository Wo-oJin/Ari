import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import LoginRegister from "./components/LoginRegister";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import LoginOwner from "./pages/LoginOwner";
import SignupUser from "./pages/SignupUser";
import SignupOwner from "./pages/SignupOwner";
import SignupOwner2 from "./pages/SignupOwner2";
import { RecoilRoot } from "recoil";
import Detail from "./pages/Detail";

import { reissue } from "./services/jwt/reissue";

import RedirectLogin from "./pages/RedirectLogin";

import { reissue } from './services/jwt/reissue';
import Board from "./pages/Board";
import BoardWrite from "./pages/BoardWrite";
import MyPageOwner from './pages/MyPageOwner';
import { StoreInfoTap } from './components/DatailTap';
import StoreInfoEdit from './pages/StoreInfoEdit';
import StorePrivateEventList from './pages/StorePrivateEventList';
import RedirectLogin from './pages/RedirectLogin';
import StoreAddPrivateEvent from './pages/StoreAddPrivateEvent';
import StoreEditPrivateEvent from './pages/StoreEditPrivateEvent';


function App() {
  useEffect(() => {
    // 처음 렌더링될 때 한 번 실행
    const a = async () => {
      const result = await reissue(); // 토큰 갱신 요청

      if (result.result === "fail") {
        console.log(result.massage);
      } else {
        console.log(result.massage);
      }
    };
    a();
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/loginRegister" element={<LoginRegister />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/loginOwner" element={<LoginOwner />} />
          <Route path="/redirectLogin" element={<RedirectLogin />} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/detail/:storeId" element={<Detail />} />
          <Route path="/signupOwner" element={<SignupOwner />} />
          <Route path="/signupOwner2" element={<SignupOwner2 />} />

          <Route path="/board/list" element={<Board />}></Route>
          <Route path="/board/:boardId" element={<Board />}></Route>
          <Route path="/board/write" element={<BoardWrite />}></Route>
          <Route path="/redirectLogin" element={<RedirectLogin />}></Route>

          <Route path="/myPageOwner" element={<MyPageOwner />} />
          <Route path="/storeInfoEdit" element={<StoreInfoEdit />} />
          <Route path="/storePrivateEventList" element={<StorePrivateEventList />} />
          <Route path="/storeAddPrivateEvent" element={<StoreAddPrivateEvent />} />
          <Route path="/storeEditPrivateEvent" element={<StoreEditPrivateEvent />} />

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
