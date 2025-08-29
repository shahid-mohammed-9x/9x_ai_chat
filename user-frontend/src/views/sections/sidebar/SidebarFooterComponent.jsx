import React, { memo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings2, ChevronsUpDown, LogOut, Wallet, Plus } from 'lucide-react';
import { getInitials } from '@/helpers';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SidebarFooterComponent = ({ user, logoutFunction, isSidebarOpen }) => {
  return (
    <SidebarFooter>
      {user ? (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar} alt={user?.fullName} />
                    <AvatarFallback className="rounded-lg">
                      {' '}
                      {getInitials(user?.fullName ?? '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.fullName}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} alt={user?.fullName} />
                      <AvatarFallback className="rounded-lg">
                        {' '}
                        {getInitials(user?.fullName ?? '')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.fullName}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/settings/my-profile')}>
                    <Settings2 />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Wallet />
                    Subscription
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logoutFunction}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      ) : (
        <SidebarMenu className={'space-y-1.5 my-2'}>
          {isSidebarOpen ? (
            <Card className="p-4 flex flex-col gap-4">
              {/* Plan Usage */}
              <div className="mt-auto space-y-2">
                <p className="text-md  font-extrabold">Free Plan:</p>
                <p className="text-sm text-muted-foreground">0/2 messages used</p>
                <Progress value={50} />
              </div>
            </Card>
          ) : null}

          <Button>
            <Plus /> {isSidebarOpen && 'Login'}
          </Button>
        </SidebarMenu>
      )}
    </SidebarFooter>
  );
};

export default memo(SidebarFooterComponent);
