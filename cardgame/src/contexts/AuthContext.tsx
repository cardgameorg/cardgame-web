import { createContext, useContext, useEffect, useState } from "react";
import User from "../lib/entity/User";
import FetchAPI from "../lib/api/fetch";
import { useNavigate } from "react-router";
import { usePopups } from "./PopupContext";

export interface AuthContextType {
    user: User | null;
    login: (username:string, password:string) => void;
    register: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const {addPopup} = usePopups();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await FetchAPI("api/v1/auth/authenticate", "POST", null);
        if (response && response.status === 200) {
          const data = await response.json();
          setUser(data);
          addPopup("Üdv " + data.username + "!")
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login");
      }
    };
    if (user === null) {
      authenticateUser();
    }
  }, [user, navigate]);

  const login = async (username: string, password: string) => {
    try {
      const response = await FetchAPI("api/v1/auth/login", "POST", { username, password });
      if (response && response.status === 200) {
        const data = await response.json();
        setUser(data);
        addPopup("Üdv " + data.username + "!")
        navigate("/game");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await FetchAPI("api/v1/auth/register", "POST", { username, password });
      if (response && response.status === 201) {
        const data = await response.json();
        setUser(data);
        addPopup("Üdv " + data.username + "!")
        navigate("/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await FetchAPI("api/v1/auth/logout", "POST", null);
       
        navigate("/");
        setUser(null);
      
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};