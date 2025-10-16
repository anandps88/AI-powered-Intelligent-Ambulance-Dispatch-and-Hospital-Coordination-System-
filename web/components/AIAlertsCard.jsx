'use client'

import { aiAlerts } from '@/lib/data'
import { Brain, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AIAlertsCard() {
  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-blue">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Alerts</h2>
          <p className="text-xs text-slate-400">Predictive insights</p>
        </div>
      </div>

      <div className="space-y-3">
        {aiAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer',
              alert.severity === 'high'
                ? 'bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10'
                : 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-2 h-2 rounded-full mt-1.5 animate-pulse',
                alert.severity === 'high' ? 'bg-rose-400' : 'bg-amber-400'
              )} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">
                    {alert.title}
                  </h3>
                  {alert.severity === 'high' && (
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  {alert.description}
                </p>
                <span className="text-xs text-slate-500">
                  {alert.timestamp}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors duration-200">
        View All Alerts
      </button>
    </div>
  )
}
