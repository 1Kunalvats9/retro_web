export default function VisualButton({ 
  icon, 
  text, 
  description, 
  onClick, 
  color = "amber", 
  size = "lg",
  disabled = false,
  loading = false 
}) {
  const colorClasses = {
    amber: "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    green: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white",
    red: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white",
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
  };

  const sizeClasses = {
    sm: "p-4 text-sm",
    md: "p-6 text-base",
    lg: "p-8 text-lg",
    xl: "p-10 text-xl"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${colorClasses[color]}
        ${sizeClasses[size]}
        rounded-xl shadow-lg hover:shadow-xl
        transform transition-all duration-300
        hover:scale-105 hover:-translate-y-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        relative overflow-hidden
        visual-indicator
      `}
    >
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="flex flex-col items-center space-y-3">
        <div className="text-4xl md:text-5xl">{icon}</div>
        <div className="text-center">
          <div className="font-bold text-lg md:text-xl">{text}</div>
          {description && (
            <div className="text-sm md:text-base opacity-90 mt-1">{description}</div>
          )}
        </div>
      </div>
    </button>
  );
}