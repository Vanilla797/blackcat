import dayjs from 'dayjs';

import { ReactComponent as DateFrom } from '@/assets/SVGs/date-from.svg';
import { ReactComponent as DateTo } from '@/assets/SVGs/date-to.svg';
import { ListItemData } from '@/models/detail.model';
import { formatDetailDate } from '@/helpers/format';
import styled from 'styled-components';

interface WhenProps {
  event: ListItemData;
}

const When = (props: WhenProps) => {
  const { begin_time, end_time } = props.event;

  return (
    <WhenContainer>
      <Title>When</Title>
      <TimeContainer>
        <BeginTime>
          <Info>
            <DateFrom style={iconStyle} />
            <EventDate>{begin_time && formatDetailDate(begin_time)}</EventDate>
          </Info>
          <TimeDisplay>
            <span>{begin_time && dayjs(begin_time).format('HH:mm')}</span>
            <AMPM>{begin_time && dayjs(begin_time).format('a')}</AMPM>
          </TimeDisplay>
        </BeginTime>
        <Divider />
        <BeginTime>
          <Info>
            <DateTo style={iconStyle} />
            <EventDate>{end_time && formatDetailDate(end_time)}</EventDate>
          </Info>
          <TimeDisplay>
            <span>{begin_time && dayjs(end_time).format('HH:mm')}</span>
            <AMPM>{begin_time && dayjs(end_time).format('a')}</AMPM>
          </TimeDisplay>
        </BeginTime>
      </TimeContainer>
    </WhenContainer>
  );
};

export default When;

const WhenContainer = styled.div`
  padding: 0.5rem;
  border-top: 1px solid #e8e8e8;
`;

const Title = styled.div`
  color: #8560a9;
  font-weight: bold;
  padding-left: 0.2rem;
  border-left: 0.125rem solid #8560a9;
  font-size: 0.5rem;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding-left: 0.5rem;
`;

const Divider = styled.div`
  width: 1px;
  height: 3.3rem;
  border-right: 1px solid #e8e8e8;
`;

const BeginTime = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* padding: 1rem; */
  flex-direction: column;
`;

const TimeDisplay = styled.div`
  padding-left: 0.6rem;
  margin-top: 0.1rem;
  font-size: 1rem;
  color: #aecb4f;
  display: flex;
`;

const AMPM = styled.span`
  margin-top: 0.6rem;
  padding-left: 0.19rem;
  font-size: 0.4rem;
`;

const iconStyle = {
  fill: '#D5EF7F',
  width: '0.5rem',
  height: '0.5rem',
};

const EventDate = styled.span`
  font-size: 0.5rem;
  margin-left: 0.19rem;

  color: #67616d;
  height: 1.1rem;
`;

const Info = styled.div`
  align-items: center;
`;
