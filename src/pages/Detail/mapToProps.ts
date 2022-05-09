import { User } from '@/models/user.model';

export const mapDispatchToProps = (
  dispatch: any,
): {
  getEventDetail: (id: number) => void;
  getEventParticipants: (id: number) => void;
  getEventLikes: (id: number) => void;
  getEventComments: (id: number) => void;
  setFooterMode: (footerMode: string) => void;
  likeEvent: (id: number) => void;
  unlikeEvent: (id: number) => void;
  participantsEvent: (id: number) => void;
  unparticipantsEvent: (id: number) => void;
  commentEvent: (id: number, comment: string) => void;
  setReplyUser: (replyUser: User) => void;
} => {
  return {
    getEventDetail: (id: number) =>
      dispatch({
        type: 'detail/getEventDetail',
        payload: {
          id,
        },
      }),
    getEventParticipants: (id: number) =>
      dispatch({
        type: 'detail/getEventParticipants',
        payload: {
          id,
        },
      }),
    getEventLikes: (id: number) =>
      dispatch({
        type: 'detail/getEventLikes',
        payload: {
          id,
        },
      }),
    getEventComments: (id: number) =>
      dispatch({
        type: 'detail/getEventComments',
        payload: {
          id,
        },
      }),
    setFooterMode: (footerMode: string) =>
      dispatch({
        type: 'detail/save',
        payload: {
          footerMode,
        },
      }),
    likeEvent: (id: number) =>
      dispatch({
        type: 'detail/likeEvent',
        payload: {
          id,
        },
      }),
    unlikeEvent: (id: number) =>
      dispatch({
        type: 'detail/unlikeEvent',
        payload: {
          id,
        },
      }),
    participantsEvent: (id: number) =>
      dispatch({
        type: 'detail/participantsEvent',
        payload: {
          id,
        },
      }),
    unparticipantsEvent: (id: number) =>
      dispatch({
        type: 'detail/unparticipantsEvent',
        payload: {
          id,
        },
      }),
    commentEvent: (id: number, comment: string) =>
      dispatch({
        type: 'detail/commentEvent',
        payload: {
          id,
          comment,
        },
      }),
    setReplyUser: (replyUser: User) =>
      dispatch({
        type: 'detail/save',
        payload: {
          replyUser,
        },
      }),
  };
};
