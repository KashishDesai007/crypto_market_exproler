import React from 'react';
import { Modal } from 'antd';
import { FilterBar } from './FilterBar';
import { useTheme } from '../providers/ThemeProvider';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Modal
      title="Filter Cryptocurrencies"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={isDark ? 'dark-theme' : ''}
      styles={{
        content: {
          background: isDark ? '#071025' : '#ffffff',
          color: isDark ? '#fff' : '#000',
        },
        header: {
          background: isDark ? '#071025' : '#ffffff',
          borderBottom: `1px solid ${isDark ? '#333' : '#f0f0f0'}`,
        },
        body: {
          padding: '24px',
        },
      }}
    >
      <div className="py-4">
        <FilterBar onChange={onApplyFilters} />
      </div>
    </Modal>
  );
};

export default FilterModal;