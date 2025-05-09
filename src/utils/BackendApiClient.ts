import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


interface User {
  id: string;
  name: string;
  email: string;
}

type NewUser = Omit<User, 'id'> & { password: string };

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

const restHelper = {
  login: async (credentials: Credentials): Promise<LoginResponse> => {
    const response = await api.post('/user/login', credentials);
    return response.data;
  },

  signup: async (userData: NewUser) => {
    const response = await api.post('/user/signup', userData);
    return response.data;
  },
};

export default restHelper;