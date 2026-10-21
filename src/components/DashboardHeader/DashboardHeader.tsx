import * as React from "react";
import { Search, Bell, Settings, Menu, User, LogOut } from "lucide-react";
import { cn } from "../../utils/cn";
import { Input } from "../Input";
import { Button } from "../Button";
import { Avatar, AvatarImage, AvatarFallback } from "../Avatar";
import { Badge } from "../Badge";
import {
  Dropdown,
  DropdownArrow,
  type DropdownItem,
  type DropdownProps,
} from "../Dropdown";
import {
  NightModeSwitch,
  type NightModeSwitchProps,
} from "../NightModeSwitch";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

type ResponsiveShow = boolean | { mobile?: boolean; desktop?: boolean };

type DashboardHeaderSlotItem = {
  element: React.ReactNode;
  onClick?: () => void;
  id?: string;
};
type DashboardHeaderSlot = React.ReactNode | DashboardHeaderSlotItem[];

interface DashboardHeaderProps {
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
  onMenuToggle?: () => void;
  sidebarCollapsed?: boolean;
  showSearch?: ResponsiveShow;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  style?: React.CSSProperties;

  // New flexible API
  showBreadcrumbs?: ResponsiveShow; // default true
  showNotifications?: ResponsiveShow; // default true
  showSettings?: ResponsiveShow; // default true
  showProfile?: ResponsiveShow; // default true
  showMenuButton?: ResponsiveShow; // default true
  /** Whether to show the dark mode toggle switch (default: false) */
  showDarkMode?: ResponsiveShow;
  /** Callback invoked when the dark mode switch is clicked */
  onDarkModeToggle?: () => void;
  /** Optional props to pass to NightModeSwitch */
  darkModeSwitchProps?: Partial<NightModeSwitchProps>;

  // OnClick handlers for standard components
  onMenuButtonClick?: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;

  // Custom slots
  leftSlot?: DashboardHeaderSlot;
  centerSlot?: DashboardHeaderSlot;
  rightSlot?: DashboardHeaderSlot;

  // Profile details
  name?: string;
  email?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  profileSectionProps?: {
    avatarUrl?: string;
    avatar?: string;
    name?: string;
    email?: string;
    avatarFallback?: string;
  };
  /** Custom dropdown items for the header profile dropdown */
  profileDropdownItems?: DropdownItem[];
  /** Additional props passed to the profile Dropdown component */
  profileDropdownProps?: Partial<DropdownProps>;
  /** Whether clicking the profile opens the dropdown menu (default: true) */
  showProfileDropdown?: boolean;
  /** Whether to display the dropdown arrow beside the avatar (default: true) */
  showProfileDropdownArrow?: boolean;
}

