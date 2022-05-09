import { history } from 'umi';
const URL_PRE = 'http://localhost:3000/api/v1';
const EXTRA_HEADER = 'X-BLACKCAT-TOKEN';

const my_fetch = async (url: string, option: any) => {
  const response: Response = await fetch(`${URL_PRE}/${url}`, option);
  if (response.status === 403) {
    localStorage.removeItem(EXTRA_HEADER);
    history.push('/login');
    return;
  }
  if (response.status === 404) {
    history.push('/404');
    return;
  }
  if (response.status !== 200) {
    throw new Error(
      `statusCode: ${response.status}, statusText: ${response.statusText}`,
    );
  }
  try {
    const json = await response.json();
    return json;
  } catch (err) {
    return null;
  }
};
export interface User {
  username: string;
  password: string;
  email?: string;
  avatar?: string;
}
export interface UserAuth {
  token: string;
  user: User;
}
export const authUser = (): UserAuth | null => {
  const userInfo = localStorage.getItem(EXTRA_HEADER);
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

export const get = async (url: string) => {
  const option = {
    method: 'GET',
    headers: {
      [EXTRA_HEADER]: authUser()?.token,
    },
  };
  return await my_fetch(url, option);
};
export const post = async (url: string, params?: any) => {
  const option = {
    method: 'POST',
    headers: {
      [EXTRA_HEADER]: authUser()?.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params || ''),
  };
  return await my_fetch(url, option);
};

export const dele = async (url: string) => {
  const option = {
    method: 'DELETE',
    headers: {
      [EXTRA_HEADER]: authUser()?.token,
    },
  };
  return await my_fetch(url, option);
};
