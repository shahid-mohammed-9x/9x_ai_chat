import React, { memo } from 'react';
import HomeLayout from '@/views/layouts/HomeLayout';
import HeroComponent from '../features/home/HeroComponent';
import HeroComponent1 from '../features/home/HeroComponent1';

const Home = () => {
  return (
    <HomeLayout>
      <HeroComponent />
      <HeroComponent1 />
    </HomeLayout>
  );
};

export default memo(Home);
