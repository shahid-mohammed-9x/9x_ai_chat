import React, { memo } from "react";
import { School, ChevronRight, GraduationCap, House } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import useLogout from "@/hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import Context from "@/context/context";

const data = {
  navMain: [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "#",
      icon: School,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/admin/dashboard/analytics",
        },
      ],
    },

    {
      id: "batch",
      title: "Batch",
      url: "#",
      icon: GraduationCap,
      isActive: false,
      items: [
        {
          title: "Year Batches",
          url: "/batches",
        },
      ],
    },
  ],
  quickAccess: [
    {
      name: "Home Page",
      url: "/",
      icon: House,
    },
  ],
};

const SidebarContentComponent = ({ navUser, changeNavGroupFunction }) => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <Collapsible
              key={item?.title}
              asChild
              // defaultOpen={navUser[item?.id] ?? false}
              open={navUser[item?.id] ?? false}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  asChild
                  onClick={() => changeNavGroupFunction(item?.id)}
                >
                  <SidebarMenuButton tooltip={item?.title}>
                    {item?.icon && <item.icon />}
                    <span>{item?.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item?.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem?.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem?.url}>
                            <span>{subItem?.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
            <SidebarMenu>
              {data.quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup> */}
    </SidebarContent>
  );
};

export default memo(SidebarContentComponent);
