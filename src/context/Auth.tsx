
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import restHelper from '../utils/BackendApiClient';


interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void> | void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void> | void;
  isLoggedIn: boolean;
}

export const Auth = createContext<AuthProps>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
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


  const login = async (email: string, password: string) => {
    try {
      const response = await restHelper.login({ email, password });

      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
      };

      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', response.token);

      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await restHelper.signup({ name, email, password });

      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
      };

      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', response.token);

      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Signup error');
    }
  };

  return (
    <Auth.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </Auth.Provider>
  );
};