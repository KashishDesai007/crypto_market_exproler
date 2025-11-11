import React from 'react';
import { Alert } from 'antd';

type CommonAlertProps = {
  message: string;
  description?: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
};

const CommonAlert: React.FC<CommonAlertProps> = ({
  message,
  description,
  type = 'error',
  showIcon = true,
  closable = true,
  onClose,
}) => (
  <Alert
    message={message}
    description={description}
    type={type}
    showIcon={showIcon}
    closable={closable}
    onClose={onClose}
    style={{ marginBottom: 16 }}
  />
);

export default CommonAlert;