"use client";

import { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';

export default function RetroServiceCard({ 
  icon, 
  name, 
  description, 
  color, 
  path, 
  lang 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    yellow: { 
      bg: "from-yellow-400/20 via-amber-400/10 to-orange-400/20", 
      border: "border-yellow-400/30",
      glow: "hover:shadow-yellow-400/20",
      icon: "text-yellow-400"
    },
    blue: { 
      bg: "from-blue-400/20 via-cyan-400/10 to-sky-400/20", 
      border: "border-cyan-400/30",
      glow: "hover:shadow-cyan-400/20",
      icon: "text-cyan-400"
    },
    purple: { 
      bg: "from-purple-400/20 via-fuchsia-400/10 to-violet-400/20", 
      border: "border-purple-400/30",
      glow: "hover:shadow-purple-400/20",
      icon: "text-purple-400"
    },
    green: { 
      bg: "from-green-400/20 via-emerald-400/10 to-teal-400/20", 
      border: "border-emerald-400/30",
      glow: "hover:shadow-emerald-400/20",
      icon: "text-emerald-400"
    },
    red: { 
      bg: "from-red-400/20 via-rose-400/10 to-pink-400/20", 
      border: "border-red-400/30",
      glow: "hover:shadow-red-400/20",
      icon: "text-red-400"
    },
    indigo: { 
      bg: "from-indigo-400/20 via-blue-400/10 to-purple-400/20", 
      border: "border-indigo-400/30",
      glow: "hover:shadow-indigo-400/20",
      icon: "text-indigo-400"
    },
  };

  const selectedColor = colorClasses[color] || colorClasses.yellow;

  return (
    <a 
      href={path} 
      className={`
        block relative p-6 rounded-2xl transition-all duration-500 ease-out
        retro-service-card ${selectedColor.border} ${selectedColor.glow}
        hover:shadow-2xl group overflow-hidden
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${selectedColor.bg} opacity-60 transition-opacity duration-500 group-hover:opacity-80`} />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Icon container with glow effect */}
        <div className={`
          w-16 h-16 rounded-xl flex items-center justify-center mb-4 
          bg-black/20 backdrop-blur-sm border border-white/10
          transition-all duration-300 group-hover:scale-110
          ${selectedColor.icon}
        `}>
          <span className="text-3xl filter drop-shadow-lg glow-text">
            {icon}
          </span>
          {isHovered && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>

        {/* Content */}
        <h4 className="text-xl font-bold text-white mb-3 retro-title text-sm tracking-wider">
          {name}
        </h4>
        
        <p className="text-gray-300 mb-4 text-sm leading-relaxed retro-subtitle">
          {description}
        </p>

        {/* Action button */}
        <div className="flex items-center justify-between">
          <span className={`
            text-sm font-semibold transition-all duration-300
            ${selectedColor.icon} group-hover:glow-text
          `}>
            {lang.getStarted}
          </span>
          
          <div className={`
            p-2 rounded-lg transition-all duration-300
            bg-white/5 border border-white/10 backdrop-blur-sm
            group-hover:bg-white/10 group-hover:border-white/20
            group-hover:transform group-hover:translate-x-1
          `}>
            <ChevronRight className={`w-4 h-4 ${selectedColor.icon} transition-transform duration-300 group-hover:scale-110`} />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Zap className={`w-6 h-6 ${selectedColor.icon}`} />
        </div>
      </div>

      {/* Hover scan line effect */}
      <div className={`
        absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent
        transition-all duration-700 ease-out
        ${isHovered ? 'top-1/2 opacity-100' : 'top-0 opacity-0'}
      `} />
    </a>
  );
}