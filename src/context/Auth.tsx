import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthProps {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const Auth = createContext<AuthProps>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('auth_user');
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    return user
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const login = (email: string) => {

    // Simulate a login process
    // In a real application, you would send a request to your backend here

    const fakeUser: User = {
      id: uuidv4(),
      email,
      name: 'Jon Doe',
    };

    localStorage.setItem('auth_user', JSON.stringify(fakeUser));

    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <Auth.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </Auth.Provider>
  );
};