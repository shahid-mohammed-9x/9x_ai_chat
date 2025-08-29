import React, { memo } from 'react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarHeaderComponent = ({ isSidebarOpen, profileDetails }) => {
  const navigate = useNavigate();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <div>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <School className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold capitalize">{'9x AI Chat'}</span>
                <span className="truncate text-xs">Talk With AI</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {profileDetails && (
          <SidebarMenuButton asChild className="w-full my-3">
            <Button
              onClick={() => navigate('/new-chat')}
              className={'cursor-pointer hover:bg-primary/90 hover:text-black'}
            >
              <Plus /> {isSidebarOpen && 'New Chat'}
            </Button>
          </SidebarMenuButton>
        )}
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default memo(SidebarHeaderComponent);
