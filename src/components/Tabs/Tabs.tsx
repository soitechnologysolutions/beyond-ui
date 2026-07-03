import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 p-1 text-gray-500 dark:text-gray-400",
  {
    variants: {
      variant: {
        default: "bg-gray-100 dark:bg-gray-800",
        pills: "bg-transparent gap-2",
        underline:
          "bg-transparent border-b border-gray-200 dark:border-gray-800", // Default for horizontal
      },
      orientation: {
        horizontal:
          "inline-flex h-10 items-center justify-start p-1 w-full gap-2",
        vertical:
          "flex flex-col h-auto items-start justify-start p-0 w-full gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-950 dark:data-[state=active]:text-white data-[state=active]:shadow-sm",
        pills:
          "data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-900/30 data-[state=active]:text-primary-700 dark:data-[state=active]:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800",
        underline:
          "data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-none border-b-2 border-transparent", // Default for horizontal
      },
      orientation: {
        horizontal: "rounded-sm px-3 py-1.5 text-xs md:text-sm",
        vertical: "rounded-md px-4 py-2 text-sm", // Adjust padding for vertical items
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant?: VariantProps<typeof tabsListVariants>["variant"];
  orientation?: "horizontal" | "vertical"; // Add orientation to context
  responsive?: boolean;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

interface TabsProps extends VariantProps<typeof tabsListVariants> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical"; // Add orientation to TabsProps
  responsive?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  variant,
  orientation = "horizontal",
  responsive = false,
  children,
  className,
}) => {
  return (
    <TabsContext.Provider
      value={{ value, onValueChange, variant, orientation, responsive }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsList must be used within Tabs");

  const internalRef = React.useRef<HTMLDivElement>(null);
  const combinedRef = (ref as React.RefCallback<HTMLDivElement>) || internalRef;

  // Handle inner auto-scrolling when responsive is active
  React.useEffect(() => {
    if (context.responsive) {
      const targetRef = (
        ref && "current" in ref ? ref : internalRef
      ) as React.RefObject<HTMLDivElement>;
      if (targetRef.current) {
        const activeTabElement = targetRef.current.querySelector(
          '[data-state="active"]',
        );
        if (activeTabElement) {
          activeTabElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }
  }, [context.value, context.responsive, ref]);

  return (
    <div
      className={cn(
        "w-full",
        context.responsive &&
          "relative before:absolute before:right-0 before:top-0 before:bottom-0 before:w-12 before:bg-gradient-to-l before:from-white dark:before:from-gray-950 before:to-transparent before:pointer-events-none before:z-10",
        context.responsive &&
          context.orientation === "vertical" &&
          "lg:before:hidden",
      )}
    >
      <div
        ref={ref || internalRef}
        className={cn(
          tabsListVariants({
            variant: context.variant,
            orientation: context.orientation,
          }),
          context.responsive &&
            "flex flex-row overflow-x-auto justify-start items-center w-full gap-4 pb-px border-b border-gray-200 dark:border-gray-800 bg-transparent scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          context.responsive &&
            context.orientation === "vertical" &&
            "lg:border-b-0 lg:flex-col lg:items-start lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[calc(100vh-180px)] lg:pr-2",
          className,
        )}
        style={
          context.responsive
            ? { WebkitOverflowScrolling: "touch", ...props.style }
            : props.style
        }
        {...props}
      />
    </div>
  );
});
TabsList.displayName = "TabsList";

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.value === value;

    return (
      <button
        ref={ref}
        className={cn(
          tabsTriggerVariants({
            variant: context.variant,
            orientation: context.orientation,
          }),
          context.responsive && "flex-shrink-0 justify-start gap-2",
          context.responsive &&
            context.orientation === "vertical" &&
            "lg:self-start",
          className,
        )}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => context.onValueChange(value)}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.value !== value) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
