import React from "react";

export function InterviewEnvironment() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Office Window with City View */}
      <div className="absolute top-0 right-0 w-48 h-32 opacity-20">
        <div className="w-full h-full bg-gradient-to-b from-blue-400/30 to-blue-600/30 rounded-bl-lg border-l border-b border-white/20">
          {/* Window frame */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30"></div>
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/30"></div>
        </div>
      </div>

      {/* Office Desk Corner */}
      <div className="absolute bottom-0 right-0 w-64 h-24 opacity-25">
        <div className="w-full h-full bg-gradient-to-tl from-amber-900/40 to-amber-700/40 rounded-tl-lg">
          {/* Desk items */}
          <div className="absolute top-2 right-4 w-8 h-4 bg-gray-600/50 rounded-sm"></div>
          <div className="absolute top-3 right-16 w-3 h-3 bg-blue-500/50 rounded-full"></div>
          <div className="absolute top-2 right-28 w-12 h-6 bg-white/30 rounded"></div>
        </div>
      </div>

      {/* Professional Documents/Portfolio */}
      <div className="absolute top-20 left-4 w-16 h-20 opacity-20">
        <div className="w-full h-full bg-white/40 rounded shadow-lg">
          <div className="p-2 space-y-1">
            <div className="h-1 bg-gray-600/60 rounded"></div>
            <div className="h-1 bg-gray-600/60 rounded w-3/4"></div>
            <div className="h-1 bg-gray-600/60 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Company Logo Area */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 opacity-15">
        <div className="w-full h-full bg-gradient-to-r from-nova-500/30 to-electric-500/30 rounded flex items-center justify-center">
          <div className="text-white text-xs font-bold opacity-70">COMPANY</div>
        </div>
      </div>

      {/* Professional Lighting Effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
      
      {/* Ambient Professional Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-gray-900/10"></div>
    </div>
  );
}
