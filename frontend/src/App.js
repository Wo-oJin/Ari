import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import LoginRegister from "./components/LoginRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/loginRegister" element={<LoginRegister />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
