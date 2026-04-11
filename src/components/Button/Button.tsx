import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600",
        secondary: "bg-secondary-600 dark:bg-secondary-500 text-white hover:bg-secondary-700 dark:hover:bg-secondary-600",
        danger: "bg-danger-600 dark:bg-danger-500 text-white hover:bg-danger-700 dark:hover:bg-danger-600",
        success: "bg-success-600 dark:bg-success-500 text-white hover:bg-success-700 dark:hover:bg-success-600",
        warning: "bg-warning-600 dark:bg-warning-500 text-white hover:bg-warning-700 dark:hover:bg-warning-600",
        outline: "border border-primary-300 dark:border-primary-700 bg-white dark:bg-transparent dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30",
        ghost: "bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/30 dark:text-gray-300 dark:hover:text-primary-400",
        link: "text-primary-600 dark:text-primary-400 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        xl: "h-12 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };