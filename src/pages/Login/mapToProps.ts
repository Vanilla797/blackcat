import { User } from '@/models/user.model';

export const mapDispatchToProps = (
  dispatch: any,
): {
  setUser: (userInfo: User) => void;
} => {
  return {
    setUser: (userInfo: User) =>
      dispatch({
        type: 'user/save',
        payload: {
          userInfo,
        },
      }),
  };
};
