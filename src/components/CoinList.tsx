import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Skeleton, Empty } from 'antd';
import { CoinCard } from '@/components/CoinCard';
import CoinTable from '@/components/CoinTable';
import ViewToggle, { ViewMode } from '@/components/ViewToggle';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Coin } from '@/types/coin';

type Props = {
  pages: Coin[][] | undefined;
  isLoading: boolean;
  isError: boolean; 
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
};

export const CoinList: React.FC<Props> = ({ pages, isLoading, isError, hasNextPage, fetchNextPage }) => {
  const items = useMemo(() => (pages ? pages.flat() : []), [pages]);
  const [ref, inView] = useIntersectionObserver<HTMLDivElement>();
  const triggered = useRef(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    if (inView && hasNextPage && fetchNextPage && !triggered.current) {
      triggered.current = true;
      (async () => {
        try {
          await Promise.resolve(fetchNextPage());
        } finally {
          triggered.current = false;
        }
      })();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end mb-4">
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="glass p-4 rounded-2xl">
                <Skeleton active avatar paragraph={{ rows: 2 }} />
              </div>
            ))}
          </div>
        ) : (
          <CoinTable data={[]} loading={true} />
        )}
      </div>
    );
  }

  if (isError) {
    return <Empty description="Failed to load data. Try again later." className="text-gray-700" />;
  }

  if (!items.length) {
    return <Empty description="No results" className="text-gray-700" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      ) : (
        <CoinTable data={items} loading={isLoading} />
      )}

      <div ref={ref} />
      {hasNextPage && (
        <div className="flex justify-center">
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      )}
    </div>
  );
};


