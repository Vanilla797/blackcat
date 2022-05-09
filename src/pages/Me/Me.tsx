import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import { List } from 'antd';

import Header from '@/components/List/ListHeader';
import NoActivity from '@/components/NoActivity/NoActivity';
import EventItem from '@/components/List/ListItem';

import { authUser } from '@/fetchAPI/request';
import { getMyEvents, ReqMeEvents, getUserInfo } from '@/fetchAPI/api';
import { ListItemData } from '@/models/detail.model';
import { ReactComponent as LikeIcon } from '@/assets/SVGs/like.svg';
import { ReactComponent as LikeOutIcon } from '@/assets/SVGs/like-outline.svg';
import { ReactComponent as CheckIcon } from '@/assets/SVGs/check.svg';
import { ReactComponent as CheckOutIcon } from '@/assets/SVGs/check-outline.svg';
import { ReactComponent as PastIcon } from '@/assets/SVGs/past.svg';
import { ReactComponent as PastOutIcon } from '@/assets/SVGs/past-outline.svg';
import { ReactComponent as HomeIcon } from '@/assets/SVGs/home.svg';
import { ReactComponent as EmailIcon } from '@/assets/SVGs/email.svg';
import Breadcrumb from '@/components/Detail/Breadcrumb';
import styled from 'styled-components';
import { activeIconStyle, inactiveIconStyle } from '@/pages/Detail/Detail';

export default function MePage() {
  const userInfo = authUser();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [goingCount, setGoingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);
  const [type, setType] = useState('liked');
  const contentContainerRef = useRef(null);

  const fecthEvents = async () => {
    const params: ReqMeEvents = {
      offset: 0,
      limit: 25,
      type,
    };

    const res = await getMyEvents(params);
    if (!res) return;

    if (params.offset === 0) {
      setEvents(res.events);
    } else {
      setEvents(events.concat(res.events));
    }
  };

  const fetchUserInfo = async () => {
    const res = await getUserInfo();
    setLikesCount(res.likes_count);
    setGoingCount(res.goings_count);
    setPastCount(res.past_count);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fecthEvents();
  }, [type]);

  const tabMap = ['liked', 'going', 'past'];

  const onTabClick = (tab: number) => {
    setActiveTab(tab);
    setType(tabMap[tab]);
    (contentContainerRef.current as any).scrollTo({
      top: 0,
    });
  };

  const tabItems = [
    {
      activeIcon: <LikeIcon style={activeIconStyle} />,
      inactiveIcon: <LikeOutIcon style={inactiveIconStyle} />,
      name: `${likesCount} Likes`,
    },
    {
      activeIcon: <CheckIcon style={activeIconStyle} />,
      inactiveIcon: <CheckOutIcon style={inactiveIconStyle} />,
      name: `${goingCount} Going`,
    },
    {
      activeIcon: <PastIcon style={activeIconStyle} />,
      inactiveIcon: <PastOutIcon style={inactiveIconStyle} />,
      name: `${pastCount} Past`,
    },
  ];

  return (
    <MepageContainer>
      <Header
        leftIcon={
          <HomeIcon
            style={homeIconStyle}
            onClick={() => history.push('/list')}
          />
        }
      />
      <ContentContainer ref={contentContainerRef}>
        <UserInfoContainer>
          <Avatar src={userInfo?.user.avatar} />
          <UserName>{userInfo?.user.username}</UserName>

          <EmailContainer>
            <EmailIcon style={emailIconStyle} />
            <EmailAddress>{userInfo?.user.email}</EmailAddress>
          </EmailContainer>
        </UserInfoContainer>
        <Breadcrumb
          onTabClick={onTabClick}
          activeIndex={activeTab}
          tabItems={tabItems}
        />
        {events && events.length > 0 ? (
          <List
            dataSource={events}
            renderItem={(item: ListItemData) => (
              <List.Item key={item.id} style={{ margin: '-0.5rem 0 ' }}>
                {/* @ts-ignore */}
                <EventItem item={item} />
              </List.Item>
            )}
          />
        ) : (
          <NoActivity />
        )}
      </ContentContainer>
    </MepageContainer>
  );
}

const MepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  height: 100%;
`;
const homeIconStyle = {
  height: '100%',
  width: '0.7rem',
  fill: '#453257',
  marginTop: '0.2rem',
};
const emailIconStyle = {
  height: '0.438rem',
  width: '0.438rem',
  fill: '#8560A9',
};
const EmailAddress = styled.div`
  font-size: 0.438rem;
  margin-left: 0.2rem;
`;

const EmailContainer = styled.div`
  margin: 0.25rem 0 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.4rem;
`;
const UserInfoContainer = styled.div`
  padding-top: 1.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #8560a9;
`;

const Avatar = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  margin: 1.125rem 0px 0.75rem;
  padding: 0.1rem;
  border-radius: 50%;
  border: 0.06rem solid #d3c1e5;
`;

const ContentContainer = styled.div`
  /* flex: 1; */
`;

const UserName = styled.div`
  color: #67616d;
  font-size: 0.75rem;
`;
