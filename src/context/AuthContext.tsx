import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string>;
  signup: (name: string, email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database (in a real app, this would be a backend service)
const users: { name: string; email: string; password: string }[] = [];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize auth state from AsyncStorage
  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const login = async (email: string, password: string): Promise<string> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return 'Invalid email or password';
    }

    const userData = { name: foundUser.name, email: foundUser.email };
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return '';
  };

  const signup = async (name: string, email: string, password: string): Promise<string> => {
    if (!name || !email || !password) {
      return 'All fields are required';
    }

    if (!email.includes('@')) {
      return 'Invalid email format';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (users.some(u => u.email === email)) {
      return 'Email already registered';
    }

    users.push({ name, email, password });
    const userData = { name, email };
    setUser(userData);
    await AsyncStorage.setItem(`user-${name?.toLowerCase()}`, JSON.stringify(userData));
    return '';
  };

  const logout = async () => {
    setUser(null);
    // await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};