import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Card, CardContent } from "../Card";

const statsCardVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        gradient: "bg-gradient-to-br",
      },
      color: {
        primary: "from-primary-500 to-primary-600 text-white",
        secondary: "from-secondary-500 to-secondary-600 text-white",
        success: "from-success-500 to-success-600 text-white",
        warning: "from-warning-500 to-warning-600 text-white",
        danger: "from-danger-500 to-danger-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type TrendDirection = "up" | "down" | "neutral";

export interface StatsCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof statsCardVariants> {
  title: string;
  value: string | number;
  trend?: {
    direction: TrendDirection;
    value: string | number;
    label?: string;
  };
  icon?: React.ReactNode;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, variant, color, title, value, trend, icon, ...props }, ref) => {
    const getTrendIcon = (direction: TrendDirection) => {
      switch (direction) {
        case "up":
          return <TrendingUp className="h-4 w-4" />;
        case "down":
          return <TrendingDown className="h-4 w-4" />;
        default:
          return <Minus className="h-4 w-4" />;
      }
    };

    const getTrendColor = (direction: TrendDirection) => {
      if (variant === "gradient") return "text-white/80";
      
      switch (direction) {
        case "up":
          return "text-success-600 dark:text-success-400";
        case "down":
          return "text-danger-600 dark:text-danger-400";
        default:
          return "text-gray-600 dark:text-gray-400";
      }
    };

    return (
      <Card
        ref={ref}
        className={cn(statsCardVariants({ variant, color }), className)}
        padding="none"
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={cn(
                "text-sm font-medium",
                variant === "gradient" ? "text-white/80" : "text-gray-600 dark:text-gray-400"
              )}>
                {title}
              </p>
              <div className="mt-2">
                <p className={cn(
                  "text-3xl font-bold",
                  variant === "gradient" ? "text-white" : "text-gray-900 dark:text-white"
                )}>
                  {value}
                </p>
                {trend && (
                  <div className={cn(
                    "flex items-center gap-1 mt-1 text-sm",
                    getTrendColor(trend.direction)
                  )}>
                    {getTrendIcon(trend.direction)}
                    <span>{trend.value}</span>
                    {trend.label && (
                      <span className={cn(
                        variant === "gradient" ? "text-white/60" : "text-gray-500 dark:text-gray-400"
                      )}>
                        {trend.label}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {icon && (
              <div className={cn(
                "p-3 rounded-full",
                variant === "gradient" ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
              )}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
StatsCard.displayName = "StatsCard";

export { StatsCard, statsCardVariants };