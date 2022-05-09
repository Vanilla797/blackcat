import { connect } from 'umi';
import dayjs from 'dayjs';

import { ReactComponent as ReplyIcon } from '@/assets/SVGs/reply.svg';
import { FooterMode } from '@/models/detail.model';
import { mapDispatchToProps } from '@/pages/Detail/mapToProps';
import styled from 'styled-components';

function Comments(props: any) {
  const { comments, setFooterMode, setReplyUser } = props;

  const reply = (user: any) => {
    setFooterMode(FooterMode.REPLY);
    setReplyUser(user);
  };

  const CommentList = comments.map((cmt: any) => {
    return (
      <Comment key={cmt.id}>
        <UserAvatar src={cmt.user.avatar} />
        <Info>
          <InfoTitle>
            <ReplyerName>{cmt.user.username}</ReplyerName>
            <ReplyDate>
              {dayjs(cmt.create_time).format('YYYY/MM/DD HH:mm:ss')}
            </ReplyDate>
          </InfoTitle>
          <InfoMsg>{cmt.comment}</InfoMsg>
        </Info>

        <ReplyIcon style={replyIconStyle} onClick={() => reply(cmt.user)} />
      </Comment>
    );
  });

  return <div style={{ marginBottom: '2rem' }}>{CommentList}</div>;
}

export default connect(
  ({ detail }: any) => ({ ...detail }),
  mapDispatchToProps,
)(Comments);

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  /* margin: 0.25rem 0; */
`;

const UserAvatar = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
const Info = styled.div`
  flex: 1;
  padding: 0 0.375rem;
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.div`
  display: flex;
  height: 1.6rem;
  line-height: 1.6rem;
  /* margin-bottom: 0.3rem; */
  font-size: 0.375rem;
`;
const InfoMsg = styled.div`
  color: #666;
  font-size: 0.438rem;
  margin-top: -0.438rem;
`;

const ReplyerName = styled.div`
  color: #8560a9;
  margin-right: 0.375rem;
`;
const ReplyDate = styled.div`
  color: #bababa;
  font-size: 0.375rem;
`;

const replyIconStyle = {
  display: 'block',
  width: '0.5rem',
  marginRight: '0.5rem',
  marginTop: '0.25rem',
  paddingTop: '0.4rem',
  fill: '#D5EF7F',
};
