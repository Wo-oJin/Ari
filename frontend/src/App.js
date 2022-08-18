import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import LoginRegister from "./components/LoginRegister";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import LoginStore from "./pages/LoginStore";
import SignupUser from "./pages/SignupUser";
import SignupStore from "./pages/SignupStore";
import { RecoilRoot } from "recoil";
import Detail from "./pages/Detail";
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/loginRegister" element={<LoginRegister />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/loginStore" element={<LoginStore />} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/signupStore" element={<SignupStore />} />
          <Route path="/detail/:storeId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
