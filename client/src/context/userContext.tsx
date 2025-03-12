import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

export interface UserProfile {
  user_id: string;
  email: string;
  name: string;
  family_name: string;
  avatar: string;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  // logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await fetch("http://localhost:5000/api/users/profile/me", {
        const response = await fetch("http://localhost:5000/api/users/profile/1", {
        method: "GET",
          // credentials: "include",
        });
        const data = await response.json();
        console.log("Fetched user profile:", data);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);

        // If unauthorized, reset user state
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  // // Logout function to clear user state
  // const logout = async () => {
  //   try {
  //     await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  //   setUser(null); // Clear user state after logout
  // };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
