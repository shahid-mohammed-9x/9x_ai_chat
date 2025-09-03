import React, { memo } from 'react';
import HomeLayout from '@/views/layouts/HomeLayout';
import HeroComponent from '../features/home/HeroComponent';
import HeroComponent1 from '../features/home/HeroComponent1';
import PricingComponent from '../features/home/PricingComponent';
import FAQSection from '../features/home/FAQSection';
import Footer from '../features/home/Footer';

const Home = () => {
  return (
    <HomeLayout>
      <HeroComponent />
      <HeroComponent1 />
      <PricingComponent />
      <FAQSection />
      <Footer />
    </HomeLayout>
  );
};

export default memo(Home);
