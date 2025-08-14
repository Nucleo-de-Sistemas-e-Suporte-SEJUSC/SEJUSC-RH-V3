import type { User } from "@/interfaces";
import React from "react";

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);
