import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Main from "./components/Main";
import LoginRegister from "./components/LoginRegister";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import LoginOwner from "./pages/LoginOwner";
import SignupUser from "./pages/SignupUser";
import SignupOwner from "./pages/SignupOwner";
import SignupOwner2 from "./pages/SignupOwner2";
import FindPassword from "./pages/FindPassword";
import Kakao from "./services/oauth/Kakao";

import Detail from "./pages/Detail";
import Board from "./pages/Board";
import BoardWrite from "./pages/BoardWrite";
import MyPageOwner from "./pages/MyPageOwner";
import StoreInfoEdit from "./pages/StoreInfoEdit";
import StoreInfoAdd from "./pages/StoreInfoAdd";
import StorePrivateEventList from "./pages/StorePrivateEventList";

import StoreAddPrivateEvent from "./pages/StoreAddPrivateEvent";
import StoreEditPrivateEvent from "./pages/StoreEditPrivateEvent";
import StoreFavoriteList from "./pages/StoreFavoriteList";
import UserFavoriteList from "./pages/UserFavoriteList";

import RedirectLogin from "./pages/RedirectLogin";
import BoardListView from "./pages/BoardListView";
import BoardModify from "./pages/BoardModify";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
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
          <Route path="/findPassword" element={<FindPassword />} />

          <Route path="/auth/code/kakao" element={<Kakao />} />

          <Route path="/board/list" element={<Board />}></Route>
          <Route path="/board/:boardId" element={<Board />}></Route>
          <Route path="/board/write" element={<BoardWrite />}></Route>
          <Route path="/redirectLogin" element={<RedirectLogin />}></Route>

          <Route path="/myPageOwner" element={<MyPageOwner />} />
          <Route path="/storeInfoEdit" element={<StoreInfoEdit />} />
          <Route path="/storeInfoAdd" element={<StoreInfoAdd />} />
          <Route
            path="/storePrivateEventList"
            element={<StorePrivateEventList />}
          />
          <Route
            path="/storeAddPrivateEvent"
            element={<StoreAddPrivateEvent />}
          />
          <Route
            path="/storeEditPrivateEvent"
            element={<StoreEditPrivateEvent />}
          />
          <Route path="/storeFavoriteList" element={<StoreFavoriteList />} />
          <Route path="/userFavoriteList" element={<UserFavoriteList />} />

          <Route
            path="board/list/:articleId"
            element={<BoardListView />}
          ></Route>
          <Route
            path="board/update/:articleId"
            element={<BoardModify />}
          ></Route>
          <Route path="/public/chat" element={<Chat />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
