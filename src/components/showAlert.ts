import { message } from 'antd';

type AlertType = 'error' | 'warning' | 'success' | 'info';

export function showAlert(
  msg: string,
  type: AlertType = 'info',
  description?: string
) {
  const content = description ? `${msg}\n${description}` : msg;
  message[type](content, 3);
}