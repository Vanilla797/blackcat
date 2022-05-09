import React from 'react';
import styled from 'styled-components';

function BreadCrumb(props: any, ref: any) {
  const { activeIndex, onTabClick, tabItems } = props;

  const TabItems = tabItems.map((item: any, index: number) => {
    return (
      <>
        <TabItem key={item.name} onClick={() => onTabClick(index)}>
          {activeIndex === index ? item.activeIcon : item.inactiveIcon}
          {activeIndex === index ? (
            <div style={{ paddingLeft: '0.1rem', color: '#AECB4F' }}>
              {item.name}
            </div>
          ) : (
            <div style={{ paddingLeft: '0.1rem' }}>{item.name}</div>
          )}

          {/* {tabItems.length !== index + 1 ? <Divider /> : ''} */}
        </TabItem>
        {tabItems.length !== index + 1 ? <Divider /> : ''}
      </>
    );
  });

  return <Tab ref={ref}>{TabItems}</Tab>;
}

export default React.forwardRef(BreadCrumb);

const Tab = styled.div`
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  height: 1.5rem;
  position: sticky;
  top: 0;
  color: #8c8c8c;
  background-color: white;
  font-size: 0.375rem;
  min-width: 10rem;
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Divider = styled.div`
  height: 0.34rem;
  border-right: 1px solid #e8e8e8;
  /* margin-left: 0.5rem; */
`;