const DashboardHeader = React.forwardRef<HTMLDivElement, DashboardHeaderProps>(
  ({
    className,
    breadcrumbs = [{ label: "Dashboard" }],
    onMenuToggle,
    sidebarCollapsed = false,
    showSearch = true,
    searchPlaceholder = "Search...",
    onSearchChange,
    showBreadcrumbs = true,
    showNotifications = true,
    showSettings = true,
    showProfile = true,
    showMenuButton = true,
    showDarkMode = false,
    onDarkModeToggle,
    darkModeSwitchProps,
    leftSlot,
    centerSlot,
    rightSlot,
    onMenuButtonClick,
    onNotificationClick,
    onSettingsClick,
    onProfileClick,
    onLogoutClick,
    onBreadcrumbClick,
    name,
    email,
    avatarUrl,
    avatarFallback,
    profileSectionProps,
    profileDropdownItems,
    profileDropdownProps,
    showProfileDropdown = true,
    showProfileDropdownArrow = true,
    ...props
  }, ref) => {
    const [searchValue, setSearchValue] = React.useState("");

    const resolvedName = name || profileSectionProps?.name || "John Doe";
    const resolvedEmail = email || profileSectionProps?.email || "Administrator";
    const resolvedAvatarUrl =
      avatarUrl ||
      profileSectionProps?.avatarUrl ||
      profileSectionProps?.avatar ||
      "";
    const resolvedAvatarFallback =
      avatarFallback ||
      profileSectionProps?.avatarFallback ||
      (resolvedName
        ? resolvedName
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "JD");

    // Helper to resolve ResponsiveShow prop directly to Tailwind display classes
    const getVisibilityClasses = (
      prop: ResponsiveShow | undefined,
      baseDisplayClass: string = "flex"
    ): string => {
      if (typeof prop === "boolean") return prop ? baseDisplayClass : "hidden";
      if (prop === undefined) return baseDisplayClass;
      
      const showMobile = prop.mobile ?? false;
      const showDesktop = prop.desktop ?? false;
      
      if (showMobile && showDesktop) return baseDisplayClass;
      if (!showMobile && !showDesktop) return "hidden";
      if (showMobile && !showDesktop) return `${baseDisplayClass} lg:hidden`;
      if (!showMobile && showDesktop) return `hidden lg:${baseDisplayClass}`;
      return baseDisplayClass;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      onSearchChange?.(value);
    };

    return (
      <header
        ref={ref}
        className={cn(
          "z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300",
          className
        )}
        style={props.style}
        {...props}
      >
        <div className="flex w-full items-center justify-between px-6 py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-4 flex-shrink-0 flex-grow-0 min-w-0">
            {/* Custom left slot */}
            {Array.isArray(leftSlot)
              ? leftSlot.map((item, idx) => (
                  <span
                    key={item.id || idx}
                    onClick={item.onClick}
                    className={item.onClick ? "cursor-pointer" : undefined}
                  >
                    {item.element}
                  </span>
                ))
              : leftSlot}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                getVisibilityClasses(showMenuButton, "flex lg:hidden"),
                "p-2 -ml-2 shrink-0 mr-2"
              )}
              aria-label="Open mobile menu"
              onClick={e => {
                onMenuButtonClick?.();
                onMenuToggle?.();
              }}
            >
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>

            {/* Breadcrumbs */}
              <nav
                className={cn(
                  getVisibilityClasses(showBreadcrumbs, "flex"),
                  "items-center space-x-2 text-sm",
                  "min-w-0 max-w-full overflow-x-auto whitespace-nowrap py-1 lg:w-auto lg:overflow-visible lg:whitespace-normal lg:py-0"
                )}
              >
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <span className="text-gray-400">/</span>
                    )}
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={e => {
                          onBreadcrumbClick?.(item, index);
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span
                        className="text-gray-900 dark:text-white font-medium"
                        onClick={e => {
                          onBreadcrumbClick?.(item, index);
                        }}
                        style={onBreadcrumbClick ? { cursor: "pointer" } : undefined}
                      >
                        {item.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
          </div>

          {/* Center Section - Search or custom center slot */}
          {centerSlot ? (
            <div className="flex-1 min-w-0 flex justify-center">
              {Array.isArray(centerSlot)
                ? centerSlot.map((item, idx) => (
                    <span
                      key={item.id || idx}
                      onClick={item.onClick}
                      className={item.onClick ? "cursor-pointer" : undefined}
                    >
                      {item.element}
                    </span>
                  ))
                : centerSlot}
            </div>
          ) : (
              <div className={cn(getVisibilityClasses(showSearch, "flex"), "flex-1 min-w-0 mx-2")}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 dark:text-white w-full"
                  />
                </div>
              </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-3 flex-shrink-0 flex-grow-0 min-w-0">
            {/* Custom right slot */}
            {Array.isArray(rightSlot)
              ? rightSlot.map((item, idx) => (
                  <span
                    key={item.id || idx}
                    onClick={item.onClick}
                    className={item.onClick ? "cursor-pointer" : undefined}
                  >
                    {item.element}
                  </span>
                ))
              : rightSlot}

            {/* Dark Mode Switch */}
            <div className={getVisibilityClasses(showDarkMode, "flex")}>
              <NightModeSwitch
                size="sm"
                className={cn(
                  "text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                  darkModeSwitchProps?.className
                )}
                onClick={(e) => {
                  onDarkModeToggle?.();
                  darkModeSwitchProps?.onClick?.(e);
                }}
                {...darkModeSwitchProps}
              />
            </div>

            {/* Notifications */}
              <div className={cn(getVisibilityClasses(showNotifications, "block"), "relative")}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={onNotificationClick}
                >
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="danger"
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
              </div>

            {/* Settings */}
            <div className={getVisibilityClasses(showSettings, "block")}>
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={onSettingsClick}
               >
                 <Settings className="h-5 w-5" />
               </Button>
            </div>

            {/* User Profile */}
            <div
              className={cn(
                getVisibilityClasses(showProfile, "flex"),
                "items-center pl-3 border-l border-gray-200 dark:border-gray-800"
              )}
            >
              {showProfileDropdown ? (
                <Dropdown
                  align="right"
                  placement="bottom"
                  showArrow={showProfileDropdownArrow}
                  triggerClassName="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  header={
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {resolvedName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {resolvedEmail}
                      </p>
                    </div>
                  }
                  items={
                    profileDropdownItems ?? [
                      {
                        id: "profile",
                        label: "Profile",
                        icon: <User className="h-4 w-4" />,
                        onClick: () => onProfileClick?.(),
                      },
                      ...(onLogoutClick
                        ? [
                            {
                              id: "logout",
                              label: "Logout",
                              icon: <LogOut className="h-4 w-4" />,
                              variant: "danger" as const,
                              divider: true,
                              onClick: () => onLogoutClick(),
                            },
                          ]
                        : []),
                    ]
                  }
                  trigger={
                    <div className="flex items-center space-x-3">
                      <div className="hidden sm:block text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {resolvedName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resolvedEmail}
                        </p>
                      </div>
                      <Avatar size="sm">
                        <AvatarImage src={resolvedAvatarUrl} />
                        <AvatarFallback>{resolvedAvatarFallback}</AvatarFallback>
                      </Avatar>
                    </div>
                  }
                  {...profileDropdownProps}
                />
              ) : (
                <div
                  className={cn(
                    "flex items-center space-x-3 px-2 py-1 rounded-lg",
                    onProfileClick
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      : ""
                  )}
                  onClick={onProfileClick}
                  tabIndex={onProfileClick ? 0 : undefined}
                  role={onProfileClick ? "button" : undefined}
                  onKeyDown={
                    onProfileClick
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onProfileClick();
                          }
                        }
                      : undefined
                  }
                  aria-label={onProfileClick ? "Profile section" : undefined}
                >
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {resolvedName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {resolvedEmail}
                    </p>
                  </div>
                  <Avatar size="sm">
                    <AvatarImage src={resolvedAvatarUrl} />
                    <AvatarFallback>{resolvedAvatarFallback}</AvatarFallback>
                  </Avatar>
                  {showProfileDropdownArrow && <DropdownArrow size="md" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
);

DashboardHeader.displayName = "DashboardHeader";

export {
  DashboardHeader,
  type BreadcrumbItem,
  type DashboardHeaderProps,
  type ResponsiveShow,
};