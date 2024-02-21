import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Library from "./Library";
import SignUp from "./SignUp";
export const AuthContext = createContext();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
