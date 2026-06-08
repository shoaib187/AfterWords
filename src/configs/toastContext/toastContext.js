import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from '../../components/common/toast/toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastData, setToastData] = useState({
    visible: false,
    message: "",
    type: "success", // 'success', 'error', 'warning', 'info'
    duration: 3000,
    position: "top", // 'top', 'bottom'
  });

  const showToast = useCallback((message, options = {}) => {
    setToastData({
      visible: true,
      message,
      type: options.type || "success",
      duration: options.duration || 3000,
      position: options.position || "top",
      icon: options.icon,
      customColor: options.customColor,
    });
  }, []);

  // Convenience methods for different toast types
  const toast = {
    show: showToast,
    success: (message, options = {}) =>
      showToast(message, { ...options, type: "success" }),
    error: (message, options = {}) =>
      showToast(message, { ...options, type: "error" }),
    warning: (message, options = {}) =>
      showToast(message, { ...options, type: "warning" }),
    info: (message, options = {}) =>
      showToast(message, { ...options, type: "info" }),
  };

  const hideToast = () => {
    setToastData((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast
        visible={toastData.visible}
        message={toastData.message}
        type={toastData.type}
        duration={toastData.duration}
        position={toastData.position}
        customColor={toastData.customColor}
        icon={toastData.icon}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};