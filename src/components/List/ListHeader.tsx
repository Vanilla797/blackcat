import React from 'react';
import styled from 'styled-components';

import LogoCat from '../../assets/SVGs/logo-cat.svg';

import { history } from 'umi';
import { authUser } from '@/fetchAPI/request';
interface HeaderProps {
  leftIcon: React.ReactNode;
}
const ListHeader = (props: HeaderProps, ref: any) => {
  const { leftIcon } = props;
  const userInfo = authUser();
  if (!userInfo?.token) {
    history.push('/login');
  }
  const onHeaderClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <Header ref={ref} onClick={onHeaderClick}>
        <div style={{ cursor: 'pointer' }}>{leftIcon}</div>
        <div>
          <Logo src={LogoCat} />
        </div>
        <div>
          <UserImg
            onClick={() => history.push('/me')}
            src={userInfo?.user.avatar}
          />
        </div>
      </Header>
    </>
  );
};

export default React.forwardRef(ListHeader);

const Header = styled.div`
  height: 1.25rem;
  width: 100%;
  background-color: #8560a9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem 0 0.5rem;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Logo = styled.img`
  width: 0.8rem;
  height: 0.8rem;
`;

const UserImg = styled.img`
  width: 0.8rem;
  height: 0.8rem;
  cursor: pointer;
  border-radius: 50%;
`;
