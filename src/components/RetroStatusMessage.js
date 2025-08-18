"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export default function RetroStatusMessage({ 
  type, 
  message, 
  onClose, 
  autoClose = true 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, onClose]);

  if (!message || !isVisible) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle,
      className: 'status-success',
      iconColor: 'text-emerald-400',
      glowColor: 'matrix-glow'
    },
    error: {
      icon: XCircle,
      className: 'status-error',
      iconColor: 'text-red-400',
      glowColor: 'glow-text'
    },
    warning: {
      icon: AlertCircle,
      className: 'status-error',
      iconColor: 'text-orange-400',
      glowColor: 'glow-text'
    },
    info: {
      icon: Info,
      className: 'status-info',
      iconColor: 'text-cyan-400',
      glowColor: 'cyber-glow'
    }
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <div className={`
      fixed top-4 right-4 z-50 ${config.className} 
      px-6 py-4 rounded-xl shadow-2xl max-w-md slide-in-up
      border backdrop-blur-lg
    `}>
      <div className="flex items-center space-x-3">
        <IconComponent className={`w-6 h-6 ${config.iconColor} ${config.glowColor}`} />
        <div className="flex-1">
          <p className={`font-semibold text-lg text-white retro-subtitle ${config.glowColor}`}>
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}