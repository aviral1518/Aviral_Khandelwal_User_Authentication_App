import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<string>;
  signup: (name: string, email: string, password: string) => Promise<string>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<string> => {
    let allUserData: UserData[] = [];
    const usersData = await AsyncStorage.getItem('userData');
    
    if (usersData) {
      allUserData = JSON.parse(usersData);
    }
    
    const foundUser = allUserData.find(
      (u: UserData) => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      return 'Invalid email or password';
    }

    const userData = { name: foundUser.name, email: foundUser.email };
    setUser(userData);
    await AsyncStorage.setItem('activeUser', JSON.stringify(userData));
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

    // Get existing users from AsyncStorage
    const existingUsersStr = await AsyncStorage.getItem('userData');
    let existingUsers: Array<{ id: string; name: string; email: string; password: string }> = [];
    
    if (existingUsersStr) {
      existingUsers = JSON.parse(existingUsersStr);
    }

    // Check if email already exists
    if (existingUsers.some(u => u.email === email)) {
      return 'Email already registered';
    }

    // Add new user to the array
    const newUser = { id: `user-${name?.toLowerCase()}`, name, email, password };
    existingUsers.push(newUser);
    
    // Save updated users array
    await AsyncStorage.setItem('userData', JSON.stringify(existingUsers));
    
    // Set active user
    const userData = { name, email };
    setUser(userData);
    await AsyncStorage.setItem('activeUser', JSON.stringify(userData));
    return '';
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('activeUser');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
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