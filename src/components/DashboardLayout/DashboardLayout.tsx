import * as React from "react";
import { cn } from "../../utils/cn";
import { Sidebar, type MenuItem, type SidebarProfileSectionProps } from "../Sidebar";
import { DashboardHeader, type BreadcrumbItem } from "../DashboardHeader";

/**
 * DashboardLayoutProps
 * - sidebarTitle: Title text for Sidebar header (default: "Beyond")
 * - sidebarTitleLetter: Letter/initial for Sidebar header (default: "B")
 * - sidebarHeaderClassName: Optional className for SidebarHeader
 *
 * These props are forwarded to Sidebar for dynamic header branding.
 */
import type { DashboardHeaderProps } from "../DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebarMenuItems?: MenuItem[];
  activeSidebarItem?: string;
  breadcrumbs?: BreadcrumbItem[];
  onSidebarItemClick?: (itemId: string) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  sidebarClassName?: string;
  disableSidebarMargin?: boolean;
  /** Sidebar header title (default: "Beyond") */
  sidebarTitle?: string;
  /** Sidebar header letter (default: "B") */
  sidebarTitleLetter?: string;
  /** Optional className for SidebarHeader */
  sidebarHeaderClassName?: string;
  /** Props for ProfileButton in Sidebar */
  profileButtonProps?: import("../Sidebar/ProfileButton").ProfileButtonProps;
  /** Props for LogoutButton in Sidebar */
  logoutButtonProps?: import("../Sidebar/LogoutButton").LogoutButtonProps;
  /** Props for Sidebar profile section (avatar, name, email, etc.) */
  profileSectionProps?: SidebarProfileSectionProps;

  /** Props to customize DashboardHeader */
  dashboardHeaderProps?: DashboardHeaderProps;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({
    children,
    className,
    sidebarMenuItems,
    activeSidebarItem,
    breadcrumbs,
    onSidebarItemClick,
    showSearch,
    searchPlaceholder,
    onSearchChange,
    sidebarTitle,
    sidebarTitleLetter,
    sidebarHeaderClassName,
    profileButtonProps,
    logoutButtonProps,
    profileSectionProps,
    dashboardHeaderProps,
    ...props
  }, ref) => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    const toggleSidebar = () => {
      setSidebarCollapsed(prev => !prev);
    };

    return (
      <div ref={ref} className={cn("bg-gray-50 dark:bg-gray-900 w-full h-screen overflow-hidden", className)} {...props}>
        {/* Fixed Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          menuItems={sidebarMenuItems}
          activeItem={activeSidebarItem}
          onItemClick={onSidebarItemClick}
          className={props.sidebarClassName}
          title={sidebarTitle}
          titleLetter={sidebarTitleLetter}
          headerClassName={sidebarHeaderClassName}
          style={{
            zIndex: 50,
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: sidebarCollapsed ? "4rem" : "18rem", // Tailwind: w-16 or w-72
            transition: "width 0.3s",
          }}
          profileButtonProps={profileButtonProps}
          logoutButtonProps={logoutButtonProps}
          profileSectionProps={profileSectionProps}
        />

        {/* Fixed Header */}
        <DashboardHeader
          sidebarCollapsed={sidebarCollapsed}
          onMenuToggle={toggleSidebar}
          breadcrumbs={breadcrumbs}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          onSearchChange={onSearchChange}
          style={{
            zIndex: 30,
            position: "fixed",
            top: 0,
            left: sidebarCollapsed ? "4rem" : "18rem",
            right: 0,
            width: `calc(100% - ${sidebarCollapsed ? "4rem" : "18rem"})`,
            transition: "left 0.3s, width 0.3s",
          }}
          {...dashboardHeaderProps}
        />

        {/* Main Content Area (scrollable) */}
        <div
          className={cn(
            "relative w-full h-full",
            props.disableSidebarMargin ? "" : ""
          )}
          style={{
            marginLeft: sidebarCollapsed ? "4rem" : "18rem",
            marginTop: "4.5rem", // Header height (py-4 + border)
            height: "calc(100vh - 4.5rem)",
            overflowY: "auto",
            transition: "margin-left 0.3s",
          }}
        >
          <main className="p-10 w-[90vw]">
            {children}
          </main>
        </div>

        {/* Mobile Overlay */}
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    );
  }
);

DashboardLayout.displayName = "DashboardLayout";

export { DashboardLayout };