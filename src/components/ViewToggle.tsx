import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useTheme } from 'src/providers/ThemeProvider';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex rounded-lg p-1 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded-md transition-all ${
          viewMode === 'grid'
            ? isDark
              ? 'bg-gray-700 text-gray-200'
              : 'bg-white text-gray-900 shadow-sm'
            : isDark
            ? 'text-gray-400 hover:text-gray-200'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid size={15} />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-2 rounded-md transition-all ${
          viewMode === 'list'
            ? isDark
              ? 'bg-gray-700 text-gray-200'
              : 'bg-white text-gray-900 shadow-sm'
            : isDark
            ? 'text-gray-400 hover:text-gray-200'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="List view"
      >
        <List size={15} />
      </button>
    </div>
  );
};

export default ViewToggle;