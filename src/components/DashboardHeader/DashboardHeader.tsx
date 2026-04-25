import * as React from "react";
import { Search, Bell, Settings, Menu } from "lucide-react";
import { cn } from "../../utils/cn";
import { Input } from "../Input";
import { Button } from "../Button";
import { Avatar, AvatarImage, AvatarFallback } from "../Avatar";
import { Badge } from "../Badge";

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

  // OnClick handlers for standard components
  onMenuButtonClick?: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;

  // Custom slots
  leftSlot?: DashboardHeaderSlot;
  centerSlot?: DashboardHeaderSlot;
  rightSlot?: DashboardHeaderSlot;
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
    leftSlot,
    centerSlot,
    rightSlot,
    onMenuButtonClick,
    onNotificationClick,
    onSettingsClick,
    onProfileClick,
    onBreadcrumbClick,
    ...props
  }, ref) => {
    const [searchValue, setSearchValue] = React.useState("");

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
            <div className={getVisibilityClasses(showMenuButton, "flex lg:hidden")}>
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={e => {
                   onMenuButtonClick?.();
                   onMenuToggle?.();
                 }}
               >
                 <Menu className="h-5 w-5" />
               </Button>
            </div>

            {/* Breadcrumbs */}
              <nav
                className={cn(
                  getVisibilityClasses(showBreadcrumbs, "flex"),
                  "items-center space-x-2 text-sm",
                  "w-full overflow-x-auto whitespace-nowrap py-1 lg:w-auto lg:overflow-visible lg:whitespace-normal lg:py-0"
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
                  "items-center space-x-3 pl-3 border-l border-gray-200",
                  onProfileClick ? "cursor-pointer hover:bg-gray-100 transition" : ""
                )}
                onClick={onProfileClick}
                tabIndex={onProfileClick ? 0 : undefined}
                role={onProfileClick ? "button" : undefined}
                onKeyDown={onProfileClick ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onProfileClick();
                  }
                } : undefined}
                aria-label={onProfileClick ? "Profile section" : undefined}
              >
                <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <Avatar size="sm">
                  <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
          </div>
        </div>
      </header>
    );
  }
);

DashboardHeader.displayName = "DashboardHeader";

export { DashboardHeader, type BreadcrumbItem, type DashboardHeaderProps };