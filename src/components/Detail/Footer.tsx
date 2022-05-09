import { connect } from 'umi';
import { useEffect, useState } from 'react';
import { mapDispatchToProps } from '@/pages/Detail/mapToProps';

import { ReactComponent as CrossIcon } from '@/assets/SVGs/cross.svg';
import { ReactComponent as SendIcon } from '@/assets/SVGs/send.svg';
import { ReactComponent as CheckIcon } from '@/assets/SVGs/check.svg';
import { ReactComponent as CheckOutlineIcon } from '@/assets/SVGs/check-outline.svg';
import { ReactComponent as CommentIcon } from '@/assets/SVGs/comment-single.svg';
import { ReactComponent as LikeIcon } from '@/assets/SVGs/like.svg';
import { ReactComponent as LikeOutlineIcon } from '@/assets/SVGs/like-outline.svg';
import { FooterMode } from '@/models/detail.model';
import styled from 'styled-components';

function DetailFooter(props: any) {
  const {
    event,
    footerMode,
    setFooterMode,
    likeEvent,
    unlikeEvent,
    participantsEvent,
    unparticipantsEvent,
    commentEvent,
    replyUser,
    setReplyUser,
  } = props;

  const [comment, setComment] = useState('');
  const [placeholder, setPlaceholder] = useState('Leave your comment here');

  const commitComment = () => {
    if (!comment) return;
    commentEvent(
      event.id,
      `${replyUser.username ? `@${replyUser.username}` : ''} ${comment}`,
    );
    setComment('');
    setReplyUser({});
  };
  const commitGoing = () => {
    if (event.me_going) {
      unparticipantsEvent(event.id);
    } else {
      participantsEvent(event.id);
    }
  };
  const commitLikes = () => {
    if (event.me_likes) {
      unlikeEvent(event.id);
    } else {
      likeEvent(event.id);
    }
  };

  const onClose = () => {
    setFooterMode(FooterMode.ACTION);
    setReplyUser({});
  };

  useEffect(() => {
    if (replyUser.username) {
      setPlaceholder(`@${replyUser.username}`);
    } else {
      setPlaceholder('Leave your comment here');
    }
  }, [replyUser]);

  const ReplyFooter = (
    <>
      <ReplyFooterContainer>
        <ReplyMSg>
          <CrossIcon style={crossIconStyle} onClick={onClose} />
          <Comment
            placeholder={placeholder}
            value={comment}
            onChange={(evt) => setComment(evt.target.value || '')}
          />
        </ReplyMSg>
      </ReplyFooterContainer>
      <SendMsg onClick={commitComment}>
        <SendIcon
          style={{ height: '0.75rem', width: '0.75rem', fill: '#8560A9' }}
        />
      </SendMsg>
    </>
  );
  const ActionFooter = (
    <>
      <ActionFooterContainer>
        <CommentIcon
          style={likeOutLineStyle}
          onClick={() => setFooterMode(FooterMode.REPLY)}
        />
        {event.me_likes ? (
          <LikeIcon style={iconStyle} onClick={commitLikes} />
        ) : (
          <LikeOutlineIcon style={likeOutLineStyle} onClick={commitLikes} />
        )}
      </ActionFooterContainer>

      <Going onClick={commitGoing}>
        {event.me_going ? (
          <CheckIcon style={checkIconStyle} />
        ) : (
          <CheckOutlineIcon style={checkoutIconStyle} />
        )}
        {event.me_going ? (
          <div style={{ color: '#8560A9', fontSize: '0.438rem' }}>
            I am going
          </div>
        ) : (
          <div style={{ fontSize: '0.438rem', color: '#788C36' }}>join</div>
        )}
      </Going>
    </>
  );

  return (
    <Footer>
      {footerMode === FooterMode.REPLY ? ReplyFooter : ActionFooter}
    </Footer>
  );
}

export default connect(
  ({ detail }: any) => ({ ...detail }),
  mapDispatchToProps,
)(DetailFooter);

const ReplyMSg = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const SendMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d5ef7f;
  height: 100%;
  width: 20%;
`;

const crossIconStyle = {
  height: '0.8rem',
  width: '0.8rem',
  padding: '0.1rem',
  fill: '#D5EF7F',
};

const iconStyle = {
  height: '0.65rem',
  width: '0.65rem',

  margin: '0 0.8rem',
  fill: '#D5EF7F',
};
const likeOutLineStyle = {
  height: '0.65rem',
  width: '0.65rem',

  margin: '0 0.8rem',
  fill: '#453257',
};

const Going = styled.div`
  width: 43.75%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d5ef7f;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  height: 1.75rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border: none;
`;

const ActionFooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #8560a9;
  width: 56.25%;
`;

const Comment = styled.input`
  /* flex: 1; */
  margin: 0.4rem 0.4rem;
  outline: none;
  height: 1rem;
  border: none;
  display: flex;
  border-radius: 1.4rem;
  padding: 0 0.4rem;
  line-height: 1rem;
  align-items: center;
  width: 80%;
  color: #d3c1e5;
  font-size: 0.438rem;
`;

const ReplyFooterContainer = styled.div`
  background-color: #8560a9;
  width: 100%;
`;

const checkoutIconStyle = {
  fill: '#788C36',
  height: '0.65rem',
  width: '0.65rem',
  margin: '0 0.4rem',
};
const checkIconStyle = {
  fill: '#8560a9',
  height: '0.65rem',
  width: '0.65rem',
  margin: '0 0.4rem',
};
