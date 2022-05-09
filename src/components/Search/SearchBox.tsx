import { connect } from 'umi';
import { useState } from 'react';
import { Tag } from 'antd';
import { Channel } from '@/models/list.model';
import { getTimeRange } from '@/helpers/format';

import { mapDispatchToProps } from '@/pages/List/mapToProps';
import styled from 'styled-components';
import './searchbox.style.css';
import { ReactComponent as SearchIcon } from '@/assets/SVGs/search.svg';
import { ReactComponent as CrossIcon } from '@/assets/SVGs/cross.svg';

function SearchBox(props: any) {
  const {
    setShowSearchBox,
    condition,
    setCondition,
    allChannels,
    setOffsetNumber,
    setShowSearchRes,
  } = props;

  const [time, setTime] = useState('');
  const [laterBefore, setLaterBefore] = useState(0);
  const [laterAfter, setLaterAfter] = useState(0);
  const [selectedChannels, setSelectedChannels] = useState<number[]>([]);

  const onSearch = () => {
    if (!time && !selectedChannels.length) {
      return;
    }
    const [after, before] = getTimeRange(time);

    const newCondition = Object.assign({}, condition, {
      channels: selectedChannels,
      before: laterBefore || before,
      after: laterAfter || after,
    });
    setOffsetNumber(0);
    setCondition(newCondition);
    setShowSearchBox(false);
    setShowSearchRes(true);
  };

  const onCloseSearch = () => {
    setShowSearchBox(false);
  };

  const onChannelTagClick = (id: number) => {
    let newChannels: number[] = [];
    if (selectedChannels.includes(id)) {
      newChannels = selectedChannels.filter((c: number) => c !== id);
    } else {
      newChannels = [...selectedChannels, id];
    }
    setSelectedChannels(newChannels);
  };

  const timeOption = [
    'ANYTIME',
    'TODAY',
    'TOMORROW',
    'THIS WEEK',
    'THIS MONTH',
    'LATER',
  ];
  const TimeTags = timeOption.map((t, index) => {
    return (
      <Tag
        className={`tag tag-${t === time ? 'selected' : ''} `}
        key={index}
        onClick={() => setTime(t === time ? '' : t)}
        style={{ border: 'none', marginRight: '-0.1rem' }}
      >
        {t}
      </Tag>
    );
  });

  const ChannelTags = allChannels.map((item: Channel) => (
    <Tag
      className={`tag tag-${
        selectedChannels.includes(item.id) ? 'selected' : ''
      }`}
      key={item.id}
      onClick={() => {
        onChannelTagClick(item.id);
      }}
    >
      {item.name}
    </Tag>
  ));

  return (
    <>
      <SearchBoxContainer>
        <StyledCrossIcon onClick={onCloseSearch} />
        <SearchTitle>DATE</SearchTitle>
        <SearchContent>{TimeTags}</SearchContent>

        <SearchTitle>CHANNEL</SearchTitle>
        <SearchContent>{ChannelTags}</SearchContent>
        {time || selectedChannels.length <= 0 ? (
          <SearchButton onClick={() => onSearch()}>
            <SearchIcon style={searchIconStyle} />
            SEARCH
          </SearchButton>
        ) : (
          <SearchSelected onClick={() => onSearch()}>
            <SearchIcon style={searchIconSelected} />
            SEARCH
          </SearchSelected>
        )}
      </SearchBoxContainer>
      <BoxClose onClick={onCloseSearch}></BoxClose>
    </>
  );
}

export default connect(
  ({ list }: any) => ({ ...list }),
  mapDispatchToProps,
)(SearchBox);

const SearchBoxContainer = styled.div`
  width: 75%;
  height: 100vh;
  background-color: #453257;
  top: 0;
  left: 0;
  position: relative;
  padding: 0.4rem;
`;

const SearchTitle = styled.div`
  padding-top: 0.3rem;
  font-size: 0.375rem;
  text-align: center;
  color: #ac8ec9;
  text-decoration: underline #ac8ec9;
`;

const SearchContent = styled.div`
  /* padding: 0.4375rem 0; */
  line-height: 1rem;
`;

const BoxClose = styled.div`
  flex: 1;
`;

const SearchButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-size: 0.5rem;
  background-color: #bababa;
  color: #666666;
`;

const SearchSelected = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-size: 0.5rem;
  background-color: #d5ef7f;
  color: #453257;
`;
const searchIconStyle = {
  height: '0.45rem',
  width: '0.5rem',
  marginRight: '0.1rem',
  fill: '#666666',
};
const searchIconSelected = {
  height: '0.45rem',
  width: '0.5rem',
  marginRight: '0.1rem',
  fill: '#453257',
};

const StyledCrossIcon = styled(CrossIcon)`
  height: 0.45rem;
  width: 0.5rem;
  left: 65%;
  position: fixed;
  fill: #ac8ec9;
`;
