import React, { useCallback, useContext, memo } from 'react';
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

const user = {
  name: 'John',
  email: 'jonh Doe',
  avatar: null,
};

const ChatLayout = ({ children }) => {
  const logoutFunction = useLogout();
  const navigate = useNavigate();
  const {
    sidebarState: { isSidebarOpen, navUser, changeNavUserAction, isSidebarOpenAction },
  } = useContext(Context);

  const changeNavGroupFunction = useCallback(
    (id) => {
      let value = navUser[id];
      let updateState = _.cloneDeep(navUser);
      updateState[id] = !value;
      changeNavUserAction(updateState);
    },
    [navUser]
  );

  const handleSidebarTrigger = useCallback(() => {
    isSidebarOpenAction(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <SidebarProvider open={isSidebarOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeaderComponent isSidebarOpen={isSidebarOpen} />
        <Separator />

        <SidebarContentComponent
          navUser={navUser}
          changeNavGroupFunction={changeNavGroupFunction}
        />

        <SidebarFooterComponent user={user} logoutFunction={logoutFunction} />

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 p-4">
            <SidebarTrigger onClick={() => handleSidebarTrigger(!isSidebarOpen)} />
          </div>
          {/* {children} */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto w-full">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default memo(ChatLayout);
