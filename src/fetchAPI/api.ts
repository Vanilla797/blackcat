import { dele, get, post, User, UserAuth } from './request';
const EXTRA_HEADER = 'X-BLACKCAT-TOKEN';

export interface ReqEvents {
  after?: number;
  before?: number;
  channels?: string;
  offset?: number;
  limit?: number;
}
export interface ReqMeEvents {
  type: string;
  offset?: number;
  limit?: number;
}
export interface RespUserInfo {
  id: number;
  username: string;
  avatar: string;
  email: string;
  likes_count: number;
  past_count: number;
  goings_count: number;
}
export const auth = async (user: User) => {
  const authedUser: UserAuth = await post('auth/token', user);

  localStorage.setItem(EXTRA_HEADER, JSON.stringify(authedUser));
  return authedUser;
};

export const getEvents = async (params: ReqEvents) => {
  const query = Object.entries(params)
    .map(([key, value]) => {
      return value ? `${key}=${encodeURIComponent(value)}` : '';
    })
    .join('&');
  // console.log(query);

  const res = await get(`events${query ? `?${query}` : ''}`);
  return res;
};

export const getChannels = async () => {
  const res = await get('channels');
  return res;
};

export const getEventDetail = async (id: string) => {
  const res = await get(`events/${id}`);
  return res;
};

export const getEventParticipants = async (id: string) => {
  const res = await get(`events/${id}/participants`);
  return res;
};

export const getEventComments = async (id: string) => {
  const res = await get(`events/${id}/comments`);
  return res;
};

export const getEventLikes = async (id: string) => {
  const res = await get(`events/${id}/likes`);
  return res;
};

export const likeEvent = async (id: string) => {
  const res = await post(`events/${id}/likes`);
  return res;
};

export const unlikeEvent = async (id: string) => {
  const res = await dele(`events/${id}/likes`);
  return res;
};
export const participantsEvent = async (id: string) => {
  const res = await post(`events/${id}/participants`);
  return res;
};
export const unparticipantsEvent = async (id: string) => {
  const res = await dele(`events/${id}/participants`);
  return res;
};

export const commentEvent = async (id: string, comment: string) => {
  const res = await post(`events/${id}/comments`, {
    comment,
  });
  return res;
};

export const getMyEvents = async (params: ReqMeEvents) => {
  const query = Object.entries(params)
    .map(([key, val]) => {
      return val ? `${key}=${encodeURIComponent(val)}` : '';
    })
    .join('&');
  const res = await get(`user/events${query ? `?${query}` : ''}`);
  return res;
};

export const getUserInfo = async (): Promise<RespUserInfo> => {
  const userInfo = await get('user');

  return userInfo;
};
