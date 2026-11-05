import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const pageLayoutVariants = cva(
  "min-h-screen flex flex-col text-gray-900 dark:text-gray-100 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-950",
        centered: "bg-white dark:bg-gray-950",
        sidebar: "bg-gray-50 dark:bg-gray-900",
        landing: "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950",
        product: "bg-white dark:bg-gray-950",
        blog: "bg-gray-50 dark:bg-gray-950",
        sanctuary: "bg-gray-50/60 dark:bg-gray-950",
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
      maxWidth: "full",
    },
  }
);

const contentVariants = cva(
  "flex-1",
  {
    variants: {
      layout: {
        default: "w-full",
        centered: "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8",
        sidebar: "max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8",
        fullWidth: "w-full",
      },
      spacing: {
        none: "py-0",
        sm: "py-4",
        md: "py-8",
        lg: "py-10",
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
export interface PageSection extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface HeaderProps extends PageSection {
  sticky?: boolean;
  transparent?: boolean;
  glass?: boolean;
}

export interface HeroProps extends PageSection {
  fullHeight?: boolean;
  size?: "auto" | "sm" | "md" | "lg" | "full";
  backgroundImage?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

export interface ContentProps extends PageSection {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export interface SidebarProps extends PageSection {
  position?: "left" | "right";
  width?: "sm" | "md" | "lg";
}

export interface FooterProps extends PageSection {
  variant?: "simple" | "detailed" | "minimal";
}

// Individual section components
const PageHeader: React.FC<HeaderProps> = ({ 
  children, 
  className, 
  sticky = false, 
  transparent = false,
  glass = false,
  id,
  ...props 
}) => (
  <header
    id={id}
    className={cn(
      "w-full z-40 transition-all duration-300",
      sticky && "sticky top-0",
      transparent
        ? "bg-transparent"
        : glass
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800"
        : "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800",
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
  size = "auto",
  backgroundImage,
  overlay = false,
  overlayClassName,
  id,
  style,
  ...props 
}) => (
  <section
    id={id}
    className={cn(
      "relative w-full overflow-hidden flex items-center justify-center",
      fullHeight
        ? "min-h-screen"
        : size === "full"
        ? "min-h-screen"
        : size === "lg"
        ? "min-h-[70vh]"
        : size === "md"
        ? "min-h-[55vh]"
        : size === "sm"
        ? "min-h-[36vh]"
        : "",
      backgroundImage && "bg-cover bg-center bg-no-repeat",
      className
    )}
    style={
      backgroundImage
        ? { backgroundImage: `url(${backgroundImage})`, ...style }
        : style
    }
    role="region"
    aria-label="Hero banner"
    {...props}
  >
    {overlay && (
      <div
        className={cn(
          "absolute inset-0 bg-gray-950/50 pointer-events-none",
          overlayClassName
        )}
      />
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
      maxWidth === "sm" && "max-w-2xl mx-auto px-4 sm:px-6",
      maxWidth === "md" && "max-w-4xl mx-auto px-4 sm:px-6",
      maxWidth === "lg" && "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
      maxWidth === "xl" && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      maxWidth === "2xl" && "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
      maxWidth === "full" && "max-w-full",
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
      "w-full mt-auto transition-colors",
      variant === "simple" && "bg-white dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800 py-8",
      variant === "detailed" && "bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 py-12",
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
        data-content-layout={contentLayout}
        data-content-spacing={contentSpacing}
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
  id?: string;
}> = ({ children, layout = "default", spacing = "md", className, id }) => (
  <div id={id} className={cn(contentVariants({ layout, spacing }), className)}>
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
};
