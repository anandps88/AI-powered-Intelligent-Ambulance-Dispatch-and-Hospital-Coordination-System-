'use client'

import { MapPin, Navigation, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MapPanel() {
  // Mock map markers data
  const markers = [
    // Emergencies (Red)
    { id: 1, type: 'emergency', x: '25%', y: '30%', label: 'A12345' },
    { id: 2, type: 'emergency', x: '65%', y: '45%', label: 'A12346' },
    { id: 3, type: 'emergency', x: '45%', y: '70%', label: 'A12347' },
    
    // Hospitals (Green)
    { id: 4, type: 'hospital', x: '35%', y: '25%', label: 'Hospital 1' },
    { id: 5, type: 'hospital', x: '70%', y: '60%', label: 'Hospital 2' },
    { id: 6, type: 'hospital', x: '20%', y: '75%', label: 'Hospital 3' },
    
    // Ambulances (Blue)
    { id: 7, type: 'ambulance', x: '30%', y: '35%', label: 'Unit 3' },
    { id: 8, type: 'ambulance', x: '60%', y: '50%', label: 'Unit 1' },
    { id: 9, type: 'ambulance', x: '40%', y: '65%', label: 'Unit 2' },
    { id: 10, type: 'ambulance', x: '55%', y: '30%', label: 'Unit 5' },
  ]

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden h-full">
      {/* Map Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Live Map View</h2>
            <p className="text-sm text-slate-400 mt-1">Real-time asset tracking</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200">
              <Navigation className="w-5 h-5 text-slate-300" />
            </button>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200">
              <Activity className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Area - Placeholder with markers */}
      <div className="relative h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Grid overlay for map effect */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Map markers */}
        {markers.map((marker, index) => (
          <motion.div
            key={marker.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: marker.x, top: marker.y }}
          >
            {/* Marker ping animation */}
            <div className={`absolute inset-0 rounded-full animate-ping ${
              marker.type === 'emergency' ? 'bg-rose-500' :
              marker.type === 'hospital' ? 'bg-emerald-500' :
              'bg-blue-500'
            } opacity-75`} />
            
            {/* Marker icon */}
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg ${
              marker.type === 'emergency' 
                ? 'bg-rose-500 border-rose-400 glow-red' 
                : marker.type === 'hospital'
                ? 'bg-emerald-500 border-emerald-400 glow-green'
                : 'bg-blue-500 border-blue-400 glow-blue'
            }`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>

            {/* Tooltip on hover */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              <div className="text-xs font-semibold text-white">{marker.label}</div>
              <div className="text-xs text-slate-400 capitalize">{marker.type}</div>
            </div>
          </motion.div>
        ))}

        {/* Placeholder text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-600 text-sm font-medium">
              Map Integration Ready
            </p>
            <p className="text-slate-700 text-xs mt-1">
              Leaflet.js / Mapbox can be integrated here
            </p>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 glow-red" />
            <span className="text-slate-400">Emergencies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 glow-green" />
            <span className="text-slate-400">Hospitals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 glow-blue" />
            <span className="text-slate-400">Ambulances</span>
          </div>
        </div>
      </div>
    </div>
  )
}
