import { ReactComponent as Check } from '@/assets/SVGs/check.svg';
import { ReactComponent as CheckOutline } from '@/assets/SVGs/check-outline.svg';
import { ReactComponent as Like } from '@/assets/SVGs/like.svg';
import { ReactComponent as LikeOutline } from '@/assets/SVGs/like-outline.svg';
import styled from 'styled-components';

interface MemberProp {
  meGoing: boolean;
  meLikes: boolean;
  participants: any[];
  likes: any[];
}

export default function Members(props: MemberProp) {
  const { meGoing, meLikes, participants, likes } = props;

  return (
    <Member>
      <GoMembers>
        <ParicipantData>
          {meGoing ? (
            <Check style={iconStyle} />
          ) : (
            <CheckOutline style={outlineStyle} />
          )}
          <span style={{ fontSize: '0.375rem' }}>
            {participants.length} going
          </span>
        </ParicipantData>
        <ParticipantAvatar>
          {participants &&
            participants.map((item: any, index: number) => (
              <ParticipantIcon src={item.avatar} key={`img_par_${index}`} />
            ))}
        </ParticipantAvatar>
      </GoMembers>
      <Divider />
      <LikeMembers>
        <ParicipantData>
          {meLikes ? (
            <Like style={iconStyle} />
          ) : (
            <LikeOutline style={outlineStyle} />
          )}
          <span style={{ fontSize: '0.375rem' }}>{likes.length} likes</span>
        </ParicipantData>
        <ParticipantAvatar>
          {likes &&
            likes.map((item: any, index: number) => (
              <ParticipantIcon src={item.avatar} key={`img_like_${index}`} />
            ))}
        </ParticipantAvatar>
      </LikeMembers>
    </Member>
  );
}

const Member = styled.div`
  /* padding-left: 0.5rem; */
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
`;

const LikeMembers = styled.div`
  padding: 0.3rem 0.22rem;
  line-height: 0.75rem;
  display: flex;
`;

const GoMembers = styled.div`
  padding: 0.3rem 0.22rem;
  line-height: 0.75rem;
  display: flex;
`;

const iconStyle = {
  height: '1rem',
  width: '1rem',
  padding: '0.2rem',
  fill: '#D5EF7F',
};

const outlineStyle = {
  height: '1rem',
  width: '1rem',
  padding: '0.2rem',
  fill: '#8560A9',
};

const ParicipantData = styled.div`
  min-width: 3rem;
  display: flex;
  align-items: center;
  color: #67616d;
`;

const ParticipantAvatar = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ParticipantIcon = styled.img`
  margin: 0.1rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
`;
const Divider = styled.div`
  margin: 0 0 0 0.5rem;
  border-bottom: 1px solid #e8e8e8;
`;
