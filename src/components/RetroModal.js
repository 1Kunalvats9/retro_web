"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import RetroButton from './RetroButton';

export default function RetroModal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md' 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 retro-modal flex items-center justify-center z-50 p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`
        relative retro-modal-content rounded-2xl p-8 w-full ${sizes[size]}
        slide-in-up shadow-2xl
      `}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-2xl font-bold text-white mb-6 retro-title cyber-glow">
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="text-white">
          {children}
        </div>
      </div>
    </div>
  );
}