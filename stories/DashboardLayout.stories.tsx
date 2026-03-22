import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "../src/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../src/components/Card";
import { StatsCard } from "../src/components/StatsCard";
import { Home, Users, BarChart3, FileText, Settings, Calendar, Bell, Mail } from "lucide-react";

const meta = {
  title: "Components/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "#",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    badge: "New",
    href: "#",
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="h-5 w-5" />,
    children: [
      { id: "all-users", label: "All Users", icon: <Users className="h-4 w-4" />, href: "#" },
      { id: "user-roles", label: "User Roles", icon: <Settings className="h-4 w-4" />, href: "#" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileText className="h-5 w-5" />,
    href: "#",
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail className="h-5 w-5" />,
    badge: "2",
    href: "#",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="h-5 w-5" />,
    href: "#",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    href: "#",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "#",
  },
];

/**
 * Basic usage
 */
export const Default: Story = {
  render: () => (
    <DashboardLayout>
      <div className="p-4">This is the dashboard content area.</div>
    </DashboardLayout>
  ),
  args: {},
};

/**
 * Analytics dashboard shell
 */
export const AnalyticsDashboardShellStory: Story = {
  render: () => {
    const [active, setActive] = React.useState("analytics");
    return (
      <DashboardLayout
        sidebarMenuItems={menuItems}
        activeSidebarItem={active}
        onSidebarItemClick={setActive}
        breadcrumbs={[
          { label: "Home", href: "#" },
          { label: "Analytics" },
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatsCard
            title="Revenue"
            value="$18,500"
            trend={{ direction: "up", value: "+2.1%", label: "vs last week" }}
          />
          <StatsCard
            title="Users"
            value="1,230"
            trend={{ direction: "up", value: "+1.5%", label: "vs last week" }}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            {/* In a real app, embed a chart or table here */}
            <div className="h-24 flex items-center justify-center text-gray-400">
              [Chart Component Placeholder]
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  },
  name: "Analytics Dashboard (Real Use Case)",
  parameters: {
    docs: {
      description: {
        story:
          "Shows DashboardLayout with realistic sidebar, stateful menu, breadcrumbs, stats widgets and cards. Demonstrates real dashboard layout patterns.",
      },
    },
  },
  args: {},
};

export const AnalyticsDashboardShell = {
  ...AnalyticsDashboardShellStory,
};
