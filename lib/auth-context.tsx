import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      // Check if user already exists
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password: btoa(password), // Simple base64 encoding (not secure - for demo only)
      };

      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

      // Set current user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Find user
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === btoa(password)
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      // Set current user
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
