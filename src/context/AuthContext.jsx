import { createContext, useContext } from "react";

export const AuthContext = createContext();

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);
