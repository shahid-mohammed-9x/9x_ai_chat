import React, { memo } from "react";
import HomeLayout from "@/views/layouts/HomeLayout";
import HeroComponent from "../features/home/HeroComponent";

const Home = () => {
  return (
    <HomeLayout>
      <HeroComponent />
      
    </HomeLayout>
  );
};

export default memo(Home);
