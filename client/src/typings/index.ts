import { ReactNode } from 'react';

export type layoutProps = {
  children: ReactNode;
  hiddenAppBar?: boolean;
};

export type buttonLinkProps = {
  className?: any;
  href: string;
  hrefAs?: 'String';
  children: ReactNode;
  prefetch?: any;
};
export type refButtonLink = HTMLAnchorElement;

export declare interface loginProps {
  t: (text: string) => string;
}

export type typeRegisterReq = {
  name: string;
  email: string;
  password: string;
};

export enum LoginType {
  common = '1',
  google = '2'
}

export type typeLoginReq = {
  typeLogin: LoginType;
  name?: string;
  email: string;
  password?: string;
  imageUrl?: string;
};

export type dataUserRes = {
  name: string;
  email: string;
  avatar?: string;
};

export type typeLoginRes = {
  success: boolean;
  message: string;
  user: dataUserRes;
  token: string;
};

//Auth Context Type
export type IAuthContext = {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  login: any;
  logout: any;
};

export type authProviderProps = {
  children: ReactNode;
};

export type CreatePostReq = {
  text: string;
  file?: any;
};
