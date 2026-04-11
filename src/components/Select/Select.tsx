import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const selectVariants = cva(
  "block w-full rounded-md border bg-white dark:bg-gray-900 dark:text-white px-3 py-2 text-sm ring-offset-white dark:ring-offset-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-300 dark:border-gray-700",
        error: "border-danger-500 dark:border-danger-500 focus-visible:ring-danger-500",
        success: "border-success-500 dark:border-success-500 focus-visible:ring-success-500",
      },
      selectSize: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "md",
    },
  }
);

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, selectSize, options, placeholder, ...props }, ref) => (
    <select
      className={cn(selectVariants({ variant, selectSize, className }))}
      ref={ref}
      {...props}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
);

Select.displayName = "Select";