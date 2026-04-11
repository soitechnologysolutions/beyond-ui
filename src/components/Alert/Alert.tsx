import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-900 text-gray-950 dark:text-gray-50 border-gray-200 dark:border-gray-800",
        success: "bg-success-50 dark:bg-success-900/30 text-success-800 dark:text-success-400 border-success-200 dark:border-success-800",
        warning: "bg-warning-50 dark:bg-warning-900/30 text-warning-800 dark:text-warning-400 border-warning-200 dark:border-warning-800",
        danger: "bg-danger-50 dark:bg-danger-900/30 text-danger-800 dark:text-danger-400 border-danger-200 dark:border-danger-800",
        info: "bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400 border-primary-200 dark:border-primary-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };