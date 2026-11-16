import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const modalVariants = cva(
  "fixed left-1/2 top-1/2 z-50 flex flex-col w-[calc(100vw-1.5rem)] sm:w-full max-w-lg max-h-[90vh] -translate-x-1/2 -translate-y-1/2 gap-3 border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 shadow-2xl duration-200 rounded-2xl overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw] max-h-[95vh]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  open?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  open, 
  isOpen,
  onOpenChange, 
  onClose,
  title,
  children, 
  size,
  className,
}) => {
  const isModalOpen = Boolean(open ?? isOpen);

  const handleClose = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  const dialogRef = React.useRef<HTMLDivElement>(null);

  // Lock body scroll and auto-scroll modal / forms to top
  React.useEffect(() => {
    if (!isModalOpen || typeof document === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    // Scroll dialog and any inner scrollable containers to top
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
      const scrollables = dialogRef.current.querySelectorAll('.overflow-y-auto');
      scrollables.forEach((el) => {
        (el as HTMLElement).scrollTop = 0;
      });

      // Auto-focus first input / select / textarea
      const firstInput = dialogRef.current.querySelector<HTMLElement>(
        'input:not([type="hidden"]), select, textarea, button:not([class*="absolute"])'
      );
      if (firstInput && typeof firstInput.focus === "function") {
        firstInput.focus();
      }
    }

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (!isModalOpen || typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
        }}
        onClick={handleClose}
      />
      
      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={cn(modalVariants({ size }), className)}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          zIndex: 10000,
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3.5 top-3.5 z-10 rounded-lg p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:pointer-events-none cursor-pointer"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        {children}
      </div>
    </>,
    document.body
  );
};

const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-left shrink-0 pr-8",
      className
    )}
    {...props}
  />
);

const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2
    className={cn(
      "text-base sm:text-lg font-semibold leading-snug tracking-tight text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
);

const ModalDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-xs sm:text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
);

const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex-1 min-h-0 overflow-y-auto py-2 pr-1 text-gray-900 dark:text-gray-100",
      className
    )}
    {...props}
  />
);

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 shrink-0 pt-2 border-t border-gray-100 dark:border-gray-800",
      className
    )}
    {...props}
  />
);

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  modalVariants,
};
