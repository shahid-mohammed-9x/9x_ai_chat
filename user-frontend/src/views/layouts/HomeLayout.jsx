import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const HomeLayout = ({ children }) => {
  return <div className="home-layout">{children}</div>;
};

export default memo(HomeLayout);
