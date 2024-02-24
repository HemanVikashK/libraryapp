import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Library from "./Library";
import SignUp from "./SignUp";
import Userlibrary from "./Userlibrary";
import { AuthProvider } from "./AuthContext";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/Library" element={<Library />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/library" element={<Userlibrary />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
