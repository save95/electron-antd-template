import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const IconStyle = {
  color: 'green',
  fontSize: 16,
};

const TrueFalse = (props) => {
  const { val } = props;

  return val ? (
    <CheckCircleOutlined style={IconStyle} />
  ) : (
    <CloseCircleOutlined style={{ ...IconStyle, color: 'red' }} />
  );
};

export default TrueFalse;
