import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-600 dark:data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white dark:bg-gray-100 shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, checked = false, onCheckedChange, ...props }, ref) => {
    const handleClick = () => {
      onCheckedChange?.(!checked);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(switchVariants({ size }), className)}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={cn(switchThumbVariants({ size }))}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch, switchVariants };