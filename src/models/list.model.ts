export interface EventCondition {
  before: number;
  after: number;
  channels: number[];
}

export interface Channel {
  id: number;
  name: string;
}

const ListModel = {
  namespace: 'list',
  state: {
    showSearchBox: false,
    showSearchRes: false,
    allChannels: [],
    condition: {
      before: 0,
      after: 0,
      channels: [],
    },
    offset: 0,
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

export default ListModel;
