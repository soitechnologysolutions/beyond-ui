import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Calendar,
  Mail,
  Bell,
  LogOut,
  User,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Avatar, AvatarImage, AvatarFallback } from "../Avatar";
import { Badge } from "../Badge";
import { ProfileButton } from "./ProfileButton";
import { LogoutButton } from "./LogoutButton";
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
import {
  getVisibilityClasses,
  type ResponsiveShow,
} from "../DashboardHeader";

const sidebarVariants = cva(
  "fixed left-0 top-0 z-40 max-lg:z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
  {
    variants: {
      collapsed: {
        false: "w-72 max-lg:translate-x-0",
        true: "lg:w-16 max-lg:w-72 max-lg:-translate-x-full",
      },
      mobileIconMode: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        collapsed: true,
        mobileIconMode: true,
        className: "w-16 max-lg:w-16 max-lg:translate-x-0",
      },
      {
        collapsed: false,
        mobileIconMode: true,
        className: "w-72 max-lg:translate-x-0",
      },
    ],
    defaultVariants: {
      collapsed: false,
      mobileIconMode: false,
    },
  },
);

const menuItemVariants = cva(
  "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
  {
    variants: {
      active: {
        true: "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-600",
        false:
          "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white",
      },
      collapsed: {
        true: "lg:justify-center lg:px-2 max-lg:justify-start",
        false: "justify-start",
      },
    },
    defaultVariants: {
      active: false,
      collapsed: false,
    },
  },
);

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string;
  children?: MenuItem[];
}

import { SidebarHeader } from "./SidebarHeader";

export interface SidebarProfileSectionProps {
  avatarUrl?: string;
  avatar?: string;
  name?: string;
  email?: string;
  avatarFallback?: string;
  collapsedAvatarSize?: "sm" | "md" | "lg";
  expandedAvatarSize?: "sm" | "md" | "lg";
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Custom dropdown items for sidebar profile dropdown */
  profileDropdownItems?: DropdownItem[];
  /** Additional props for sidebar profile Dropdown */
  profileDropdownProps?: Partial<DropdownProps>;
  /** Whether clicking profile in sidebar opens a dropdown (default: false when Profile/Logout buttons exist) */
  showProfileDropdown?: boolean;
  /** Whether to show a dropdown arrow beside profile (default: true) */
  showProfileDropdownArrow?: boolean;
  /** Whether to reverse the dropdown arrow in sidebar profile (default: true, pointing up) */
  profileDropdownArrowReverse?: boolean;
  /** Explicit direction for the dropdown arrow ("down" | "up") */
  profileDropdownArrowDirection?: "down" | "up";
  /** Whether to show dark mode switch in sidebar profile section */
  showDarkMode?: ResponsiveShow;
  /** Whether to show notifications icon in sidebar */
  showNotifications?: ResponsiveShow;
  /** Unread notification badge count (default: 3) */
  notificationCount?: number;
  /** Callback when notification icon is clicked */
  onNotificationClick?: () => void;
  /** Whether to show settings icon in sidebar */
  showSettings?: ResponsiveShow;
  /** Callback when settings icon is clicked */
  onSettingsClick?: () => void;
  /** Placement of quick action icons in sidebar ("above-profile" | "in-profile", default: "in-profile") */
  sidebarIconsPlacement?: "above-profile" | "in-profile";
  /** Custom action icons or buttons to display alongside notifications/settings */
  sidebarActions?: React.ReactNode;
  /** Whether to show the quick action / theme icons bar panel in sidebar (supports boolean or { mobile, desktop }) */
  showSidebarIcons?: ResponsiveShow;
  /** Alias for showSidebarIcons */
  showSidebarIconPanel?: ResponsiveShow;
  /** Extra content to render in sidebar profile section */
  extraContent?: React.ReactNode;
}

interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  className?: string;
  onToggle?: () => void;
  menuItems?: MenuItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  /** Sidebar header title (default: "Beyond") */
  title?: React.ReactNode;
  /** Sidebar header letter (default: "B") */
  titleLetter?: React.ReactNode;
  /** Custom logo or icon element for sidebar header */
  logo?: React.ReactNode;
  /** Optional className for SidebarHeader */
  headerClassName?: string;
  style?: React.CSSProperties;
  /** Props for ProfileButton (stateless usage) */
  profileButtonProps?: import("./ProfileButton").ProfileButtonProps;
  /** Props for LogoutButton (stateless usage) */
  logoutButtonProps?: import("./LogoutButton").LogoutButtonProps;
  /** Dynamic profile section props */
  profileSectionProps?: SidebarProfileSectionProps;
  /** Whether to display the sidebar profile section (supports boolean or { mobile, desktop }, default: true) */
  showProfileSection?: ResponsiveShow;
  /** Custom dropdown items for sidebar profile dropdown */
  profileDropdownItems?: DropdownItem[];
  /** Additional props for sidebar profile Dropdown */
  profileDropdownProps?: Partial<DropdownProps>;
  /** Whether clicking profile in sidebar opens a dropdown */
  showProfileDropdown?: boolean;
  /** Whether to show a dropdown arrow beside profile in sidebar (default: true) */
  showProfileDropdownArrow?: boolean;
  /** Whether to reverse the dropdown arrow in sidebar profile (default: true, pointing up) */
  profileDropdownArrowReverse?: boolean;
  /** Explicit direction for the dropdown arrow in sidebar profile ("down" | "up") */
  profileDropdownArrowDirection?: "down" | "up";
  /** Whether to show dark mode switch in sidebar profile section */
  showDarkMode?: ResponsiveShow;
  /** Whether to show notifications icon in sidebar */
  showNotifications?: ResponsiveShow;
  /** Unread notification badge count (default: 3) */
  notificationCount?: number;
  /** Callback when notification icon is clicked */
  onNotificationClick?: () => void;
  /** Whether to show settings icon in sidebar */
  showSettings?: ResponsiveShow;
  /** Callback when settings icon is clicked */
  onSettingsClick?: () => void;
  /** Placement of quick action icons in sidebar ("above-profile" | "in-profile", default: "in-profile") */
  sidebarIconsPlacement?: "above-profile" | "in-profile";
  /** Custom action icons or buttons to display alongside notifications/settings */
  sidebarActions?: React.ReactNode;
  /** Whether to show the quick action / theme icons bar panel in sidebar (supports boolean or { mobile, desktop }) */
  showSidebarIcons?: ResponsiveShow;
  /** Alias for showSidebarIcons */
  showSidebarIconPanel?: ResponsiveShow;
  /** Whether to show the collapse/expand chevron button in sidebar header (supports boolean or { mobile, desktop }) */
  showCollapseButton?: ResponsiveShow;
  /** Alias for showCollapseButton */
  collapsible?: ResponsiveShow;
  /** Callback when dark mode toggle is clicked */
  onDarkModeToggle?: () => void;
  /** Optional props to pass to NightModeSwitch */
  darkModeSwitchProps?: Partial<NightModeSwitchProps>;
  /** Extra content to render in sidebar profile section */
  profileSectionExtra?: React.ReactNode;
  /** Whether to keep the sidebar in icon mode on mobile instead of sliding off-canvas */
  mobileIconMode?: boolean;
  /** Alias for mobileIconMode */
  enableMobileIconMode?: boolean;
}

const defaultMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/analytics",
    badge: "New",
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="h-5 w-5" />,
    children: [
      {
        id: "all-users",
        label: "All Users",
        icon: <Users className="h-4 w-4" />,
      },
      {
        id: "user-roles",
        label: "User Roles",
        icon: <Settings className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileText className="h-5 w-5" />,
    href: "/reports",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    href: "/calendar",
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail className="h-5 w-5" />,
    href: "/messages",
    badge: "3",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="h-5 w-5" />,
    href: "/notifications",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/settings",
  },
];

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      collapsed = false,
      onToggle,
      menuItems = defaultMenuItems,
      activeItem = "dashboard",
      onItemClick,
      title = "Beyond",
      titleLetter,
      logo,
      headerClassName,
      profileButtonProps,
      logoutButtonProps,
      profileSectionProps,
      showProfileSection = true,
      profileDropdownItems,
      profileDropdownProps,
      showProfileDropdown,
      showProfileDropdownArrow,
      profileDropdownArrowReverse,
      profileDropdownArrowDirection,
      showDarkMode,
      showNotifications,
      notificationCount,
      onNotificationClick,
      showSettings,
      onSettingsClick,
      sidebarIconsPlacement,
      sidebarActions,
      showSidebarIcons,
      showSidebarIconPanel,
      showCollapseButton,
      collapsible,
      onDarkModeToggle,
      darkModeSwitchProps,
      profileSectionExtra,
      mobileIconMode,
      enableMobileIconMode,
      ...props
    },
    ref,
  ) => {
    const isMobileIconMode = Boolean(mobileIconMode || enableMobileIconMode);
    const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

    // Auto-expand parent items when activeItem is a descendant
    React.useEffect(() => {
      if (!activeItem || !menuItems || menuItems.length === 0) return;
      const findAncestors = (items: MenuItem[], targetId: string, parents: string[] = []): string[] => {
        for (const item of items) {
          if (item.id === targetId) return parents;
          if (item.children && item.children.length > 0) {
            const found = findAncestors(item.children, targetId, [...parents, item.id]);
            if (found.length > 0) return found;
          }
        }
        return [];
      };
      const ancestors = findAncestors(menuItems, activeItem);
      if (ancestors.length > 0) {
        setExpandedItems((prev) => Array.from(new Set([...prev, ...ancestors])));
      }
    }, [activeItem, menuItems]);

    const toggleExpanded = (itemId: string) => {
      setExpandedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      );
    };

    const handleItemClick = (item: MenuItem) => {
      if (item.children) {
        toggleExpanded(item.id);
      } else {
        onItemClick?.(item.id);
      }
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
      const isActive = activeItem === item.id;
      const isExpanded = expandedItems.includes(item.id);
      const hasChildren = item.children && item.children.length > 0;

      const Component = item.href && !hasChildren ? "a" : "button";
      const itemProps = item.href && !hasChildren
        ? {
            href: item.href,
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              handleItemClick(item);
            },
          }
        : {
            type: "button" as const,
            onClick: () => handleItemClick(item),
          };

      return (
        <div key={item.id}>
          <Component
            {...itemProps}
            className={cn(
              menuItemVariants({ active: isActive, collapsed }),
              collapsed && isMobileIconMode && "justify-center px-2 max-lg:justify-center max-lg:px-2",
              level > 0 && "ml-4 pl-8",
              "relative",
            )}
          >
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex-shrink-0">{item.icon}</div>
              <div
                className={cn(
                  "flex flex-1 items-center min-w-0",
                  collapsed ? (isMobileIconMode ? "hidden" : "lg:hidden") : "",
                )}
              >
                <span className="ml-3 truncate">{item.label}</span>
                {item.badge && (
                  <Badge variant="danger" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
                {hasChildren && (
                  <ChevronDown
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform duration-200",
                      isExpanded && "rotate-180",
                    )}
                  />
                )}
              </div>
            </div>
          </Component>

          {hasChildren && isExpanded && (
            <div className={cn("mt-1 space-y-1", collapsed ? (isMobileIconMode ? "hidden" : "lg:hidden") : "")}>
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    // Profile section props with fallbacks
    const {
      avatarUrl: rawAvatarUrl,
      avatar: rawAvatar,
      name = "John Doe",
      email = "john@company.com",
      avatarFallback: rawAvatarFallback,
      collapsedAvatarSize = "sm",
      expandedAvatarSize = "sm",
      onClick,
      profileDropdownItems: sectionDropdownItems,
      profileDropdownProps: sectionDropdownProps,
      showProfileDropdown: sectionShowProfileDropdown,
      showProfileDropdownArrow: sectionShowProfileDropdownArrow,
      profileDropdownArrowReverse: sectionProfileDropdownArrowReverse,
      profileDropdownArrowDirection: sectionProfileDropdownArrowDirection,
      showDarkMode: sectionShowDarkMode,
      showNotifications: sectionShowNotifications,
      notificationCount: sectionNotificationCount,
      onNotificationClick: sectionOnNotificationClick,
      showSettings: sectionShowSettings,
      onSettingsClick: sectionOnSettingsClick,
      sidebarIconsPlacement: sectionSidebarIconsPlacement,
      sidebarActions: sectionSidebarActions,
      showSidebarIcons: sectionShowSidebarIcons,
      showSidebarIconPanel: sectionShowSidebarIconPanel,
      extraContent: sectionExtraContent,
    } = profileSectionProps || {};
    const avatarUrl = rawAvatarUrl || rawAvatar || "";
    const avatarFallback =
      rawAvatarFallback ||
      (name
        ? name
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "JD");

    const resolvedShowDarkMode = showDarkMode ?? sectionShowDarkMode;
    const resolvedShowNotifications = showNotifications ?? sectionShowNotifications;
    const resolvedNotificationCount = notificationCount ?? sectionNotificationCount ?? 3;
    const resolvedOnNotificationClick = onNotificationClick ?? sectionOnNotificationClick;
    const resolvedShowSettings = showSettings ?? sectionShowSettings;
    const resolvedOnSettingsClick = onSettingsClick ?? sectionOnSettingsClick;
    const resolvedIconsPlacement =
      sidebarIconsPlacement ?? sectionSidebarIconsPlacement ?? "in-profile";
    const resolvedSidebarActions = sidebarActions ?? sectionSidebarActions;

    const resolvedShowSidebarIcons =
      showSidebarIconPanel ??
      showSidebarIcons ??
      sectionShowSidebarIconPanel ??
      sectionShowSidebarIcons;

    const hasMobileActionIcons = Boolean(
      (resolvedShowNotifications !== false && (typeof resolvedShowNotifications !== "object" || resolvedShowNotifications.mobile !== false)) ||
      (resolvedShowSettings !== false && (typeof resolvedShowSettings !== "object" || resolvedShowSettings.mobile !== false)) ||
      Boolean(resolvedSidebarActions) ||
      (resolvedShowDarkMode !== false && (typeof resolvedShowDarkMode !== "object" || resolvedShowDarkMode.mobile !== false))
    );

    const hasDesktopActionIcons = Boolean(
      (resolvedShowNotifications !== false && (typeof resolvedShowNotifications !== "object" || resolvedShowNotifications.desktop !== false)) ||
      (resolvedShowSettings !== false && (typeof resolvedShowSettings !== "object" || resolvedShowSettings.desktop !== false)) ||
      Boolean(resolvedSidebarActions) ||
      (resolvedShowDarkMode !== false && (typeof resolvedShowDarkMode !== "object" || resolvedShowDarkMode.desktop !== false))
    );

    const autoShowSidebarIcons: ResponsiveShow =
      hasMobileActionIcons && hasDesktopActionIcons
        ? true
        : hasMobileActionIcons && !hasDesktopActionIcons
        ? { mobile: true, desktop: false }
        : !hasMobileActionIcons && hasDesktopActionIcons
        ? { mobile: false, desktop: true }
        : false;

    const finalShowSidebarIcons = resolvedShowSidebarIcons ?? autoShowSidebarIcons;
    const isSidebarIconPanelVisible =
      finalShowSidebarIcons !== false &&
      !(
        typeof finalShowSidebarIcons === "object" &&
        !finalShowSidebarIcons.mobile &&
        !finalShowSidebarIcons.desktop
      );

    const resolvedShowCollapseButton =
      showCollapseButton ??
      collapsible ??
      true;

    const hasOtherIcons = Boolean(
      resolvedShowNotifications ||
      resolvedShowSettings ||
      resolvedSidebarActions
    );

    const hasSidebarIcons = Boolean(
      isSidebarIconPanelVisible &&
      (hasOtherIcons || resolvedShowDarkMode)
    );

    const isProfileSectionVisible =
      showProfileSection !== false &&
      !(
        typeof showProfileSection === "object" &&
        !showProfileSection.mobile &&
        !showProfileSection.desktop
      );

    const resolvedShowDropdown =
      showProfileDropdown ?? sectionShowProfileDropdown ?? true;

    const resolvedShowDropdownArrow =
      showProfileDropdownArrow ??
      sectionShowProfileDropdownArrow ??
      true;

    const resolvedProfileDropdownArrowReverse =
      profileDropdownArrowReverse ??
      sectionProfileDropdownArrowReverse ??
      (profileDropdownArrowDirection === "down" ||
      sectionProfileDropdownArrowDirection === "down"
        ? false
        : true);

    const resolvedDropdownProps = {
      ...sectionDropdownProps,
      ...profileDropdownProps,
    };

    const resolvedProfileDropdownItems: DropdownItem[] =
      profileDropdownItems ??
      sectionDropdownItems ?? [
        {
          id: "profile",
          label: "Profile",
          icon: <User className="h-4 w-4" />,
          onClick: (e: any) => {
            onClick?.(e);
            profileButtonProps?.onClick?.(e);
          },
        },
        ...(logoutButtonProps?.onClick || logoutButtonProps?.onLogout
          ? [
              {
                id: "logout",
                label: "Logout",
                icon: <LogOut className="h-4 w-4" />,
                variant: "danger" as const,
                divider: true,
                onClick: (e: any) => {
                  logoutButtonProps?.onClick?.(e);
                  logoutButtonProps?.onLogout?.();
                },
              },
            ]
          : []),
      ];

    const renderSidebarIconsBar = () => {
      if (!hasSidebarIcons || !isSidebarIconPanelVisible) return null;
      return (
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800",
            collapsed ? (isMobileIconMode ? "hidden" : "lg:hidden") : "",
            getVisibilityClasses(finalShowSidebarIcons, "flex")
          )}
        >
          <div className="flex items-center space-x-1 sm:space-x-2">
            {hasOtherIcons ? (
              <>
                {resolvedShowNotifications && (
                  <button
                    type="button"
                    onClick={resolvedOnNotificationClick}
                    className={cn(
                      "relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      getVisibilityClasses(resolvedShowNotifications, "flex")
                    )}
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                    {resolvedNotificationCount > 0 && (
                      <Badge
                        variant="danger"
                        className="absolute -top-1 -right-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center pointer-events-none"
                      >
                        {resolvedNotificationCount}
                      </Badge>
                    )}
                  </button>
                )}
                {resolvedShowSettings && (
                  <button
                    type="button"
                    onClick={resolvedOnSettingsClick}
                    className={cn(
                      "p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      getVisibilityClasses(resolvedShowSettings, "flex")
                    )}
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                )}
                {resolvedSidebarActions}
              </>
            ) : (
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Theme
              </span>
            )}
          </div>
          {resolvedShowDarkMode && (
            <div className={cn(getVisibilityClasses(resolvedShowDarkMode, "flex"), "items-center")}>
              <NightModeSwitch
                size="sm"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-200/60 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/60"
                onClick={(e) => {
                  onDarkModeToggle?.();
                  darkModeSwitchProps?.onClick?.(e);
                }}
                {...darkModeSwitchProps}
              />
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-screen",
          sidebarVariants({ collapsed, mobileIconMode: isMobileIconMode }),
          className,
        )}
        style={props.style}
        {...props}
      >
        {/* Sidebar Header */}
        <div
          className={cn(
            "flex items-center p-4 border-b border-gray-200 dark:border-gray-800",
            collapsed
              ? isMobileIconMode
                ? "justify-center"
                : "lg:justify-center justify-between"
              : "justify-between"
          )}
        >
          <div className={cn(collapsed ? (isMobileIconMode ? "hidden" : "lg:hidden") : "")}>
            <SidebarHeader
              title={title}
              letter={titleLetter}
              logo={logo}
              className={headerClassName}
            />
          </div>
          <button
            onClick={onToggle}
            className={cn(
              "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              getVisibilityClasses(resolvedShowCollapseButton, "inline-flex")
            )}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-200",
                collapsed
                  ? isMobileIconMode
                    ? "rotate-180"
                    : "lg:rotate-180 max-lg:rotate-0"
                  : "",
              )}
            />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Action icons above profile section */}
        {resolvedIconsPlacement === "above-profile" && hasSidebarIcons && (
          <div className={cn("px-4 pb-2", getVisibilityClasses(showProfileSection, "block"), getVisibilityClasses(finalShowSidebarIcons, "block"))}>
            {renderSidebarIconsBar()}
          </div>
        )}

        {/* User Profile Section */}
        {isProfileSectionVisible && (
          <div
            className={cn(
              "border-t border-gray-200 dark:border-gray-800 p-4",
              getVisibilityClasses(showProfileSection, "block"),
            )}
          >
            <div
              className={cn(
                "flex flex-col items-center justify-center space-y-3",
                collapsed ? (isMobileIconMode ? "flex" : "max-lg:hidden") : "hidden",
              )}
            >
              {resolvedShowNotifications && (
                <button
                  type="button"
                  onClick={resolvedOnNotificationClick}
                  className={cn(
                    "relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    getVisibilityClasses(resolvedShowNotifications, "flex")
                  )}
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {resolvedNotificationCount > 0 && (
                    <Badge
                      variant="danger"
                      className="absolute -top-1 -right-1 h-3.5 w-3.5 text-[9px] p-0 flex items-center justify-center pointer-events-none"
                    >
                      {resolvedNotificationCount}
                    </Badge>
                  )}
                </button>
              )}
              {resolvedShowSettings && (
                <button
                  type="button"
                  onClick={resolvedOnSettingsClick}
                  className={cn(
                    "p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    getVisibilityClasses(resolvedShowSettings, "flex")
                  )}
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
              )}
              {resolvedShowDarkMode && (
                <div
                  className={cn(
                    getVisibilityClasses(resolvedShowDarkMode, "flex"),
                    "items-center justify-center"
                  )}
                >
                  <NightModeSwitch
                    size="sm"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    onClick={(e) => {
                      onDarkModeToggle?.();
                      darkModeSwitchProps?.onClick?.(e);
                    }}
                    {...darkModeSwitchProps}
                  />
                </div>
              )}
              {resolvedShowDropdown ? (
                <Dropdown
                  placement="top"
                  align="left"
                  showArrow={false}
                  items={resolvedProfileDropdownItems}
                  trigger={
                    <div
                      className="cursor-pointer hover:bg-primary-50 dark:hover:bg-gray-800/50 rounded-lg p-1 transition-colors"
                      aria-label="View profile menu"
                    >
                      <Avatar size={collapsedAvatarSize}>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                      </Avatar>
                    </div>
                  }
                  {...resolvedDropdownProps}
                />
              ) : (
                <div
                  className={cn(
                    "rounded-lg transition-colors",
                    (onClick || profileButtonProps?.onClick) &&
                      "cursor-pointer hover:bg-primary-50 dark:hover:bg-gray-800/50 focus:bg-primary-100 dark:focus:bg-gray-800 outline-none ring-2 ring-transparent focus:ring-primary-300",
                  )}
                  tabIndex={(onClick || profileButtonProps?.onClick) ? 0 : undefined}
                  role={(onClick || profileButtonProps?.onClick) ? "button" : undefined}
                  aria-label={(onClick || profileButtonProps?.onClick) ? "View profile" : undefined}
                  onClick={(e) => {
                    onClick?.(e);
                    profileButtonProps?.onClick?.(e as any);
                  }}
                  onKeyDown={
                    (onClick || profileButtonProps?.onClick)
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            onClick?.(e as any);
                            profileButtonProps?.onClick?.(e as any);
                          }
                        }
                      : undefined
                  }
                >
                  <Avatar size={collapsedAvatarSize}>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
            <div className={cn("space-y-3", collapsed ? (isMobileIconMode ? "hidden" : "lg:hidden") : "")}>
              {resolvedIconsPlacement === "in-profile" && hasSidebarIcons && (
                renderSidebarIconsBar()
              )}
              {resolvedShowDropdown ? (
                <Dropdown
                  placement="top"
                  align="left"
                  fullWidth
                  showArrow={resolvedShowDropdownArrow}
                  arrowReverse={resolvedProfileDropdownArrowReverse}
                  arrowDirection={profileDropdownArrowDirection}
                  items={resolvedProfileDropdownItems}
                  menuClassName="w-full"
                  triggerClassName="w-full p-2 hover:bg-primary-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors"
                  trigger={
                    <div
                      className="flex items-center space-x-3 min-w-0 flex-1 text-left"
                      aria-label="User menu"
                    >
                      <Avatar size={expandedAvatarSize}>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {email}
                        </p>
                      </div>
                    </div>
                  }
                  {...resolvedDropdownProps}
                />
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-between w-full rounded-lg transition-colors p-2",
                    (onClick || profileButtonProps?.onClick) &&
                      "cursor-pointer hover:bg-primary-50 dark:hover:bg-gray-800/50 focus:bg-primary-100 dark:focus:bg-gray-800 outline-none ring-2 ring-transparent focus:ring-primary-300",
                  )}
                  tabIndex={(onClick || profileButtonProps?.onClick) ? 0 : undefined}
                  role={(onClick || profileButtonProps?.onClick) ? "button" : undefined}
                  aria-label={(onClick || profileButtonProps?.onClick) ? "View profile" : undefined}
                  onClick={(e) => {
                    onClick?.(e);
                    profileButtonProps?.onClick?.(e as any);
                  }}
                  onKeyDown={
                    (onClick || profileButtonProps?.onClick)
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            onClick?.(e as any);
                            profileButtonProps?.onClick?.(e as any);
                          }
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <Avatar size={expandedAvatarSize}>
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {email}
                      </p>
                    </div>
                  </div>
                  {resolvedShowDropdownArrow && (
                    <DropdownArrow
                      size="sm"
                      reverse={resolvedProfileDropdownArrowReverse}
                      direction={profileDropdownArrowDirection}
                    />
                  )}
                </div>
              )}
              {resolvedShowDarkMode && !hasSidebarIcons && isSidebarIconPanelVisible && (
                <div
                  className={cn(
                    "flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800",
                    getVisibilityClasses(finalShowSidebarIcons ?? resolvedShowDarkMode, "flex"),
                  )}
                >
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Theme
                  </span>
                  <NightModeSwitch
                    size="sm"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    onClick={(e) => {
                      onDarkModeToggle?.();
                      darkModeSwitchProps?.onClick?.(e);
                    }}
                    {...darkModeSwitchProps}
                  />
                </div>
              )}
              {(!resolvedShowDropdown || (profileButtonProps || logoutButtonProps)) && (
                <div className="flex space-x-2">
                  {/* Reusable, theme-agnostic profile/logout buttons */}
                  <ProfileButton className="flex-1" {...profileButtonProps} />
                  <LogoutButton className="flex-1" {...logoutButtonProps} />
                </div>
              )}
              {(profileSectionExtra || sectionExtraContent) && (
                <div>
                  {profileSectionExtra}
                  {sectionExtraContent}
                </div>
              )}
            </div>
          </div>
        )}

        {!isProfileSectionVisible && resolvedShowDarkMode && (
          <div
            className={cn(
              "border-t border-gray-200 dark:border-gray-800 p-3 flex justify-center items-center",
              getVisibilityClasses(resolvedShowDarkMode, "flex")
            )}
          >
            <NightModeSwitch
              size="sm"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              onClick={(e) => {
                onDarkModeToggle?.();
                darkModeSwitchProps?.onClick?.(e);
              }}
              {...darkModeSwitchProps}
            />
          </div>
        )}
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";

export { Sidebar, sidebarVariants, type MenuItem };
