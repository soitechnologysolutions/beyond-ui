import React, { useState } from "react";
import { Skeleton } from "../Skeleton";
import { Spinner } from "../Spinner";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  skeletonClassName?: string;
}

const DEFAULT_PLACEHOLDER =
  "https://res.cloudinary.com/dmpposta9/image/upload/v1759505259/beyond/beyond%20ui/beyond-ui-logo-part-with-bg_1_wydfry.png";
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = "",
  fallbackSrc = DEFAULT_PLACEHOLDER,
  skeletonClassName = "w-full h-full",
  ...imgProps
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [containerRef, inView] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1, freezeOnceVisible: true });

  // Only load image if inView (or fallback if IntersectionObserver unsupported)
  const shouldLoad = inView;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!loaded && !error && (
        <div className={`absolute inset-0 flex items-center justify-center ${skeletonClassName}`}>
          <Skeleton className="w-full h-full absolute inset-0" />
          <Spinner className="relative z-10 w-8 h-8 text-primary-500" />
        </div>
      )}
      {shouldLoad && (
        <img
          src={error ? fallbackSrc : src}
          alt={alt}
          // loading="lazy"
          style={loaded ? {} : { display: "none" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          draggable={imgProps.draggable ?? false}
          {...imgProps}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${loaded ? "" : "hidden"}`}
        />
      )}
    </div>
  );
};