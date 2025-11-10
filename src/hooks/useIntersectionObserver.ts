import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver<T extends Element>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIntersecting(entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref.current]);

  return [ref, isIntersecting];
}


