import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HeartFilled, FilterOutlined } from '@ant-design/icons';
import { SearchBar } from '@/components/SearchBar';
import { SortDropdown } from '@/components/SortDropdown';
import { useTheme } from 'src/providers/ThemeProvider';
import { useQueryFilters } from 'src/providers/QueryFiltersProvider';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/Button';
import FilterModal from './FilterModal';

type Props = {
  scrollPercent: number;
};

export const Header: React.FC<Props> = ({ scrollPercent }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const { setQuery, sort, setSort, filters, setFilters } = useQueryFilters();
  const router = useRouter();
  
  // Check if we're on the coin details page.
  const isDetailsPage = router.pathname.startsWith('/coin/');

  return (
    <>
      <header
        className={
          `sticky top-0 z-30 transition-all duration-200 border-b backdrop-blur-sm ${
            isDark ? 'bg-[#071025]/90 text-white border-white/6' : 'bg-white/90 text-slate-900 border-slate-200'
          }`
        }
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/CMX.png"
              alt="Crypto Market Explorer Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Crypto Market Explorer
            </div>
          </Link>

          {!isDetailsPage && (
            <div className="flex-1 max-w-2xl">
              <SearchBar onSearch={setQuery} />
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {!isDetailsPage && (
              <>
                <Button
                  variant="ghost"
                  customSize="sm"
                  onClick={() => setIsFilterModalOpen(true)}
                  icon={<FilterOutlined />}
                  className={isDark ? 'text-white hover:text-blue-400' : 'text-slate-800 hover:text-blue-600'}
                >
                  Filters
                </Button>
                <SortDropdown value={sort} onChange={setSort} />
              </>
            )}
            <Link 
              href="/favorites" 
              className={`flex items-center gap-2 transition-colors ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              <HeartFilled className="text-emerald-500" />
            </Link>
            <Button
              variant="ghost"
              customSize="sm"
              onClick={toggle}
              icon={isDark ? <Moon size={16} /> : <Sun size={16} className='text-gray-700'/>}
              aria-label="Toggle theme"
              className={isDark ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}
            />
          </div>
        </div>
          
        {/* scroll-progress indicator */}
        <div className="h-0.5 w-full bg-white/6">
          <div
            className="h-0.5 bg-emerald transition-all duration-150"
            style={{ width: `${scrollPercent}%` }}
            data-testid="scroll-progress"
          />
        </div>
      </header>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={setFilters}
      />
    </>
  );
};

export default Header;
