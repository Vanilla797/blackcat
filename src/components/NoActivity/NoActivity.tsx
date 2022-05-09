import React from 'react';
import styled from 'styled-components';
import { ReactComponent as NoActiveIcon } from '@/assets/SVGs/no-activity.svg';
const NoActivity = () => {
  return (
    <Container>
      <Icon>
        <NoActiveIcon />
      </Icon>
      <Message>No activity found</Message>
    </Container>
  );
};

export default NoActivity;

const Container = styled.div`
  width: 100vw;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Icon = styled.div`
  fill: #d3c1e5;
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
`;
const Message = styled.div`
  color: #bababa;
  margin-top: 0.438rem;
  font-size: 0.4375rem;
`;
