import React, { useEffect, useState, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '@/components/custom/loaders/InitialLoader';
import Service from '@/services';
import { getAccessToken } from '@/helpers/local-storage';
import { ChatSkeleton, SidebarSkeleton } from './AuthWrapper';

const ChatWrapper = ({ roles = [], children }) => {
  const { getUserProfileAction } = userActions;

  const { profileDetails, statusCode, error } = useSelector((state) => state.userProfileState);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token && !profileDetails) {
      dispatch(getUserProfileAction());
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error && statusCode === 401) {
      navigate('/');
    }
  }, [error]);

  useEffect(() => {
    if (profileDetails) {
      setIsLoading(false);
    }
  }, [profileDetails]);

  useEffect(() => {
    // Return cleanup function that will execute when route changes
    return () => {
      if (!isLoading) {
        Service.cancelAllRequests();
      }
    };
  }, [location.pathname, isLoading]);

  return isLoading ? (
    <div className="flex">
      <InitialLoader loading={true} />
      <SidebarSkeleton />
      <ChatSkeleton />
    </div>
  ) : (
    children
  );
};

export default memo(ChatWrapper);
