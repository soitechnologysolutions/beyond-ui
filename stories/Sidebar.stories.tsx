import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "../src/components/Sidebar";
import { Home, Users, BarChart3, FileText, Settings, Calendar, Bell, Mail } from "lucide-react";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoMenu = [
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
 * Default Sidebar story
 */
export const Default: Story = {
  render: () => <Sidebar menuItems={demoMenu} />,
};

/**
 * Sidebar story with custom header props
 */
export const CustomHeader: Story = {
  render: () => (
    <Sidebar
      menuItems={demoMenu}
      title="Admin Panel"
      titleLetter="A"
      headerClassName="text-primary-700"
    />
  ),
  name: "Custom Header (Dynamic Title & Letter)",
  parameters: {
    docs: {
      description: {
        story:
          "Sidebar with a dynamic header. The title and letter are supplied by the consumer via props. This demonstrates reusability and theme-agnostic design.",
      },
    },
  },
};

/**
 * Dashboard Sidebar story (real use case)
 */
export const SupportOperationsSidebarStory: Story = {
  render: () => {
    const [active, setActive] = React.useState("dashboard");
    return (
      <Sidebar
        menuItems={demoMenu}
        activeItem={active}
        onItemClick={(id) => setActive(id)}
        collapsed={false}
      />
    );
  },
  name: "Dashboard (Real Use Case)",
  parameters: {
    docs: {
      description: {
        story:
          "Realistic sidebar with multiple sections, icons, badges, and interactive highlighting for the active menu. Try clicking different menu and nested items.",
      },
    },
  },
};

export const SupportOperationsSidebar = {
  ...SupportOperationsSidebarStory,
};
