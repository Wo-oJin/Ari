import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import LoginRegister from "./components/LoginRegister";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import LoginOwner from "./pages/LoginOwner";
import SignupUser from "./pages/SignupUser";
import SignupOwner from "./pages/SignupOwner";
import SignupOwner2 from './pages/SignupOwner2';
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/loginRegister" element={<LoginRegister />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/loginOwner" element={<LoginOwner />} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/signupOwner" element={<SignupOwner />} />
          <Route path="/signupOwner2" element={<SignupOwner2 />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
