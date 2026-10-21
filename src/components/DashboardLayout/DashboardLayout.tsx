import * as React from "react";
import { cn } from "../../utils/cn";
import { Sidebar, type MenuItem, type SidebarProfileSectionProps } from "../Sidebar";
import {
  DashboardHeader,
  type BreadcrumbItem,
  type ResponsiveShow,
  type DashboardHeaderProps,
} from "../DashboardHeader";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import type { DropdownItem, DropdownProps } from "../Dropdown";
import type { NightModeSwitchProps } from "../NightModeSwitch";

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
  /** Custom dropdown items for profile dropdown (forwarded to DashboardHeader and Sidebar) */
  profileDropdownItems?: DropdownItem[];
  /** Additional props for profile dropdown (forwarded to DashboardHeader and Sidebar) */
  profileDropdownProps?: Partial<DropdownProps>;
  /** Whether clicking profile opens dropdown menu (forwarded to DashboardHeader and Sidebar) */
  showProfileDropdown?: boolean;
  /** Whether to show dropdown arrow beside avatar/profile (forwarded to DashboardHeader and Sidebar) */
  showProfileDropdownArrow?: boolean;

  /** Whether to show dark mode switch in DashboardHeader (default: false) */
  showDarkMode?: ResponsiveShow;
  /** Callback when dark mode toggle is clicked */
  onDarkModeToggle?: () => void;
  /** Optional props to pass to NightModeSwitch */
  darkModeSwitchProps?: Partial<NightModeSwitchProps>;

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
    profileDropdownItems,
    profileDropdownProps,
    showProfileDropdown,
    showProfileDropdownArrow,
    showDarkMode,
    onDarkModeToggle,
    darkModeSwitchProps,
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
          profileDropdownItems={profileDropdownItems}
          profileDropdownProps={profileDropdownProps}
          showProfileDropdown={showProfileDropdown}
          showProfileDropdownArrow={showProfileDropdownArrow}
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
          onProfileClick={
            profileButtonProps?.onClick
              ? () => profileButtonProps.onClick?.({} as any)
              : undefined
          }
          onLogoutClick={
            logoutButtonProps?.onLogout
              ? logoutButtonProps.onLogout
              : logoutButtonProps?.onClick
                ? () => logoutButtonProps.onClick?.({} as any)
                : undefined
          }
          profileDropdownItems={profileDropdownItems}
          profileDropdownProps={profileDropdownProps}
          showProfileDropdown={showProfileDropdown}
          showProfileDropdownArrow={showProfileDropdownArrow}
          {...dashboardHeaderProps}
          {...(showDarkMode !== undefined ? { showDarkMode } : {})}
          {...(onDarkModeToggle !== undefined ? { onDarkModeToggle } : {})}
          {...(darkModeSwitchProps !== undefined ? { darkModeSwitchProps } : {})}
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

export { DashboardLayout, type DashboardLayoutProps };