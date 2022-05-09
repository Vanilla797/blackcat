import { Channel } from './list.model';
import { User } from './user.model';

import {
  getEventDetail,
  getEventParticipants,
  getEventLikes,
  getEventComments,
  likeEvent,
  unlikeEvent,
  participantsEvent,
  unparticipantsEvent,
  commentEvent,
} from '@/fetchAPI/api';

export interface ListItemData {
  id: number;
  creator: User;
  channel: Channel;
  name: string;
  begin_time: string;
  end_time: string;
  description: string;
  images: string[];
  create_time: string;
  me_likes: boolean;
  likes_count: number;
  me_going: boolean;
  goings_count: number;
  location: string;
  location_detail: string;
}

export enum FooterMode {
  'ACTION',
  'REPLY',
}
const DetailModel = {
  namespace: 'detail',
  state: {
    event: {},
    likes: [],
    participants: [],
    comments: [],
    footerMode: FooterMode.ACTION,
    replyUser: {},
  },
  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *getEventDetail({ payload }: any, { call, put }: any) {
      const { id } = payload;
      const { event = {} } = yield call(getEventDetail, id);
      yield put({
        type: 'save',
        payload: {
          event,
        },
      });
    },
    *getEventParticipants({ payload }: any, { call, put }: any) {
      const { id } = payload;
      const { users: participants = [] } = yield call(getEventParticipants, id);
      yield put({
        type: 'save',
        payload: {
          participants,
        },
      });
    },
    *getEventLikes({ payload }: any, { call, put }: any) {
      const { id } = payload;
      const { users: likes = [] } = yield call(getEventLikes, id);
      yield put({
        type: 'save',
        payload: {
          likes,
        },
      });
    },
    *getEventComments({ payload }: any, { call, put }: any) {
      const { id } = payload;
      const { comments = [] } = yield call(getEventComments, id);
      yield put({
        type: 'save',
        payload: {
          comments,
        },
      });
    },
    *likeEvent({ payload }: any, { call, put }: any) {
      const { id } = payload;
      yield call(likeEvent, id);
      const { event = {} } = yield call(getEventDetail, id);
      const { users: likes = [] } = yield call(getEventLikes, id);
      yield put({
        type: 'save',
        payload: {
          event,
          likes,
        },
      });
    },
    *unlikeEvent({ payload }: any, { call, put }: any) {
      const { id } = payload;
      yield call(unlikeEvent, id);
      const { event = {} } = yield call(getEventDetail, id);
      const { users: likes = [] } = yield call(getEventLikes, id);
      yield put({
        type: 'save',
        payload: {
          event,
          likes,
        },
      });
    },
    *participantsEvent({ payload }: any, { call, put }: any) {
      const { id } = payload;
      yield call(participantsEvent, id);
      const { event = {} } = yield call(getEventDetail, id);
      const { users: participants = [] } = yield call(getEventParticipants, id);
      yield put({
        type: 'save',
        payload: {
          event,
          participants,
        },
      });
    },
    *unparticipantsEvent({ payload }: any, { call, put }: any) {
      const { id } = payload;
      yield call(unparticipantsEvent, id);
      const { event = {} } = yield call(getEventDetail, id);
      const { users: participants = [] } = yield call(getEventParticipants, id);
      yield put({
        type: 'save',
        payload: {
          event,
          participants,
        },
      });
    },
    *commentEvent({ payload }: any, { call, put }: any) {
      const { id, comment } = payload;
      yield call(commentEvent, id, comment);
      const { comments = [] } = yield call(getEventComments, id);
      yield put({
        type: 'save',
        payload: {
          comments,
        },
      });
    },
  },
};

export default DetailModel;
