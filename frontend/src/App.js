import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";

import Main from "./components/Main";
import LoginRegister from "./components/LoginRegister";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import LoginOwner from "./pages/LoginOwner";
// import RedirectLogin from "./pages/RedirectLogin";
import Kakao from "./services/oauth/Kakao";
import Naver from "./services/oauth/Naver";
import SignupUser from "./pages/SignupUser";
import SignupOwner from "./pages/SignupOwner";
import SignupOwner2 from "./pages/SignupOwner2";
import FindPassword from "./pages/FindPassword";
import Detail from "./pages/Detail";
import MyPageOwner from "./pages/MyPageOwner";
import StoreInfoEdit from "./pages/StoreInfoEdit";
import StoreInfoAdd from "./pages/StoreInfoAdd";
import StorePrivateEventList from "./pages/StorePrivateEventList";
import UserFavoriteList from "./pages/UserFavoriteList";
import StoreAddPrivateEvent from "./pages/StoreAddPrivateEvent";
import StoreEditPrivateEvent from "./pages/StoreEditPrivateEvent";
import StoreFavoriteList from "./pages/StoreFavoriteList";
import UserFavoriteList from "./pages/UserFavoriteList";
import Partnership from "./pages/Partnership";
import PartnershipList from "./pages/PartnershipList";
import PartnershipWrite from "./pages/PartnershipWrite";
import PartnershipView from "./pages/PartnershipView";

import Board from "./pages/Board";
import BoardWrite from "./pages/BoardWrite";
import BoardListView from "./pages/BoardListView";
import BoardModify from "./pages/BoardModify";
import Chat from "./pages/Chat";
import Category from "./pages/Category";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:storeId" element={<Detail />} />
        <Route path="/store/category/:categoryId" element={<Category />} />

        {/* 비회원 페이지 권한 설정 : auth=0 */}
        <Route
          path="/loginRegister"
          element={AuthRoute(0, <LoginRegister />)}
        />
        <Route path="/login" element={AuthRoute(0, <Login />)} />
        <Route path="/loginUser" element={AuthRoute(0, <LoginUser />)} />
        <Route path="/loginOwner" element={AuthRoute(0, <LoginOwner />)} />
        {/* <Route path="/redirectLogin" element={<RedirectLogin />} /> */}
        <Route path="/auth/code/kakao" element={AuthRoute(0, <Kakao />)} />
        <Route path="/auth/naver/login" element={AuthRoute(0, <Naver />)} />
        <Route path="/signupUser" element={AuthRoute(0, <SignupUser />)} />
        <Route path="/signupOwner" element={AuthRoute(0, <SignupOwner />)} />
        <Route path="/signupOwner2" element={AuthRoute(0, <SignupOwner2 />)} />
        <Route path="/findPassword" element={AuthRoute(0, <FindPassword />)} />

        {/* 손님 페이지 권한 설정 : auth=1 */}
        <Route
          path="/userFavoriteList"
          element={AuthRoute(1, <UserFavoriteList />)}
        />

        {/* 사장님 페이지 권한 설정 : auth=2 */}
        <Route path="/myPageOwner" element={AuthRoute(2, <MyPageOwner />)} />
        <Route path="/storeInfoAdd" element={AuthRoute(2, <StoreInfoAdd />)} />
        <Route
          path="/storeInfoEdit"
          element={AuthRoute(2, <StoreInfoEdit />)}
        />
        <Route
          path="/storePrivateEventList"
          element={AuthRoute(2, <StorePrivateEventList />)}
        />
        <Route
          path="/storeAddPrivateEvent"
          element={AuthRoute(2, <StoreAddPrivateEvent />)}
        />
        <Route
          path="/storeEditPrivateEvent"
          element={AuthRoute(2, <StoreEditPrivateEvent />)}
        />
        <Route
          path="/storeFavoriteList"
          element={AuthRoute(2, <StoreFavoriteList />)}
        />
        <Route path="/public/chat" element={<Chat />}></Route>
        <Route path="/board/list" element={AuthRoute(2, <Board />)} />
        <Route path="/board/:boardId" element={AuthRoute(2, <Board />)} />
        <Route path="/board/write" element={AuthRoute(2, <BoardWrite />)} />
        <Route
          path="board/list/:articleId"
          element={AuthRoute(2, <BoardListView />)}
        />
        <Route
          path="board/update/:articleId"
          element={AuthRoute(2, <BoardModify />)}
        />
          <Route path="/partnership" element={AuthRoute(2, <Partnership />)} />
          <Route path="/partnershipList" element={AuthRoute(2, <PartnershipList />)} />
          <Route path="/partnershipWrite" element={AuthRoute(2, <PartnershipWrite />)} />
          <Route path="/partnershipView" element={AuthRoute(2, <PartnershipView />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
