"use client";

import { useState } from 'react';

export default function RetroButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  className = '',
  icon: Icon
}) {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: 'holo-button text-cyan-300 hover:text-white border-cyan-400/50 hover:border-cyan-400',
    secondary: 'holo-button text-purple-300 hover:text-white border-purple-400/50 hover:border-purple-400',
    success: 'holo-button text-emerald-300 hover:text-white border-emerald-400/50 hover:border-emerald-400',
    danger: 'holo-button text-red-300 hover:text-white border-red-400/50 hover:border-red-400',
    ghost: 'bg-transparent border-2 border-white/20 text-white/80 hover:border-cyan-400/50 hover:text-cyan-300'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        font-semibold rounded-lg transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95 relative overflow-hidden
        retro-subtitle tracking-wide
        ${className}
      `}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="cyber-loading" />
        </div>
      )}
      
      {/* Button content */}
      <div className={`flex items-center justify-center space-x-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </div>

      {/* Press effect */}
      {isPressed && (
        <div className="absolute inset-0 bg-white/10 rounded-lg" />
      )}
    </button>
  );
}