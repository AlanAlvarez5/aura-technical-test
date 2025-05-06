import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { users } from '../../users.json';

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


  const login = (email: string, password: string) => {

    // Simulate a login process
    // In a real application, you would send a request to your backend here
    const user = users.find((user) => user.email === email && user.password === password);

    if( !user ) {
      throw new Error('Invalid credentials');
    }

    localStorage.setItem('auth_user', JSON.stringify(user));

    setUser(user);
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