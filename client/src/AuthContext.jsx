import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedin, setsignedin] = useState(false);
  const login = async (token) => {
    try {
      const response = await fetch(
        "https://libraryapp-kappa.vercel.app/profile",
        {
          headers: { authorization: token },
        }
      );
      const data = await response.json();
      setUser(data.user);
      setsignedin(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // toast("Logged Out Successfully");
    setsignedin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signedin,
        setUser,
        setsignedin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
