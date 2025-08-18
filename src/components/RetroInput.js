"use client";

import { useState } from 'react';

export default function RetroInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  pattern,
  className = '',
  label,
  hint,
  icon: Icon
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-cyan-300 font-semibold text-sm retro-subtitle tracking-wide">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400/60">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className={`
            w-full retro-input rounded-lg px-4 py-3 text-white
            transition-all duration-300 ease-out
            retro-subtitle tracking-wide
            ${Icon ? 'pl-12' : ''}
            ${isFocused ? 'transform scale-[1.02]' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {/* Animated border glow */}
        {isFocused && (
          <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/50 pointer-events-none animate-pulse" />
        )}
      </div>
      
      {hint && (
        <p className="text-cyan-400/60 text-xs retro-subtitle">
          {hint}
        </p>
      )}
    </div>
  );
}