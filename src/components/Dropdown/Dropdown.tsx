import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const dropdownArrowVariants = cva(
  "shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      open: {
        true: "rotate-180",
        false: "rotate-0",
      },
      reverse: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        reverse: true,
        open: false,
        className: "rotate-180",
      },
      {
        reverse: true,
        open: true,
        className: "rotate-0",
      },
      {
        reverse: false,
        open: false,
        className: "rotate-0",
      },
      {
        reverse: false,
        open: true,
        className: "rotate-180",
      },
    ],
    defaultVariants: {
      size: "md",
      open: false,
      reverse: false,
    },
  }
);

export interface DropdownArrowProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "open">,
    VariantProps<typeof dropdownArrowVariants> {
  /** Whether the parent dropdown is open (rotates arrow 180deg) */
  open?: boolean;
  /** Whether the arrow is reversed (pointing up when closed, pointing down when open) */
  reverse?: boolean;
  /** Explicit direction for the arrow (shorthand: "up" sets reverse={true}, "down" sets reverse={false}) */
  direction?: "down" | "up";
}

const DropdownArrow = React.forwardRef<SVGSVGElement, DropdownArrowProps>(
  ({ className, size, open = false, reverse = false, direction, ...props }, ref) => {
    const isReversed = direction ? direction === "up" : reverse;
    return (
      <ChevronDown
        ref={ref}
        className={cn(dropdownArrowVariants({ size, open, reverse: isReversed }), className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
DropdownArrow.displayName = "DropdownArrow";

const dropdownMenuVariants = cva(
  "absolute z-50 min-w-[12rem] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 text-gray-900 dark:text-gray-100 shadow-lg ring-1 ring-black/5 focus:outline-none transition-all duration-150",
  {
    variants: {
      align: {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 -translate-x-1/2",
      },
      placement: {
        bottom: "top-full mt-2 origin-top",
        top: "bottom-full mb-2 origin-bottom",
      },
    },
    defaultVariants: {
      align: "right",
      placement: "bottom",
    },
  }
);

const dropdownItemVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800",
        danger:
          "text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-950/40 focus:bg-danger-50 dark:focus:bg-danger-950/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DropdownItem {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: "default" | "danger";
  disabled?: boolean;
  /** Render a visual divider above this item */
  divider?: boolean;
  badge?: string | number;
  className?: string;
}

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownItemVariants> {
  icon?: React.ReactNode;
  badge?: string | number;
  href?: string;
}

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ className, variant, icon, badge, href, children, onClick, ...props }, ref) => {
  if (href && !props.disabled) {
    return (
      <a
        href={href}
        className={cn(dropdownItemVariants({ variant }), className)}
        role="menuitem"
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 truncate text-left">{children}</span>
        {badge !== undefined && (
          <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
            {badge}
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={cn(dropdownItemVariants({ variant }), className)}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex-1 truncate text-left">{children}</span>
      {badge !== undefined && (
        <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
          {badge}
        </span>
      )}
    </button>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("my-1 h-px bg-gray-200 dark:bg-gray-800", className)}
    {...props}
  />
));
DropdownDivider.displayName = "DropdownDivider";

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof dropdownMenuVariants> {
  /** Trigger element (e.g. avatar + name/email) */
  trigger?: React.ReactNode;
  /** Declarative list of dropdown menu items */
  items?: DropdownItem[];
  /** Optional header rendered at the top of the dropdown menu */
  header?: React.ReactNode;
  /** Whether to show the DropdownArrow beside the trigger (default: true) */
  showArrow?: boolean;
  /** Size of the DropdownArrow (default: "md") */
  arrowSize?: VariantProps<typeof dropdownArrowVariants>["size"];
  /** Whether to reverse the arrow direction (pointing up when closed, pointing down when open) */
  arrowReverse?: boolean;
  /** Explicit direction for the arrow (shorthand: "up" | "down") */
  arrowDirection?: "down" | "up";
  /** Optional className for the DropdownArrow */
  arrowClassName?: string;
  /** Optional className for the trigger button/wrapper */
  triggerClassName?: string;
  /** Optional className for the dropdown menu panel */
  menuClassName?: string;
  /** Controlled open state */
  open?: boolean;
  /** Default open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether clicking an item automatically closes the dropdown (default: true) */
  closeOnSelect?: boolean;
  /** Disable opening the dropdown */
  disabled?: boolean;
  /** Whether the dropdown container and trigger should span full width (default: false) */
  fullWidth?: boolean;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      trigger,
      items = [],
      header,
      align = "right",
      placement = "bottom",
      showArrow = true,
      arrowSize = "md",
      arrowReverse = false,
      arrowDirection,
      arrowClassName,
      triggerClassName,
      menuClassName,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnSelect = true,
      disabled = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const setOpen = React.useCallback(
      (nextValue: boolean | ((prev: boolean) => boolean)) => {
        const resolved =
          typeof nextValue === "function" ? nextValue(isOpen) : nextValue;
        if (!isControlled) {
          setUncontrolledOpen(resolved);
        }
        onOpenChange?.(resolved);
      },
      [isControlled, isOpen, onOpenChange]
    );

    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, setOpen]);

    const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.stopPropagation();
      setOpen((prev) => !prev);
    };

    const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          "relative",
          fullWidth ? "flex w-full items-center" : "inline-flex items-center",
          className
        )}
        {...props}
      >
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            "rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            fullWidth
              ? "flex w-full items-center justify-between gap-2"
              : "inline-flex items-center gap-2",
            !disabled && "cursor-pointer",
            disabled && "opacity-50 pointer-events-none",
            triggerClassName
          )}
        >
          {trigger}
          {showArrow && (
            <DropdownArrow
              size={arrowSize}
              open={isOpen}
              reverse={arrowReverse}
              direction={arrowDirection}
              className={arrowClassName}
            />
          )}
        </div>

        {isOpen && (
          <div
            role="menu"
            aria-orientation="vertical"
            className={cn(
              dropdownMenuVariants({ align, placement }),
              menuClassName
            )}
          >
            {header && (
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 mb-1">
                {header}
              </div>
            )}

            {items.map((item, index) => (
              <React.Fragment key={item.id || index}>
                {item.divider && <DropdownDivider />}
                <DropdownMenuItem
                  variant={item.variant}
                  icon={item.icon}
                  badge={item.badge}
                  href={item.href}
                  disabled={item.disabled}
                  className={item.className}
                  onClick={(e) => {
                    item.onClick?.(e);
                    if (closeOnSelect) {
                      setOpen(false);
                    }
                  }}
                >
                  {item.label}
                </DropdownMenuItem>
              </React.Fragment>
            ))}

            {children}
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export {
  Dropdown,
  DropdownArrow,
  DropdownMenuItem,
  DropdownDivider,
  dropdownArrowVariants,
  dropdownMenuVariants,
  dropdownItemVariants,
};
