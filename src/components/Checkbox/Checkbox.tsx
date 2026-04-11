import * as React from "react";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 dark:border-gray-700 ring-offset-white dark:ring-offset-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-600 dark:data-[state=checked]:bg-primary-500 data-[state=checked]:text-white data-[state=checked]:border-primary-600 dark:data-[state=checked]:border-primary-500",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className={cn(checkboxVariants({ size }), "appearance-none", className)}
          ref={ref}
          data-state={props.checked ? "checked" : "unchecked"}
          {...props}
        />
        {props.checked && (
          <Check
            className={cn(
              "absolute pointer-events-none text-current",
              size === "sm" && "h-2 w-2",
              size === "md" && "h-3 w-3",
              size === "lg" && "h-4 w-4"
            )}
          />
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };