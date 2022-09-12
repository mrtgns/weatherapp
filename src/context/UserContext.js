import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let isAuth = JSON.parse(localStorage.getItem("user"))
  const [loggedIn, setLoggedIn] = useState( !isAuth === false);
  
  
  const value = {
    loggedIn,
    setLoggedIn,
  };
 
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;