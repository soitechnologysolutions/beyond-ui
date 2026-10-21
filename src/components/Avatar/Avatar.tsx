import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-16 w-16",
        xl: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const AvatarContext = React.createContext<{
  showFallback: boolean;
  setShowFallback: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarVariants>
>(({ className, size, children, ...props }, ref) => {
  const [showFallback, setShowFallback] = React.useState(true);

  return (
    <AvatarContext.Provider value={{ showFallback, setShowFallback }}>
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, onError, onLoad, ...props }, ref) => {
  const context = React.useContext(AvatarContext);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const validSrc = typeof src === "string" && src.trim().length > 0;
    setHasError(false);
    context?.setShowFallback(!validSrc);
  }, [src, context]);

  const validSrc = typeof src === "string" && src.trim().length > 0;
  if (!validSrc || hasError) {
    return null;
  }

  return (
    <img
      ref={ref}
      src={src}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onLoad={(e) => {
        context?.setShowFallback(false);
        onLoad?.(e);
      }}
      onError={(e) => {
        setHasError(true);
        context?.setShowFallback(true);
        onError?.(e);
      }}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(AvatarContext);
  if (context && !context.showFallback) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold select-none",
        className
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };