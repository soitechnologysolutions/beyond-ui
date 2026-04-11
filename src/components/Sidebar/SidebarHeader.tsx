import * as React from "react";
import { cn } from "../../utils/cn";

/**
 * SidebarHeader
 * - Reusable header for Sidebar and other layouts.
 * - Accepts dynamic title and letter for branding.
 * - Uses theme tokens (bg-primary-600, text-white, etc.) for theme-agnostic design.
 * - Allows className override for further customization.
 *
 * @example
 * <SidebarHeader title="Admin Panel" letter="A" />
 */
export interface SidebarHeaderProps {
  /** Main title text (default: "Beyond") */
  title?: string;
  /** Letter/initial in colored box (default: "B") */
  letter?: string;
  /** Optional className for root element */
  className?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title = "Beyond",
  letter = "B",
  className,
}) => (
  <div className={cn("flex items-center space-x-2", className)}>
    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">{letter}</span>
    </div>
    <span className="font-bold text-xl text-gray-900 dark:text-white">{title}</span>
  </div>
);

SidebarHeader.displayName = "SidebarHeader";