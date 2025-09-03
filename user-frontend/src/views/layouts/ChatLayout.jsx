import React, { useCallback, useContext, memo, useEffect } from 'react';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import useLogout from '@/hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import Context from '@/context/context';
import _ from 'lodash';
import SidebarHeaderComponent from '../sections/sidebar/SidebarHeaderComponent';
import SidebarFooterComponent from '../sections/sidebar/SidebarFooterComponent';
import SidebarContentComponent from '../sections/sidebar/SidebarContentComponent';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import Password from '../models/Password';
import { themeActions } from '@/redux/combineAction';

const ChatLayout = ({ children }) => {
  const logoutFunction = useLogout();
  const dispatch = useDispatch();
  const { profileDetails } = useSelector((state) => state.userProfileState);
  const { openPasswordAction } = themeActions;
  const {
    sidebarState: { isSidebarOpen, navUser, changeNavUserAction, isSidebarOpenAction },
  } = useContext(Context);

  const handleSidebarTrigger = useCallback(() => {
    isSidebarOpenAction(!isSidebarOpen);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (profileDetails?.fullName == null) {
      dispatch(openPasswordAction('true'));
    }
  }, [profileDetails, dispatch, openPasswordAction]);
  return (
    <>
      <Password />
      <SidebarProvider open={isSidebarOpen}>
        <Sidebar collapsible="icon">
          <SidebarHeaderComponent isSidebarOpen={isSidebarOpen} profileDetails={profileDetails} />
          <Separator />

          <SidebarContentComponent profileDetails={profileDetails} />

          <Separator />
          <SidebarFooterComponent
            user={profileDetails}
            logoutFunction={logoutFunction}
            isSidebarOpen={isSidebarOpen}
          />

          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 p-4">
              <SidebarTrigger onClick={() => handleSidebarTrigger(!isSidebarOpen)} />
            </div>
            {/* {children} */}
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto w-full">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default memo(ChatLayout);
