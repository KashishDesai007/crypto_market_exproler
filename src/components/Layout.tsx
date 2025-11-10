import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.scrollY || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
      setScrollPercent(pct);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollPercent={scrollPercent} />
      {children}
    </div>
  );
};

export default Layout;
