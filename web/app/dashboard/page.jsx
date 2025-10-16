'use client'

import AuthGuard from '@/components/AuthGuard'
import Sidebar from '@/components/Sidebar'
import TopHeader from '@/components/TopHeader'
import LiveStatsCard from '@/components/LiveStatsCard'
import AIAlertsCard from '@/components/AIAlertsCard'
import QuickActions from '@/components/QuickActions'
import IncidentTable from '@/components/IncidentTable'
import MapPanel from '@/components/MapPanel'

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 p-8">
          {/* Top Header */}
          <TopHeader />

          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Map Panel - Takes 2 columns on XL screens */}
            <div className="xl:col-span-2">
              <MapPanel />
            </div>

            {/* Right Column - Stats and Alerts */}
            <div className="space-y-6">
              <LiveStatsCard />
              <AIAlertsCard />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="xl:col-span-1">
              <QuickActions />
            </div>

            {/* Incident Table - Takes 2 columns */}
            <div className="xl:col-span-2">
              <IncidentTable />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
