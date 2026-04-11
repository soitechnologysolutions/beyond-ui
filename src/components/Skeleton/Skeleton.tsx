import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
  {
    variants: {
      variant: {
        default: "bg-gray-200 dark:bg-gray-800",
        darker: "bg-gray-300 dark:bg-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };