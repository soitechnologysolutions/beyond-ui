import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

const switchVariants = cva(
  "inline-flex items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-400 dark:text-gray-900 dark:hover:bg-primary-500",
        secondary: "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-400 dark:text-gray-900 dark:hover:bg-secondary-500",
        ghost: "bg-transparent hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-300",
      },
      size: {
        sm: "w-8 h-8 text-base",
        md: "w-10 h-10 text-lg",
        lg: "w-12 h-12 text-xl",
      },
      iconStyle: {
        filled: "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      iconStyle: "filled",
    },
  }
);

export interface NightModeSwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof switchVariants> {
  ariaLabel?: string;
}

export const NightModeSwitch = React.forwardRef<HTMLButtonElement, NightModeSwitchProps>(
  (
    {
      className,
      variant,
      size,
      iconStyle,
      ariaLabel = "Toggle dark mode",
      onClick,
      ...props
    },
    ref
  ) => {
    const { isDarkMode, toggle } = useDarkMode();

    return (
      <button
        type="button"
        ref={ref}
        aria-label={ariaLabel}
        aria-pressed={isDarkMode}
        className={cn(switchVariants({ variant, size, iconStyle, className }))}
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
        {...props}
      >
        <span className="sr-only">{ariaLabel}</span>
        {isDarkMode ? (
          <Moon
            className="w-5 h-5"
            strokeWidth={iconStyle === "outline" ? 2 : 1.5}
            fill={iconStyle === "filled" ? "currentColor" : "none"}
            aria-hidden="true"
          />
        ) : (
          <Sun
            className="w-5 h-5"
            strokeWidth={iconStyle === "outline" ? 2 : 1.5}
            fill={iconStyle === "filled" ? "currentColor" : "none"}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

NightModeSwitch.displayName = "NightModeSwitch";