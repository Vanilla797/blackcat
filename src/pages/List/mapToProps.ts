import { EventCondition, Channel } from '@/models/list.model';

export const mapDispatchToProps = (
  dispatch: any,
): {
  setShowSearchBox: (showSearchBox: boolean) => void;
  setShowSearchRes: (showSearchRes: boolean) => void;
  setCondition: (condition: EventCondition) => void;
  setOffsetNumber: (offset: number) => void;
  setAllChannels: (allChannels: Channel[]) => void;
} => {
  return {
    setShowSearchBox: (showSearchBox: boolean) =>
      dispatch({
        type: 'list/save',
        payload: {
          showSearchBox,
        },
      }),
    setShowSearchRes: (showSearchRes: boolean) =>
      dispatch({
        type: 'list/save',
        payload: {
          showSearchRes,
        },
      }),
    setCondition: (condition: EventCondition) =>
      dispatch({
        type: 'list/save',
        payload: {
          condition,
        },
      }),
    setOffsetNumber: (offset: number) =>
      dispatch({
        type: 'list/save',
        payload: {
          offset,
        },
      }),
    setAllChannels: (allChannels: Channel[]) =>
      dispatch({
        type: 'list/save',
        payload: {
          allChannels,
        },
      }),
  };
};
