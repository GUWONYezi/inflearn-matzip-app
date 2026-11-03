import {Profile} from '@/types/domain';
import {getEncryptStorage} from '@/utils/encryptStorage';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// 회원가입
const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  await axiosInstance.post('/auth/signup', {email, password});
};

// 로그인
const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

// 본인 프로필 정보 get
const getProfile = async (): Promise<Profile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

// Token 가져오기
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
