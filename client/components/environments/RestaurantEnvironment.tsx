import React from "react";

export function RestaurantEnvironment() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Restaurant Table */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <div className="w-full h-full bg-gradient-to-t from-amber-900/60 to-amber-800/40 rounded-t-3xl">
          {/* Table surface */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-amber-700/50 to-amber-800/50 rounded-t-3xl"></div>
          
          {/* Place setting */}
          <div className="absolute top-8 left-8 w-20 h-16 flex items-center justify-center">
            {/* Plate */}
            <div className="w-12 h-12 bg-white/40 rounded-full border border-white/20"></div>
            {/* Utensils */}
            <div className="absolute -left-2 top-1/2 w-0.5 h-8 bg-silver/40 rounded"></div>
            <div className="absolute -right-2 top-1/2 w-0.5 h-6 bg-silver/40 rounded"></div>
          </div>

          {/* Menu */}
          <div className="absolute top-6 right-8 w-16 h-20 bg-amber-100/30 rounded shadow-lg">
            <div className="p-2 space-y-1">
              <div className="h-1 bg-amber-900/50 rounded"></div>
              <div className="h-0.5 bg-amber-800/40 rounded"></div>
              <div className="h-0.5 bg-amber-800/40 rounded w-3/4"></div>
              <div className="h-0.5 bg-amber-800/40 rounded w-1/2"></div>
            </div>
          </div>

          {/* Wine glass */}
          <div className="absolute top-4 left-24 w-3 h-8">
            <div className="w-full h-4 bg-white/30 rounded-b-full"></div>
            <div className="w-1 h-4 bg-white/30 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Restaurant Ambiance - Hanging Lights */}
      <div className="absolute top-4 left-16 w-4 h-6 opacity-25">
        <div className="w-full h-4 bg-amber-400/50 rounded-b-full"></div>
        <div className="w-0.5 h-2 bg-gray-600/50 mx-auto"></div>
      </div>
      
      <div className="absolute top-4 right-20 w-4 h-6 opacity-25">
        <div className="w-full h-4 bg-amber-400/50 rounded-b-full"></div>
        <div className="w-0.5 h-2 bg-gray-600/50 mx-auto"></div>
      </div>

      {/* Restaurant Wall Art */}
      <div className="absolute top-12 left-4 w-20 h-16 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded border border-amber-600/30">
          <div className="p-2 flex items-center justify-center text-amber-800/50 text-xs">
            🍷
          </div>
        </div>
      </div>

      {/* Kitchen Door Indicator */}
      <div className="absolute top-1/2 right-0 w-8 h-20 opacity-15">
        <div className="w-full h-full bg-steel-400/30 rounded-l-lg">
          <div className="absolute left-1 top-1/2 w-2 h-2 bg-silver/40 rounded-full"></div>
        </div>
      </div>

      {/* Warm Restaurant Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-300/5 via-orange-200/5 to-amber-800/10"></div>
      
      {/* Cozy Atmosphere Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-orange-900/10"></div>
    </div>
  );
}
