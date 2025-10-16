'use client'

import { incidents } from '@/lib/data'
import { MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function IncidentTable() {
  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white">Active Incidents</h2>
        <p className="text-sm text-slate-400 mt-1">Real-time incident tracking and management</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Case ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Assigned Ambulance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                ETA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {incidents.map((incident, index) => (
              <motion.tr
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-slate-900/50 transition-colors duration-150 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-sm font-mono font-semibold text-white">
                      {incident.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                    incident.status === 'On Route' && 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
                    incident.status === 'At Scene' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                    incident.status === 'Moving' && 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
                    incident.status === 'Dispatched' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  )}>
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold',
                    incident.severity === 'High' && 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
                    incident.severity === 'Medium' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                    incident.severity === 'Low' && 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  )}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="max-w-xs truncate">{incident.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-white">
                    {incident.assignedAmbulance}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-300 font-medium">
                      {incident.eta}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Showing <span className="font-semibold text-white">{incidents.length}</span> active incidents
          </span>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors duration-200">
            View All
          </button>
        </div>
      </div>
    </div>
  )
}
