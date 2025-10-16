'use client'

import { Truck, Plus, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const actions = [
  {
    id: 1,
    title: 'Dispatch Ambulance',
    description: 'Manually dispatch an ambulance to a location',
    icon: Truck,
    color: 'blue',
    bgGradient: 'from-blue-500 to-blue-600',
    hoverGlow: 'hover:shadow-blue-500/50',
  },
  {
    id: 2,
    title: 'Add Incident Manually',
    description: 'Create a new emergency incident',
    icon: Plus,
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-emerald-600',
    hoverGlow: 'hover:shadow-emerald-500/50',
  },
  {
    id: 3,
    title: 'Override AI Decision',
    description: 'Manually override AI routing decisions',
    icon: AlertTriangle,
    color: 'rose',
    bgGradient: 'from-rose-500 to-rose-600',
    hoverGlow: 'hover:shadow-rose-500/50',
  },
]

export default function QuickActions() {
  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
      
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'w-full p-4 rounded-xl bg-gradient-to-r',
                action.bgGradient,
                'hover:scale-[1.02] active:scale-[0.98]',
                'transition-all duration-200',
                'shadow-lg',
                action.hoverGlow,
                'group relative overflow-hidden'
              )}
            >
              {/* Animated background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-white/70">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
