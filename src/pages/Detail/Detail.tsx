import { history, useParams, withRouter, connect } from 'umi';

import { useEffect, useRef, useState } from 'react';

import { ReactComponent as HomeIcon } from '@/assets/SVGs/home.svg';

import Header from '@/components/List/ListHeader';
import Breadcrumb from '@/components/Detail/Breadcrumb';

import Description from '@/components/Detail/Description';
import When from '@/components/Detail/When';
import Where from '@/components/Detail/Where';
import Member from '@/components/Detail/members';
import CommentList from '@/components/Detail/Comments';
import Footer from '@/components/Detail/Footer';
import styled from 'styled-components';
import { mapDispatchToProps } from './mapToProps';
import { formatTime } from '@/helpers/format';
import { ReactComponent as InfoIcon } from '@/assets/SVGs/info.svg';
import { ReactComponent as InfoOutIcon } from '@/assets/SVGs/info-outline.svg';
import { ReactComponent as PeopleIcon } from '@/assets/SVGs/people.svg';
import { ReactComponent as PeopleOutIcon } from '@/assets/SVGs/people-outline.svg';
import { ReactComponent as CommentIcon } from '@/assets/SVGs/comment.svg';
import { ReactComponent as CommentOutIcon } from '@/assets/SVGs/comment-outline.svg';

function DetailPage(props: any) {
  const params: { id: string } = useParams();

  const {
    getEventDetail,
    event,
    getEventParticipants,
    participants,
    getEventLikes,
    likes,
    getEventComments,
  } = props;
  const { creator } = event;

  const [activeTab, setActiveTab] = useState(0);
  const memberRef = useRef(null);
  const commentRef = useRef(null);
  const headerRef = useRef(null);
  const breadCrumbRef = useRef(null);
  const contentRef = useRef(null);

  const tabItems = [
    {
      activeIcon: <InfoIcon style={activeIconStyle} />,
      inactiveIcon: <InfoOutIcon style={inactiveIconStyle} />,
      name: `Details`,
    },
    {
      activeIcon: <PeopleIcon style={activeIconStyle} />,
      inactiveIcon: <PeopleOutIcon style={inactiveIconStyle} />,
      name: `Participants`,
    },
    {
      activeIcon: <CommentIcon style={activeIconStyle} />,
      inactiveIcon: <CommentOutIcon style={inactiveIconStyle} />,
      name: `Comments`,
    },
  ];

  useEffect(() => {
    getEventDetail(params.id);
    getEventLikes(params.id);
    getEventParticipants(params.id);
    getEventComments(params.id);
  }, []);

  const onTabClick = (index: number) => {
    const topOffset =
      (headerRef.current as any).offsetHeight +
      (breadCrumbRef.current as any).offsetHeight;

    setActiveTab(index);
    let topTarget = 0;
    if (index === 1) {
      topTarget = (memberRef.current as any).offsetTop - topOffset;
      // console.log(topTarget);
    }
    if (index === 2) {
      topTarget = (commentRef.current as any).offsetTop - topOffset;
      // console.log(topTarget);
    }
    (contentRef.current as any).scrollTo({
      top: topTarget,
      behavior: 'smooth',
    });
  };
  const imageStyle = {
    width: '5.625rem',
    height: '3.125rem',
    marginRight: '0.375rem',
    borderRadius: '0.2rem',
  };

  return (
    <DetailContainer>
      <Header
        ref={headerRef}
        leftIcon={
          <HomeIcon
            style={homeIconStyle}
            onClick={() => history.push('/list')}
          />
        }
      />
      <DetailContent ref={contentRef}>
        <DetailBase>
          <ChannelName>{event.channel?.name}</ChannelName>

          <EventTitle>{event.name}</EventTitle>
          <Creator>
            {creator && <CreatorAvatar src={creator.avatar} alt="avatar" />}

            <CreatorContent>
              <CreatorName> {creator && creator.username} </CreatorName>
              <CreateTime>{formatTime(event.create_time)}</CreateTime>
            </CreatorContent>
          </Creator>
        </DetailBase>

        <Breadcrumb
          ref={breadCrumbRef}
          activeIndex={activeTab}
          onTabClick={onTabClick}
          tabItems={tabItems}
        />
        <ImageList>
          {event.images &&
            event.images.map((img: string) => {
              return <img key={img} src={img} style={imageStyle} />;
            })}
        </ImageList>

        <Description description={event.description} />
        <When event={event} />
        <Where event={event} />
        <div ref={memberRef}>
          <Member
            meGoing={event.me_going}
            meLikes={event.me_likes}
            participants={participants}
            likes={likes}
          />
        </div>
        <div ref={commentRef}>
          <CommentList />
        </div>
      </DetailContent>
      <Footer />
    </DetailContainer>
  );
}

export default connect(
  ({ detail }: any) => ({ ...detail }),
  mapDispatchToProps,
)(withRouter(DetailPage));

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: visible;
`;

const ImageList = styled.div`
  width: 100%;
  display: flex;
  overflow: scroll;
  padding: 0;
  margin: 0.5rem 0 0 0;
`;

const DetailContent = styled.div`
  overflow: scroll;
  /* flex: 1; */
  margin-top: 1.25rem;
  height: calc(100vh- 3rem);
`;
const DetailBase = styled.div`
  padding: 0 0.5rem 0 0.5rem;
  display: flex;
  flex-direction: column;
  line-height: normal;
`;

const EventTitle = styled.h2`
  color: #453257;
  margin-top: 0.5rem;
  font-size: 0.625rem;
`;

const Creator = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1.3rem 0;
`;

const CreatorAvatar = styled.img`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  overflow: hidden;
`;
const CreatorContent = styled.div`
  flex: 1;
  color: #67616d;
  padding: 0 0 0 0.375rem;
`;

const CreatorName = styled.div`
  font-size: 0.438rem;
  line-height: normal;
`;
const CreateTime = styled.div`
  color: #bababa;
  font-size: 0.375rem;
  margin: 0.2rem 0 0 0;
  height: 1.2rem;
  line-height: normal;
`;

const ChannelName = styled.div`
  border: 1px solid #8560a9;
  border-radius: 1.4rem;
  color: #8560a9;
  padding: 0.1rem 0.25rem;
  justify-content: center;
  width: fit-content;
  margin-top: 0.5rem;
  font-size: 0.375rem;
`;

const homeIconStyle = {
  height: '100%',
  width: '0.8rem',
  fill: '#453257',
  marginTop: '0.375rem',
};
export const activeIconStyle = {
  height: '0.5rem',
  width: '0.5rem',
  // padding: '0.2rem',
  fill: '#AECB4F',
};
export const inactiveIconStyle = {
  height: '0.5rem',
  width: '0.5rem',
  // padding: '0.2rem ',
};
