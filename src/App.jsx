import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./componand/Login";
import Res from "./componand/Res";
import Main from "./componand/main/Main";
import { UserContextProvider } from "./context/userApi";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/res" element={<Res />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
