import React from 'react';
import { Result, Button } from 'antd';

function Notfound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
}

export default Notfound;
