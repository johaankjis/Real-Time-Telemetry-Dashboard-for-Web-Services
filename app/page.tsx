"use client"

import { useEffect } from "react"
import { MetricCard } from "@/components/metric-card"
import { StatusIndicator } from "@/components/status-indicator"
import { ActivityFeed } from "@/components/activity-feed"
import { PerformanceChart } from "@/components/performance-chart"
import { SystemPerformanceTimeline } from "@/components/system-performance-timeline"
import { Activity, Clock, TrendingUp, Zap } from "lucide-react"
import { useTelemetryData } from "@/hooks/use-telemetry-data"

export default function DashboardPage() {
  const { data, isUpdating } = useTelemetryData(5000)

  useEffect(() => {
    // fetchData is now handled by the useTelemetryData hook
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Telemetry Dashboard</h1>
            <p className="text-muted-foreground">Real-time system monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 rounded-lg border bg-card px-3 py-2 transition-all ${isUpdating ? "border-primary/50 bg-primary/5" : ""}`}
            >
              <div className={`h-2 w-2 rounded-full ${isUpdating ? "bg-primary animate-pulse" : "bg-green-500"}`} />
              <span className="text-sm text-muted-foreground">{isUpdating ? "Updating..." : "Live"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{data.lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <StatusIndicator status={data.systemStatus} />

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Users"
            value={data.metrics.activeUsers.toLocaleString()}
            change="+12.5%"
            trend="up"
            icon={<Activity className="h-4 w-4" />}
          />
          <MetricCard
            title="Requests/min"
            value={data.metrics.requestsPerMin.toLocaleString()}
            change="+8.2%"
            trend="up"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <MetricCard
            title="Avg Response Time"
            value={`${data.metrics.avgResponseTime}ms`}
            change="-5.1%"
            trend="down"
            icon={<Zap className="h-4 w-4" />}
          />
          <MetricCard
            title="Error Rate"
            value={`${data.metrics.errorRate.toFixed(2)}%`}
            change="+0.3%"
            trend="up"
            icon={<Activity className="h-4 w-4" />}
          />
        </div>

        {/* System Performance Timeline */}
        <SystemPerformanceTimeline data={data.timelineData} />

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart data={data.performanceData} />
          </div>
          <div>
            <ActivityFeed activities={data.activities} />
          </div>
        </div>
      </div>
    </div>
  )
}
