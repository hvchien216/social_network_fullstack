import userApi from '@/api/userApi';
import {
  authProviderProps,
  dataUserRes,
  IAuthContext,
  typeLoginReq,
  typeRegisterReq
} from '@/typings/index';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import React, {
  ComponentType,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import axiosClient from '../api/axiosClient';

const AuthCtx = createContext<IAuthContext | any>(null);
export const AuthProvider = ({ children }: authProviderProps) => {
  const userFromCookie: any | null = Cookies.get('user') || null;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user, setUser] = useState<dataUserRes | null>(
    JSON.parse(userFromCookie)
  );

  const login = async (userData: typeLoginReq): Promise<any> => {
    try {
      const {
        user,
        success,
        token,
        message
      }: any = await userApi.login(userData);
      if (!success) {
        setError(message);
        return;
      }
      if (token && success) {
        Cookies.set('token', token, { expires: 60 });
        Cookies.set('user', user, { expires: 60 });
        axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(user);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (
    userData: typeRegisterReq
  ): Promise<any> => {
    try {
      const { success, message }: any = await userApi.register(
        userData
      );
      if (!success) {
        setError(message);
        return;
      }
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const logout = (): void => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    router.replace('/login');
  };
  return (
    <AuthCtx.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        error,
        register
      }}>
      {children}
    </AuthCtx.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthCtx);

  return context;
}

export function ProtectRoute(Component: ComponentType) {
  return () => {
    const { isAuthenticated } = useAuth();
    useEffect(() => {
      if (!isAuthenticated) Router.push('/login');
    }, [isAuthenticated]);

    return (
      <>
        <Component />
      </>
    );
  };
}
