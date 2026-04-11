import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        primary: "text-primary-600 dark:text-primary-400",
        secondary: "text-secondary-600 dark:text-secondary-400",
        white: "text-white",
        current: "text-current",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };