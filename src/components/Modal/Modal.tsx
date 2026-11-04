import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const modalVariants = cva(
  "fixed left-[50%] top-[50%] z-50 flex flex-col w-[calc(100vw-1.5rem)] sm:w-full max-w-lg max-h-[90vh] translate-x-[-50%] translate-y-[-50%] gap-3 border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 shadow-2xl duration-200 rounded-2xl overflow-hidden",
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
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  open, 
  onOpenChange, 
  children, 
  size,
  className,
}) => {
  const handleClose = () => {
    onOpenChange?.(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className={cn(modalVariants({ size }), className)}>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3.5 top-3.5 z-10 rounded-lg p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:pointer-events-none cursor-pointer"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </>
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