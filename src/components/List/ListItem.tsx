import React from 'react';
import styled from 'styled-components';
import { connect, Link } from 'umi';

import { ReactComponent as Check } from '@/assets/SVGs/check.svg';
import { ReactComponent as CheckOutline } from '@/assets/SVGs/check-outline.svg';
import { ReactComponent as LikeIcon } from '@/assets/SVGs/like.svg';
import { ReactComponent as LikeOutline } from '@/assets/SVGs/like-outline.svg';
import { formatTime } from '@/helpers/format';
import { ReactComponent as TimeIcon } from '@/assets/SVGs/time.svg';
import { mapDispatchToProps } from '@/pages/Detail/mapToProps';

interface ListItemData {
  id: number;
  creator: Creator;
  channel: Channel;
  name: string;
  begin_time: string;
  end_time: string;
  description: string;
  images: string[];

  me_likes: boolean;
  likes_count: number;
  me_going: boolean;
  goings_count: number;
}
interface Channel {
  name: string;
}
interface Creator {
  username: string;
  avatar: string;
}
interface ListItemProps {
  item: ListItemData;
}
const ListItem = (props: any) => {
  // const { item } = items;
  const {
    item,
    likeEvent,
    unlikeEvent,
    participantsEvent,
    unparticipantsEvent,
  } = props;
  const goingMsg = item.me_going ? (
    <span style={{ color: '#453257' }}>I am going!</span>
  ) : (
    `${item.goings_count} Going`
  );
  const likeMsg = item.me_likes ? (
    <span style={{ color: '#453257' }}>I like it</span>
  ) : (
    `${item.likes_count} Likes`
  );
  const goingIcon = item.me_going ? (
    <Check style={checkFill} />
  ) : (
    <CheckOutline />
  );
  const likeIcon = item.me_likes ? (
    <LikeIcon style={likeFill} />
  ) : (
    <LikeOutline />
  );
  const commitGoing = () => {
    if (item.me_going) {
      unparticipantsEvent(item.id);
      item.me_going = !item.me_going;
    } else {
      participantsEvent(item.id);
      item.me_going = !item.me_going;
    }
  };
  const commitLikes = () => {
    if (item.me_likes) {
      unlikeEvent(item.id);
      item.me_likes = !item.me_likes;
    } else {
      likeEvent(item.id);
      item.me_likes = !item.me_likes;
    }
  };

  return (
    <>
      <ListContainer>
        <Header>
          <UserProfile>
            <UserImg src={item.creator.avatar} />
            <Username>{item.creator.username}</Username>
          </UserProfile>
          <ChannelName>{item.channel.name}</ChannelName>
        </Header>

        <MiddleContainer>
          <Link to={`/detail/${item.id}`}>
            <Title>{item.name}</Title>

            <TimeContianer>
              <TimeIcon style={timeIconStyle} />

              <span style={{ fontSize: '0.375rem' }}>
                {formatTime(item.begin_time)}
              </span>
              <span style={{ fontSize: '0.375rem' }}>&nbsp;-&nbsp; </span>
              <span style={{ fontSize: '0.375rem' }}>
                {formatTime(item.end_time)}
              </span>
            </TimeContianer>

            <Content>
              {item.description && item.description.length > 300
                ? `${item.description && item.description.slice(0, 300)} .....`
                : item.description}
            </Content>
          </Link>
          <Link to={`/detail/${item.id}`}>
            {item.images && item.images.length > 1 ? (
              <ImageContainer src={item.images[1]} />
            ) : (
              ''
            )}
          </Link>
        </MiddleContainer>
        <Footer>
          <ActionContainer onClick={commitGoing}>
            <Going>{goingIcon}</Going>
            <Msg>{goingMsg}</Msg>
          </ActionContainer>
          <ActionContainer onClick={commitLikes}>
            <Like>{likeIcon}</Like>

            <Msg>{likeMsg}</Msg>
          </ActionContainer>
        </Footer>
      </ListContainer>
      <Divider />
    </>
  );
};

export default connect(
  ({ detail }: any) => ({ ...detail }),
  mapDispatchToProps,
)(ListItem);

const ListContainer = styled.div`
  padding: 0.5rem 0.5rem 1rem 0.5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.375rem;
`;
const UserProfile = styled.div`
  line-height: 0.66rem;
`;
const UserImg = styled.img`
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  margin-right: 0.25rem;
`;

const Username = styled.span`
  color: #67616d;
  margin-top: 0.5rem;
`;

const ChannelName = styled.div`
  border: 1px solid #d3c1e5;
  border-radius: 0.65rem;
  color: #8560a9;
  padding: 0 0.3rem 0 0.3rem;
  font-size: 0.375rem;
`;
const Title = styled.div`
  display: flex;
  align-items: flex-start;
  color: #453257;
  justify-content: space-between;
  font-size: 0.5625rem;
  font-weight: 500;
  margin-top: 0.25rem;
`;
const TimeContianer = styled.div`
  color: #8560a9;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
`;

const timeIconStyle = {
  height: '0.375rem',
  width: '0.375rem',
  marginRight: '0.1rem',
  fill: '#8560a9',
  display: 'inline-block',
};
const Content = styled.p`
  word-break: break-all;
  margin-top: 0.375rem;
  color: #67616d;
  font-size: 0.4375rem;
`;
const Footer = styled.div`
  display: flex;
  margin-bottom: -0.5rem;
`;
const Going = styled.div`
  fill: #ac8ec9;

  height: 0.375rem;
  width: 0.375rem;
  line-height: 0.15rem;
`;
const Like = styled.div`
  fill: #ac8ec9;
  height: 0.375rem;
  width: 0.375rem;
  margin-left: 1rem;
  line-height: 0.15rem;
`;

const ImageContainer = styled.img`
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
  margin-left: 0.25rem;
`;

const Msg = styled.span`
  font-size: 0.375rem;
  color: #ac8ec9;
  margin-left: 0.2rem;
  line-height: 0.375rem;
`;
const checkFill = {
  fill: '#aecb4f',
};
const likeFill = {
  fill: '#ff5c5c',
};
const Divider = styled.div`
  margin: 0 0 0 0.5rem;
  border-bottom: 1px solid #e8e8e8;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ActionContainer = styled.div`
  display: flex;
`;
