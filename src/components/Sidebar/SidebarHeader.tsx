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
  /** Main title text or node (default: "Beyond") */
  title?: React.ReactNode;
  /** Letter/initial in colored box (default: "B") */
  letter?: React.ReactNode;
  /** Custom logo or icon element */
  logo?: React.ReactNode;
  /** Optional className for root element */
  className?: string;
  /** Optional children for custom content */
  children?: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title = "Beyond",
  letter,
  logo,
  className,
  children,
}) => {
  const showLetterBox = !logo && (letter !== undefined ? Boolean(letter) : true);
  const letterContent = letter ?? "B";

  return (
    <div className={cn("flex items-center space-x-2.5 min-w-0", className)}>
      {logo ? (
        <div className="flex items-center justify-center shrink-0">
          {logo}
        </div>
      ) : showLetterBox ? (
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
          {typeof letterContent === "string" ? (
            <span className="text-white font-bold text-sm">{letterContent}</span>
          ) : (
            letterContent
          )}
        </div>
      ) : null}
      {children ? (
        children
      ) : typeof title === "string" ? (
        <span className="font-bold text-xl text-gray-900 dark:text-white truncate">{title}</span>
      ) : (
        title
      )}
    </div>
  );
};

SidebarHeader.displayName = "SidebarHeader";