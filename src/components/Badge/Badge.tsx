import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600",
        secondary: "border-transparent bg-secondary-600 dark:bg-secondary-500 text-white hover:bg-secondary-700 dark:hover:bg-secondary-600",
        success: "border-transparent bg-success-600 dark:bg-success-500 text-white hover:bg-success-700 dark:hover:bg-success-600",
        danger: "border-transparent bg-danger-600 dark:bg-danger-500 text-white hover:bg-danger-700 dark:hover:bg-danger-600",
        warning: "border-transparent bg-warning-600 dark:bg-warning-500 text-white hover:bg-warning-700 dark:hover:bg-warning-600",
        outline: "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };