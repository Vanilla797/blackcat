import map from '@/assets/images/gmap.png';
import { ListItemData } from '@/models/detail.model';
import styled from 'styled-components';

interface WhereProps {
  event: ListItemData;
}

export default function Where(props: WhereProps) {
  const { location, location_detail } = props.event;

  return (
    <Contianer>
      <Title>Where</Title>

      <Description>
        <div style={{ fontWeight: 'bold', fontSize: '0.4375rem' }}>
          {location}
        </div>
        <div style={{ fontSize: '0.4375rem' }}>{location_detail}</div>
        <Img src={map} alt="Gmap" />
      </Description>
    </Contianer>
  );
}
const Contianer = styled.div`
  padding: 0.4375rem;
  border-top: 1px solid #e8e8e8;
`;

const Title = styled.div`
  color: #8560a9;
  font-weight: bold;
  font-size: 0.5rem;
  padding-left: 0.2rem;
  border-left: 0.1rem solid #8560a9;
  margin: 0.1rem 0;
`;

const Description = styled.div`
  color: #67616d;
  margin: 0.4375rem 0 0.4375rem 0;
`;
const Img = styled.img`
  margin-top: 0.4375rem;
  height: 2.75rem;
  width: 9rem;
  border-radius: 0.1rem;
`;
