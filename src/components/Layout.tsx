import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { ConfigProvider } from 'antd'; // Import ConfigProvider

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb', // Your primary color (example: Tailwind blue-600)
          colorBgBase: '#f8fafc',  // Background color
          colorTextBase: '#1e293b', // Text color
        },
      }}
    >
      <div className="min-h-screen flex flex-col w-full">
        <Header scrollPercent={scrollPercent} />
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    </ConfigProvider>
  );
};

export default Layout;