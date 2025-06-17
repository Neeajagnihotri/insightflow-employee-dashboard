
export interface User {
  id: string;
  email: string;
  role: 'Resource Manager' | 'Engineering Head';
  name: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
