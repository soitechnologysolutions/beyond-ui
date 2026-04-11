import * as React from "react";
import { Card } from "../Card";
import { cn } from "../../utils/cn";

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional section title/header */
  header?: React.ReactNode;
  /** Main content of the card (fields, avatar, actions, etc.) */
  children: React.ReactNode;
  /** Optional footer (actions, buttons, etc.) */
  footer?: React.ReactNode;
  /** Card className override */
  className?: string;
  /** Card style override */
  style?: React.CSSProperties;
}

/**
 * ProfileCard
 * - Fully reusable, dynamic card for profile management UIs.
 * - Consumer controls all content via children/render prop.
 * - Can be used for any section (profile, info, address, custom).
 * - Theme-agnostic, accessible, and fully typed.
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({
  header,
  children,
  footer,
  className,
  style,
  ...rest
}) => (
  <Card
    className={cn(
      "flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 mb-6",
      className
    )}
    style={style}
    {...rest}
  >
    {header && (
      <div className="flex items-center justify-between mb-2">
        {header}
      </div>
    )}
    <div className="flex-1">{children}</div>
    {footer && (
      <div className="mt-4">{footer}</div>
    )}
  </Card>
);

ProfileCard.displayName = "ProfileCard";