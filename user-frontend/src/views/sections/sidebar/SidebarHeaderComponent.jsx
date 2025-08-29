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
const SidebarHeaderComponent = ({ isSidebarOpen }) => {
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

        <SidebarMenuButton asChild className="w-full mt-3">
          <Button>
            <Plus /> {isSidebarOpen && 'New Chat'}
          </Button>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default memo(SidebarHeaderComponent);
