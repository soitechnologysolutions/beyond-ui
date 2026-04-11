import * as React from "react";
import { Menu, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const navbarVariants = cva(
  "flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800",
        dark: "bg-gray-900 dark:bg-gray-950 border-gray-700 dark:border-gray-800 text-white",
        transparent: "bg-transparent border-transparent",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  logo?: React.ReactNode;
  children?: React.ReactNode;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, size, logo, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <nav
        ref={ref}
        className={cn(navbarVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          {logo && <div className="flex-shrink-0">{logo}</div>}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {children}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50">
            <div className="px-4 py-2 space-y-2">
              {children}
            </div>
          </div>
        )}
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

const NavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors",
      className
    )}
    {...props}
  />
));
NavItem.displayName = "NavItem";

export { Navbar, NavItem, navbarVariants };