import { useState, useEffect } from 'react';
import { connect } from 'umi';

import Header from '@/components/List/ListHeader';
import NoResult from '@/components/NoActivity/NoActivity';
import { ReactComponent as Search } from '@/assets/SVGs/search.svg';
import { getChannels, getEvents, ReqEvents } from '@/fetchAPI/api';
import InfiniteScroll from 'react-infinite-scroll-component';

import ListItem from '@/components/List/ListItem';
import SearchBox from '@/components/Search/SearchBox';
import SearchResult from '@/components/Search/SearchResultBanner';
import { mapDispatchToProps } from './mapToProps';
import styled from 'styled-components';

function ListPage(props: any) {
  const [events, setEvents] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const {
    showSearchBox,
    setShowSearchBox,
    showSearchRes,
    setShowSearchRes,
    offset,
    setOffsetNumber,
    condition,
    setAllChannels,
    setCondition,
  } = props;

  const fetchChannels = async () => {
    const res = await getChannels();
    if (!res) return;
    setAllChannels(res.channels);
  };

  const fetchEvents = async () => {
    const params: ReqEvents = {
      offset,
    };

    if (condition.channels.length)
      params.channels = condition.channels.join(',');

    const res = await getEvents(params);
    // console.log(res);
    if (!res) return;
    if (offset === 0) {
      setEvents(res.events);
    } else {
      setEvents(events.concat(res.events));
    }
    setHasMore(res.hasMore);
    setTotal(res.total);
    setOffsetNumber(offset + 25);
  };
  useEffect(() => {
    fetchChannels();
    return () => setOffsetNumber(0);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [condition]);

  return (
    <div>
      {showSearchBox ? (
        <SearchBoxContianer>
          <SearchBox />
          <ListContainer>
            <Header
              leftIcon={
                <Search
                  style={searchIconStyle}
                  onClick={() => {
                    setShowSearchBox(true);
                    // console.log(showSearchBox);
                  }}
                />
              }
            />
            {showSearchRes ? (
              <SearchResult
                count={total}
                condition={condition}
                clear={() => {
                  setShowSearchRes(false);
                  setCondition({
                    before: 0,
                    after: 0,
                    channels: [],
                  });
                  setOffsetNumber(0);
                }}
              />
            ) : null}
            {events.length > 0 ? (
              <InfiniteScroll
                style={{ marginTop: '1.3rem' }}
                dataLength={events.length}
                next={fetchEvents}
                hasMore={hasMore}
                loader={<h4>loading...</h4>}
                endMessage={<div>No more data</div>}
              >
                {events.map((item: any) => {
                  //@ts-ignore
                  return <ListItem key={item.id} item={item} />;
                })}
              </InfiniteScroll>
            ) : (
              <NoResult />
            )}
          </ListContainer>
        </SearchBoxContianer>
      ) : (
        <ListContainer>
          <Header
            leftIcon={
              <Search
                style={searchIconStyle}
                onClick={() => {
                  setShowSearchBox(true);
                  // console.log(showSearchBox);
                }}
              />
            }
          />
          {showSearchRes ? (
            <SearchResult
              count={total}
              condition={condition}
              clear={() => {
                setShowSearchRes(false);
                setCondition({
                  before: 0,
                  after: 0,
                  channels: [],
                });
                setOffsetNumber(0);
              }}
            />
          ) : null}
          {events.length > 0 ? (
            <InfiniteScroll
              style={{ marginTop: '1.3rem' }}
              dataLength={events.length}
              next={fetchEvents}
              hasMore={hasMore}
              loader={<h4>loading...</h4>}
              endMessage={<div>No more data</div>}
            >
              {events.map((item: any) => {
                //@ts-ignore
                return <ListItem key={item.id} item={item} />;
              })}
            </InfiniteScroll>
          ) : (
            <NoResult />
          )}
        </ListContainer>
      )}
    </div>
  );
}

export default connect(
  ({ list }: any) => ({ ...list }),
  mapDispatchToProps,
)(ListPage);

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SearchBoxContianer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  width: 165%;
`;
const searchIconStyle = {
  height: '100%',
  width: '0.8rem',
  fill: '#453257',
  marginTop: '0.6rem',
};
