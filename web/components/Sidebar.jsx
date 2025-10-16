'use client'

import { 
  LayoutDashboard, 
  AlertCircle, 
  Truck, 
  Building2, 
  BarChart3, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', current: true },
  { name: 'Incidents', icon: AlertCircle, href: '/incidents', current: false },
  { name: 'Ambulances', icon: Truck, href: '/ambulances', current: false },
  { name: 'Hospitals', icon: Building2, href: '/hospitals', current: false },
  { name: 'Analytics', icon: BarChart3, href: '/analytics', current: false },
  { name: 'Notifications', icon: Bell, href: '/notifications', current: false },
  { name: 'Settings', icon: Settings, href: '/settings', current: false },
]

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState(null)
  const { user, logout } = useAuth()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center glow-blue">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">Emergency</h1>
            <p className="text-xs text-slate-400">Dispatch AI</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = item.current
          const isHovered = hoveredItem === item.name

          return (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
              )}
              
              <Icon className={cn(
                'w-5 h-5 transition-all duration-200',
                isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'
              )} />
              
              <span>{item.name}</span>

              {/* Hover glow effect */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent rounded-xl" />
              )}
            </a>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer - System Status */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">System Online</span>
          </div>
          <p className="text-xs text-slate-500">All systems operational</p>
        </div>
      </div>
    </div>
  )
}
