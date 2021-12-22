import { ElMessageBox, ElMessage, Callback } from 'element-plus';

// 消息
const Message = (message: string): any => ElMessage({
  showClose: true,
  message,
});

// 成功
const successMessage = (message: string): any => ElMessage({
  showClose: true,
  message,
  type: 'success',
});

// 警告
const warnMessage = (message: string): any => ElMessage({
  showClose: true,
  message,
  type: 'warning',
});

// 失败
const errorMessage = (message: string): any => ElMessage({
  showClose: true,
  message,
  type: 'error',
});

// 确认弹框
const confirmMessage = (
  message: string,
  title: string,
  callback?: Callback,
  confirmText?: string,
  cancelText?: string,
): any => ElMessageBox.confirm(message, title, {
  confirmButtonText: confirmText || '确认',
  cancelButtonText: cancelText || '取消',
  type: 'success',
  center: true,
  callback,
  customClass: '',
});

export { Message, successMessage, warnMessage, errorMessage, confirmMessage };
