import * as React from "react";
import { Sidebar } from "./Sidebar";
import type { MenuItem } from "./Sidebar";

const demoMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <span>D</span>,
    href: "#"
  },
  {
    id: "settings",
    label: "Settings",
    icon: <span>S</span>,
    href: "#"
  }
];

export const SidebarExample: React.FC = () => (
  <div className="h-screen w-full relative bg-gray-50 dark:bg-gray-950">
    <Sidebar menuItems={demoMenu} />
  </div>
);