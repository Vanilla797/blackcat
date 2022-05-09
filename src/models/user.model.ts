export interface User {
  username: string;
  avatar: string;
  email: string;
}

const UserModel = {
  namespace: 'user',
  state: {
    username: '',
    avatar: '',
    email: '',
  },
  effects: {},
  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default UserModel;
