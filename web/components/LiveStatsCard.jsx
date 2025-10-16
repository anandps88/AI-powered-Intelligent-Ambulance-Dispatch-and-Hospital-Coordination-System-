'use client'

import { useState, useEffect } from 'react'
import { dashboardAPI } from '@/lib/api'
import { TrendingUp, Clock, Truck, Building2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LiveStatsCard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await dashboardAPI.getStats()
        
        if (response.success) {
          setStats(response.data)
        } else {
          setError('Failed to load statistics')
        }
      } catch (err) {
        console.error('Error fetching stats:', err)
        setError('Unable to connect to server')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const statsConfig = stats ? [
    {
      label: 'Active Ambulances',
      value: stats.activeAmbulances,
      icon: Truck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      label: 'Pending Incidents',
      value: stats.pendingIncidents,
      icon: TrendingUp,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
    },
    {
      label: 'Available Hospitals',
      value: stats.availableHospitals,
      icon: Building2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Avg Response Time',
      value: stats.avgResponseTime,
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
  ] : []

  if (loading) {
    return (
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-center h-64 text-rose-400">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Live Statistics</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">Real-time</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
