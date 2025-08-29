import React, { memo } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatLayout from '../layouts/ChatLayout';
import { useSelector } from 'react-redux';

const NewChat = () => {
  const { profileDetails } = useSelector((state) => state.userProfileState);
  return (
    <ChatLayout>
      <div className="m-auto w-full">
        <div>
          <p className="text-center text-4xl font-bold mb-6">
            Welcome {profileDetails?.fullName ?? profileDetails?.email}, how can I help?
          </p>
          <ChatFooter />
        </div>
      </div>
    </ChatLayout>
  );
};

export default memo(NewChat);
