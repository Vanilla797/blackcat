import { Tag } from 'antd';
import styled from 'styled-components';

import { EventCondition } from '@/models/list.model';

interface ResultProps {
  count: number;
  condition: EventCondition;
  clear: Function;
}

function SearchResult(props: ResultProps) {
  return (
    <Result>
      <Inner>
        <NumberOfResults>{`${props.count} Results`}</NumberOfResults>
        <ResTag>
          <Tag
            style={{
              backgroundColor: '#D5EF7F',
              borderColor: '#D5EF7F',
              padding: '0.1rem 0.15rem',
              borderRadius: '0.5rem',
              fontSize: '0.3rem',
              width: '2.625rem',
              height: '0.75rem',
              marginRight: '-0.2rem',
              textAlign: 'center',
              color: '#67616D',
            }}
            onClick={() => props.clear({ date: null, channels: [] })}
          >
            CLEAR SEARCH
          </Tag>
        </ResTag>
      </Inner>
      <Msg>{`Searched for Channel ${props.condition.channels} Activities`}</Msg>
    </Result>
  );
}

export default SearchResult;

const Result = styled.div`
  background-color: #faf9fc;
  height: 2.125rem;
  padding: 0.5rem 0.47rem 0 0.84rem;
  position: sticky;
  top: 0;
  z-index: 100;
  color: #8560a9;
  font-size: 0.4375rem;
  margin-top: 1.25rem;
  margin-bottom: -1.25rem;
`;

const Inner = styled.div`
  display: flex;
`;

const NumberOfResults = styled.div`
  text-align: left;
`;

const ResTag = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  text-align: center;
  /* align-self: flex-end; */
  cursor: pointer;
  align-items: center;
`;
const Msg = styled.div`
  margin-top: 0.188rem;
  color: #67616d;
  font-size: 0.375rem;
`;
