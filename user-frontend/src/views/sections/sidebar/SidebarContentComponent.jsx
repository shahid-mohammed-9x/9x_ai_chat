import { ArrowUpRight, Link, MoreHorizontal, StarOff, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '@/redux/combineAction';
import { useCallback, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SidebarContentComponent = ({ profileDetails }) => {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const { getChatsListAction } = chatActions;
  const { chatsList, loading } = useSelector((state) => state.chatsState);

  useEffect(() => {
    if (profileDetails && !chatsList && chatsList?.currentPage !== 1) {
      fetchChatListFunctions();
    }
  }, [profileDetails]);

  const fetchChatListFunctions = useCallback(() => {
    dispatch(getChatsListAction());
  }, [profileDetails, chatsList]);

  return (
    <SidebarContent>
      {profileDetails && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Chat History</SidebarGroupLabel>

          {loading ? (
            Array.from({ length: 15 }).map((_, idx) => (
              <Skeleton key={idx} className={`h-6 ${idx % 2 === 0 ? 'w-full' : 'w-10/12'}  mb-2`} />
            ))
          ) : (
            <SidebarMenu>
              {chatsList?.docs?.map((item) => (
                <SidebarMenuItem key={item?._id}>
                  <SidebarMenuButton asChild>
                    <div>
                      <span>{item?.title}</span>
                    </div>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 rounded-lg"
                      side={isMobile ? 'bottom' : 'right'}
                      align={isMobile ? 'end' : 'start'}
                    >
                      <DropdownMenuItem>
                        <Link className="text-muted-foreground" />
                        <span>Copy Link</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowUpRight className="text-muted-foreground" />
                        <span>Open in New Tab</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarGroup>
      )}
    </SidebarContent>
  );
};

export default SidebarContentComponent;
