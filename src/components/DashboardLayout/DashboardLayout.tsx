import * as React from "react";
import { cn } from "../../utils/cn";
import { Sidebar, type MenuItem, type SidebarProfileSectionProps } from "../Sidebar";
import { DashboardHeader, type BreadcrumbItem } from "../DashboardHeader";
import { useBreakpoint } from "../../hooks/useBreakpoint";

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
  /** Optional direct profile name (forwarded to Sidebar and DashboardHeader) */
  name?: string;
  /** Optional direct profile email (forwarded to Sidebar and DashboardHeader) */
  email?: string;
  /** Optional direct profile avatar URL (forwarded to Sidebar and DashboardHeader) */
  avatarUrl?: string;
  /** Optional direct profile avatar fallback initials (forwarded to Sidebar and DashboardHeader) */
  avatarFallback?: string;
  /** Whether to display the sidebar profile section (default: true) */
  showProfileSection?: boolean;

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
    name,
    email,
    avatarUrl,
    avatarFallback,
    showProfileSection = true,
    dashboardHeaderProps,
    ...props
  }, ref) => {
    const mergedProfileSectionProps: SidebarProfileSectionProps | undefined =
      profileSectionProps || name || email || avatarUrl || avatarFallback
        ? {
            ...profileSectionProps,
            ...(name !== undefined ? { name } : {}),
            ...(email !== undefined ? { email } : {}),
            ...(avatarUrl !== undefined ? { avatarUrl } : {}),
            ...(avatarFallback !== undefined ? { avatarFallback } : {}),
          }
        : undefined;
    const { currentBreakpoint } = useBreakpoint();

    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
      if (typeof window !== "undefined") {
        return window.innerWidth < 1024;
      }
      return true; // Default to mobile/hidden on SSR
    });

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        setSidebarCollapsed(window.innerWidth < 1024);
      }
    }, [currentBreakpoint]);

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
          onItemClick={(id) => {
            onSidebarItemClick?.(id);
            if (typeof window !== "undefined" && window.innerWidth < 1024) {
              setSidebarCollapsed(true);
            }
          }}
          className={cn(
            props.sidebarClassName,
            "max-lg:z-50"
          )}
          title={sidebarTitle}
          titleLetter={sidebarTitleLetter}
          headerClassName={sidebarHeaderClassName}
          style={{
            zIndex: 50,
          }}
          profileButtonProps={profileButtonProps}
          logoutButtonProps={logoutButtonProps}
          profileSectionProps={mergedProfileSectionProps}
          showProfileSection={showProfileSection}
        />

        {/* Fixed Header */}
        <DashboardHeader
          sidebarCollapsed={sidebarCollapsed}
          onMenuToggle={toggleSidebar}
          breadcrumbs={breadcrumbs}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          onSearchChange={onSearchChange}
          profileSectionProps={mergedProfileSectionProps}
          name={mergedProfileSectionProps?.name}
          email={mergedProfileSectionProps?.email}
          avatarUrl={mergedProfileSectionProps?.avatarUrl || mergedProfileSectionProps?.avatar}
          avatarFallback={mergedProfileSectionProps?.avatarFallback}
          {...dashboardHeaderProps}
          className={cn(
            "transition-all duration-300 ease-in-out",
            "max-lg:left-0 max-lg:w-full",
            sidebarCollapsed ? "lg:left-16 lg:w-[calc(100%-4rem)]" : "lg:left-72 lg:w-[calc(100%-18rem)]",
            dashboardHeaderProps?.className
          )}
          style={{
            zIndex: 30,
            position: "fixed",
            top: 0,
            ...dashboardHeaderProps?.style
          }}
        />

        {/* Main Content Area (scrollable) */}
        <div
          className={cn(
            "relative h-full transition-all duration-300 ease-in-out",
            props.disableSidebarMargin ? "w-full" : cn(
              "max-lg:ml-0 max-lg:w-full",
              sidebarCollapsed ? "lg:ml-16 lg:w-[calc(100%-4rem)]" : "lg:ml-72 lg:w-[calc(100%-18rem)]"
            )
          )}
          style={{
            marginTop: "4.5rem", // Header height (py-4 + border)
            height: "calc(100vh - 4.5rem)",
            overflowY: "auto",
          }}
        >
          <main className="p-4 md:p-10 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>

        {/* Mobile Overlay */}
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/80 z-40 backdrop-blur-sm transition-opacity lg:hidden cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Close sidebar overlay"
          />
        )}
      </div>
    );
  }
);

DashboardLayout.displayName = "DashboardLayout";

export { DashboardLayout };