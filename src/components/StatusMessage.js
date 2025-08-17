import { useState, useEffect } from 'react';

export default function StatusMessage({ type, message, onClose, autoClose = true }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, onClose]);

  if (!message || !isVisible) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: "✅"
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: "❌"
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-800",
      icon: "⚠️"
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: "ℹ️"
    }
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div className={`fixed top-4 right-4 z-50 ${style.bg} border-2 ${style.text} px-6 py-4 rounded-lg shadow-lg max-w-md slide-in`}>
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{style.icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-lg">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}