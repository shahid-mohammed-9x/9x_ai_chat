import React, { memo } from "react";

const HomeLayout = ({ children }) => {
  return <div className="home-layout">{children}</div>;
};

export default memo(HomeLayout);
