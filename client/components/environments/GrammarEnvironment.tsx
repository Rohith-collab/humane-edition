import React from "react";

export function GrammarEnvironment() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Classroom Desk */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
        <div className="w-full h-full bg-gradient-to-t from-amber-900/50 to-amber-800/40 rounded-t-lg">
          {/* Desk surface */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-700/40 to-amber-800/40 rounded-t-lg"></div>
          
          {/* Open textbook */}
          <div className="absolute top-6 left-8 w-20 h-12">
            <div className="w-full h-full bg-white/50 rounded shadow-lg">
              <div className="flex">
                <div className="w-1/2 p-1 space-y-0.5">
                  <div className="h-0.5 bg-gray-700/60 rounded"></div>
                  <div className="h-0.5 bg-gray-700/60 rounded w-3/4"></div>
                  <div className="h-0.5 bg-gray-700/60 rounded w-1/2"></div>
                </div>
                <div className="w-1/2 p-1 space-y-0.5">
                  <div className="h-0.5 bg-gray-700/60 rounded w-2/3"></div>
                  <div className="h-0.5 bg-gray-700/60 rounded"></div>
                  <div className="h-0.5 bg-gray-700/60 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pencils and pens */}
          <div className="absolute top-4 right-12 w-8 h-2 flex space-x-1">
            <div className="w-0.5 h-full bg-yellow-600/50 rounded"></div>
            <div className="w-0.5 h-full bg-blue-600/50 rounded"></div>
            <div className="w-0.5 h-full bg-red-600/50 rounded"></div>
          </div>

          {/* Notebook */}
          <div className="absolute top-8 right-24 w-10 h-8 bg-blue-200/40 rounded shadow-sm">
            <div className="p-1 space-y-0.5">
              <div className="h-0.5 bg-blue-800/40 rounded"></div>
              <div className="h-0.5 bg-blue-800/40 rounded w-3/4"></div>
              <div className="h-0.5 bg-blue-800/40 rounded w-1/2"></div>
            </div>
          </div>

          {/* Eraser */}
          <div className="absolute top-6 left-32 w-3 h-2 bg-pink-300/50 rounded"></div>
        </div>
      </div>

      {/* Whiteboard/Blackboard */}
      <div className="absolute top-4 left-4 w-32 h-20 opacity-25">
        <div className="w-full h-full bg-green-900/40 rounded border border-brown-600/30">
          {/* Chalk writing */}
          <div className="p-2 space-y-2">
            <div className="text-white/60 text-xs font-mono">Grammar Rules:</div>
            <div className="h-0.5 bg-white/40 rounded w-3/4"></div>
            <div className="h-0.5 bg-white/40 rounded w-1/2"></div>
            <div className="h-0.5 bg-white/40 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Educational Posters */}
      <div className="absolute top-8 right-8 w-16 h-20 opacity-20">
        <div className="w-full h-full bg-white/40 rounded border border-gray-400/30">
          <div className="p-1 space-y-1">
            <div className="text-center text-xs font-bold text-blue-700/60">VERBS</div>
            <div className="h-0.5 bg-blue-600/40 rounded"></div>
            <div className="h-0.5 bg-green-600/40 rounded w-3/4"></div>
            <div className="h-0.5 bg-red-600/40 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Stack of books */}
      <div className="absolute bottom-28 left-4 w-6 h-12 opacity-25">
        <div className="space-y-0.5">
          <div className="w-full h-3 bg-red-600/50 rounded-sm"></div>
          <div className="w-full h-3 bg-blue-600/50 rounded-sm"></div>
          <div className="w-full h-3 bg-green-600/50 rounded-sm"></div>
        </div>
      </div>

      {/* Classroom Window */}
      <div className="absolute top-0 right-0 w-24 h-16 opacity-15">
        <div className="w-full h-full bg-gradient-to-b from-blue-300/30 to-blue-400/30 rounded-bl-lg">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30"></div>
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/30"></div>
        </div>
      </div>

      {/* Study Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/8 via-transparent to-green-200/8"></div>
      
      {/* Educational Lighting */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/6 to-transparent"></div>
    </div>
  );
}
