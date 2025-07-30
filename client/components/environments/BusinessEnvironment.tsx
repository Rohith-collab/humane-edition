import React from "react";

export function BusinessEnvironment() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Conference Room Table */}
      <div className="absolute bottom-0 left-0 right-0 h-28 opacity-25">
        <div className="w-full h-full bg-gradient-to-t from-gray-800/50 to-gray-700/40 rounded-t-lg">
          {/* Table surface with reflection */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-600/40 to-gray-700/40 rounded-t-lg"></div>
          
          {/* Laptop */}
          <div className="absolute top-6 left-12 w-16 h-10">
            <div className="w-full h-6 bg-gray-300/40 rounded-t"></div>
            <div className="w-full h-4 bg-gray-800/50 rounded-b"></div>
          </div>

          {/* Documents */}
          <div className="absolute top-8 right-16 w-12 h-8 bg-white/40 rounded shadow-sm">
            <div className="p-1 space-y-0.5">
              <div className="h-0.5 bg-gray-600/60 rounded"></div>
              <div className="h-0.5 bg-gray-600/60 rounded w-3/4"></div>
              <div className="h-0.5 bg-gray-600/60 rounded w-1/2"></div>
            </div>
          </div>

          {/* Coffee cup */}
          <div className="absolute top-4 left-32 w-4 h-6">
            <div className="w-full h-4 bg-white/40 rounded-b-lg"></div>
            <div className="w-2 h-2 bg-brown-400/40 rounded-full mx-auto -mt-1"></div>
          </div>

          {/* Presentation remote */}
          <div className="absolute top-6 right-8 w-6 h-3 bg-black/40 rounded"></div>
        </div>
      </div>

      {/* Office Building Windows */}
      <div className="absolute top-0 right-0 w-32 h-24 opacity-20">
        <div className="w-full h-full bg-gradient-to-b from-blue-300/30 to-blue-500/30 rounded-bl-lg">
          {/* Window grid */}
          <div className="grid grid-cols-4 grid-rows-3 h-full w-full gap-0.5 p-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white/10 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Wall-mounted Presentation Screen */}
      <div className="absolute top-8 left-8 w-24 h-14 opacity-20">
        <div className="w-full h-full bg-gray-900/50 rounded border border-gray-600/40">
          <div className="p-2 space-y-1">
            <div className="h-1 bg-blue-400/50 rounded w-3/4"></div>
            <div className="h-0.5 bg-gray-400/40 rounded"></div>
            <div className="h-0.5 bg-gray-400/40 rounded w-2/3"></div>
            <div className="flex space-x-1 mt-2">
              <div className="w-4 h-3 bg-green-400/40 rounded-sm"></div>
              <div className="w-4 h-3 bg-blue-400/40 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Plant */}
      <div className="absolute bottom-32 left-4 w-8 h-16 opacity-20">
        <div className="w-full h-8 bg-green-600/40 rounded-t-full"></div>
        <div className="w-6 h-8 bg-brown-600/40 rounded-b mx-auto"></div>
      </div>

      {/* Corporate Logo/Banner */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 opacity-15">
        <div className="w-full h-full bg-gradient-to-r from-nova-500/30 to-cyber-500/30 rounded flex items-center justify-center">
          <div className="text-white text-xs font-bold opacity-70">BUSINESS</div>
        </div>
      </div>

      {/* Professional Lighting */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/8 to-transparent"></div>
      
      {/* Corporate Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/8 via-transparent to-blue-900/8"></div>
    </div>
  );
}
