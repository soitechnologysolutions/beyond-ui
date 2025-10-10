import { useEffect, useState } from "react";

export interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * useIntersectionObserver
 * Returns true if the element is in the viewport.
 * Usage: const [ref, inView] = useIntersectionObserver(options);
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options?: IntersectionOptions
): [React.RefObject<T>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useState<React.RefObject<T>>(() => ({ current: null }))[0];

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true); // Fallback: always load if no observer
      return;
    }

    let frozen = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.freezeOnceVisible) {
            frozen = true;
            observer.disconnect();
          }
        } else if (!frozen) {
          setInView(false);
        }
      },
      options
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [ref, inView];
}