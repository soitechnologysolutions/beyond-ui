import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const radioVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-full border border-gray-300 dark:border-gray-700 ring-offset-white dark:ring-offset-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-600 dark:data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-600 dark:data-[state=checked]:border-primary-500",
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

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value?: string;
  options: RadioOption[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  options,
  onChange,
  size = "md",
  disabled,
  className,
  ...props
}) => (
  <div className={cn("flex flex-col gap-2", className)} {...props}>
    {options.map(opt => (
      <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
          disabled={disabled}
          className={cn(radioVariants({ size }), "appearance-none")}
          data-state={value === opt.value ? "checked" : "unchecked"}
        />
      <span className="text-sm dark:text-gray-300">{opt.label}</span>
      </label>
    ))}
  </div>
);

RadioGroup.displayName = "RadioGroup";