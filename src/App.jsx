import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./componand/Login";
import Res from "./componand/Res";
import Main from "./componand/main/Main";
import { UserContextProvider } from "./context/userApi";
import { RerenderProvider } from "./context/conertApi";

function App() {
  return (
    <UserContextProvider>
      <RerenderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/res" element={<Res />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </RerenderProvider>
    </UserContextProvider>
  );
}

export default App;
