import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
 
  const [loggedIn, setLoggedIn] = useState(false);
  
  
  const value = {
    loggedIn,
    setLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;