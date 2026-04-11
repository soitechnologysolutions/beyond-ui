import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const pageLayoutVariants = cva(
  "min-h-screen flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-950",
        centered: "bg-white dark:bg-gray-950",
        sidebar: "bg-gray-50 dark:bg-gray-900",
        landing: "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950",
        product: "bg-white dark:bg-gray-950",
        blog: "bg-gray-50 dark:bg-gray-900",
      },
      maxWidth: {
        none: "",
        sm: "max-w-screen-sm mx-auto",
        md: "max-w-screen-md mx-auto",
        lg: "max-w-screen-lg mx-auto",
        xl: "max-w-screen-xl mx-auto",
        "2xl": "max-w-screen-2xl mx-auto",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      maxWidth: "xl",
    },
  }
);

const contentVariants = cva(
  "flex-1",
  {
    variants: {
      layout: {
        default: "w-full",
        centered: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
        sidebar: "flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8",
        fullWidth: "w-full",
      },
      spacing: {
        none: "py-0",
        sm: "py-4",
        md: "py-8",
        lg: "py-12",
        xl: "py-16",
      },
    },
    defaultVariants: {
      layout: "default",
      spacing: "md",
    },
  }
);

// Layout section interfaces
interface PageSection {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

interface HeaderProps extends PageSection {
  sticky?: boolean;
  transparent?: boolean;
}

interface HeroProps extends PageSection {
  fullHeight?: boolean;
  backgroundImage?: string;
  overlay?: boolean;
}

interface ContentProps extends PageSection {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

interface SidebarProps extends PageSection {
  position?: "left" | "right";
  width?: "sm" | "md" | "lg";
}

interface FooterProps extends PageSection {
  variant?: "simple" | "detailed" | "minimal";
}

// Individual section components
const PageHeader: React.FC<HeaderProps> = ({ 
  children, 
  className, 
  sticky = false, 
  transparent = false,
  id,
  ...props 
}) => (
  <header
    id={id}
    className={cn(
      "w-full z-50 transition-all duration-300",
      sticky && "sticky top-0",
      transparent ? "bg-transparent" : "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800",
      className
    )}
    role="banner"
    {...props}
  >
    {children}
  </header>
);

const PageHero: React.FC<HeroProps> = ({ 
  children, 
  className, 
  fullHeight = false,
  backgroundImage,
  overlay = false,
  id,
  ...props 
}) => (
  <section
    id={id}
    className={cn(
      "relative w-full flex items-center justify-center",
      fullHeight ? "min-h-screen" : "min-h-[60vh]",
      backgroundImage && "bg-cover bg-center bg-no-repeat",
      className
    )}
    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    role="banner"
    {...props}
  >
    {overlay && backgroundImage && (
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    )}
    <div className="relative z-10 w-full">
      {children}
    </div>
  </section>
);

const PageContent: React.FC<ContentProps> = ({ 
  children, 
  className, 
  maxWidth = "xl",
  id,
  ...props 
}) => (
  <main
    id={id}
    className={cn(
      "flex-1 w-full",
      maxWidth === "sm" && "max-w-2xl mx-auto px-4",
      maxWidth === "md" && "max-w-4xl mx-auto px-4",
      maxWidth === "lg" && "max-w-6xl mx-auto px-4",
      maxWidth === "xl" && "max-w-7xl mx-auto px-4",
      maxWidth === "2xl" && "max-w-screen-2xl mx-auto px-4",
      maxWidth === "full" && "max-w-full px-4",
      className
    )}
    role="main"
    {...props}
  >
    {children}
  </main>
);

const PageSidebar: React.FC<SidebarProps> = ({ 
  children, 
  className, 
  position = "right",
  width = "md",
  id,
  ...props 
}) => (
  <aside
    id={id}
    className={cn(
      "flex-shrink-0",
      width === "sm" && "w-full lg:w-64",
      width === "md" && "w-full lg:w-80",
      width === "lg" && "w-full lg:w-96",
      position === "left" && "lg:order-first",
      className
    )}
    role="complementary"
    {...props}
  >
    {children}
  </aside>
);

const PageFooter: React.FC<FooterProps> = ({ 
  children, 
  className, 
  variant = "simple",
  id,
  ...props 
}) => (
  <footer
    id={id}
    className={cn(
      "w-full mt-auto",
      variant === "simple" && "bg-gray-50 border-t border-gray-200 py-8",
      variant === "simple" && "bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8",
      variant === "detailed" && "bg-gray-900 dark:bg-gray-950 text-white py-12",
      variant === "minimal" && "bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-6",
      className
    )}
    role="contentinfo"
    {...props}
  >
    {children}
  </footer>
);

// Main PageLayout component
export interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {
  children: React.ReactNode;
  contentLayout?: VariantProps<typeof contentVariants>["layout"];
  contentSpacing?: VariantProps<typeof contentVariants>["spacing"];
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ 
    className, 
    variant, 
    maxWidth, 
    contentLayout = "default",
    contentSpacing = "md",
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageLayoutVariants({ variant, maxWidth }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageLayout.displayName = "PageLayout";

// Layout wrapper for content sections
const PageLayoutContent: React.FC<{
  children: React.ReactNode;
  layout?: VariantProps<typeof contentVariants>["layout"];
  spacing?: VariantProps<typeof contentVariants>["spacing"];
  className?: string;
}> = ({ children, layout = "default", spacing = "md", className }) => (
  <div className={cn(contentVariants({ layout, spacing }), className)}>
    {children}
  </div>
);

// Export all components
export {
  PageLayout,
  PageLayoutContent,
  PageHeader,
  PageHero,
  PageContent,
  PageSidebar,
  PageFooter,
  pageLayoutVariants,
  contentVariants,
  type HeaderProps,
  type HeroProps,
  type ContentProps,
  type SidebarProps,
  type FooterProps,
};
