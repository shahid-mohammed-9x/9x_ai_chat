import React, { useEffect, useState, memo } from 'react';
import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from '@/components/custom/loaders/InitialLoader';
import Service from '@/services';
import useLogout from '@/hooks/useLogout';

export const SidebarSkeleton = memo(() => {
  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar shadow-lg ">
      {/* Header Skeleton */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Navigation Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Nav Section */}
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />

          {/* Nav Items */}
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg">
                  <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                </div>

                {/* Submenu Items */}
                <div className="ml-9 space-y-3">
                  {[...Array(3)].map((_, subIndex) => (
                    <div key={subIndex} className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />

          {/* Quick Access Items */}
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg">
                <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer User Profile Skeleton */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
});

export const ChatSkeleton = memo(() => {
  return (
    <div className="flex ml-3 h-screen w-full flex-col bg-sidebar shadow-lg ">
      {/* Main Navigation Skeleton */}
      <div className="flex-1  p-4 space-y-6">
        <div className="w-full flex flex-col h-[700px] rounded-2xl shadow-lg">
          <div className="flex flex-col space-y-6 p-4 max-h-[80vh] overflow-y-auto no-scrollbar">
            <div className="space-y-6 animate-pulse">
              {/* User Message Skeleton */}
              <div className="flex justify-end">
                <div className="flex items-center gap-2 max-w-[90%]">
                  <div className="bg-gray-300 h-6 w-10 rounded-2xl" />
                  <div className="bg-gray-300 h-8 w-8 rounded-lg" />
                </div>
              </div>

              {/* AI Responses Skeleton */}
              <div className="w-full shadow-2xl rounded-2xl">
                <div className="flex flex-row gap-4 p-4 overflow-x-auto min-h-[600px] no-scrollbar snap-x snap-mandatory">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-4 bg-gray-500 rounded-2xl snap-start flex-1 shrink-0 min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]"
                    >
                      <div className="bg-gray-300 h-8 w-8 rounded-full" />
                      <div className="bg-gray-300 h-[500px] w-full rounded-2xl" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const AuthWrapper = ({ roles = [], children }) => {
  const { getUserProfileAction } = userActions;
  const { profileDetails } = useSelector((state) => state.userProfileState);
  const dispatch = useDispatch();
  const checkAuth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutFunction = useLogout();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = checkAuth();
    if (token && !profileDetails) {
      dispatch(getUserProfileAction());
    }
  }, []);

  useEffect(() => {
    if (profileDetails) {
      setIsLoading(false);
      if (!roles.includes(profileDetails?.role)) {
        logoutFunction();
        navigate('/');
      }
    }
  }, [profileDetails, roles]);

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

export default memo(AuthWrapper);
