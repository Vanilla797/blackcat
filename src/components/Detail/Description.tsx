import { useState, useEffect, useRef } from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';

interface DescriptionProps {
  description: string;
}

const Description = (props: DescriptionProps) => {
  const { description } = props;

  const [canShowAll, setCanShowAll] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onShowAll = () => {
    setCanShowAll(!canShowAll);

    return <Content ref={descriptionRef}>{description}</Content>;
  };

  useEffect(() => {
    setCanShowAll(description?.length <= 300);
  }, [description]);

  return (
    <DescriptionContainer ref={containerRef}>
      {canShowAll ? (
        <Content ref={descriptionRef}>{description}</Content>
      ) : (
        <Content ref={descriptionRef}>{description?.slice(0, 300)}</Content>
      )}
      {/* <Content ref={descriptionRef}>{description}</Content> */}
      {!canShowAll && (
        <>
          <Mask></Mask>
          <StyledTag onClick={onShowAll}>VIEW ALL</StyledTag>
        </>
      )}
    </DescriptionContainer>
  );
};

export default Description;

const DescriptionContainer = styled.div`
  width: 100%;
  max-height: 12rem;
  overflow: hidden;
  position: relative;

  margin: 0.375rem 0 0.375rem 0;
  padding: 0 0.5rem;
`;

const Content = styled.p`
  color: #67616d;
  font-size: 0.438rem;
`;

const tagStyle = {
  height: '0.8rem',
  lineHeight: '0.8rem',
  width: '2rem',
  borderRadius: '0.3rem',
  position: 'absolute',
  bottom: 0,
  right: 0,
  background: '#d5ef7f',
  border: 'none',
  fontSize: '0.31rem',
  marginRight: '0.5rem',
  padding: '0 0.3rem ',
  color: '#67616D',
};

const Mask = styled.div`
  position: absolute;
  bottom: 0;
  height: 5rem;
  width: 100%;
  background-image: linear-gradient(
    rgba(250, 249, 252, 0),
    rgba(250, 249, 252, 0.7),
    rgba(250, 249, 252, 1)
  );
`;

const StyledTag = styled(Tag)`
  height: 0.8rem;
  line-height: 0.8rem;
  width: 2rem;
  border-radius: 0.3rem;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #d5ef7f;
  border: none;
  font-size: 0.31rem;
  margin-right: 0.5rem;
  padding: 0 0.3rem;
  color: #67616d;
`;
