"use client"

import { useState, useEffect, useCallback } from "react"

export interface TelemetryData {
  metrics: {
    activeUsers: number
    requestsPerMin: number
    avgResponseTime: number
    errorRate: number
  }
  systemStatus: "operational" | "degraded" | "down"
  activities: Array<{
    id: string
    type: "info" | "warning" | "error" | "success"
    message: string
    timestamp: string
  }>
  performanceData: Array<{
    time: string
    cpu: number
    memory: number
    network: number
  }>
  timelineData: Array<{
    time: string
    responseTime: number
    errorRate: number
    throughput: number
    cpu: number
    memory: number
  }>
  lastUpdated: Date
}

// Generate realistic random variations
const randomVariation = (base: number, variance: number) => {
  return Math.max(0, base + (Math.random() - 0.5) * variance)
}

const generateActivityMessage = (): { type: "info" | "warning" | "error" | "success"; message: string } => {
  const activities = [
    { type: "success" as const, message: "Deployment completed successfully" },
    { type: "info" as const, message: "New user registration detected" },
    { type: "warning" as const, message: "High memory usage detected on server-3" },
    { type: "error" as const, message: "API endpoint timeout on /api/data" },
    { type: "success" as const, message: "Cache cleared successfully" },
    { type: "info" as const, message: "Database backup completed" },
    { type: "warning" as const, message: "SSL certificate expires in 30 days" },
    { type: "success" as const, message: "Load balancer health check passed" },
  ]
  return activities[Math.floor(Math.random() * activities.length)]
}

export function useTelemetryData(updateInterval = 5000) {
  const [data, setData] = useState<TelemetryData>({
    metrics: {
      activeUsers: 1234,
      requestsPerMin: 8567,
      avgResponseTime: 245,
      errorRate: 0.12,
    },
    systemStatus: "operational",
    activities: [
      {
        id: "1",
        type: "success",
        message: "Deployment completed successfully",
        timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      },
      {
        id: "2",
        type: "warning",
        message: "High memory usage detected on server-3",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      },
      {
        id: "3",
        type: "info",
        message: "New user registration detected",
        timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
      },
    ],
    performanceData: Array.from({ length: 12 }, (_, i) => ({
      time: `${String(new Date().getHours() - 11 + i).padStart(2, "0")}:00`,
      cpu: randomVariation(65, 20),
      memory: randomVariation(72, 15),
      network: randomVariation(45, 25),
    })),
    timelineData: Array.from({ length: 24 }, (_, i) => ({
      time: `${String(new Date().getHours() - 23 + i).padStart(2, "0")}:00`,
      responseTime: randomVariation(245, 80),
      errorRate: randomVariation(0.12, 0.3),
      throughput: randomVariation(8567, 2000),
      cpu: randomVariation(65, 20),
      memory: randomVariation(72, 15),
    })),
    lastUpdated: new Date(),
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const updateData = useCallback(() => {
    setIsUpdating(true)

    setData((prev) => {
      const newMetrics = {
        activeUsers: Math.round(randomVariation(prev.metrics.activeUsers, 200)),
        requestsPerMin: Math.round(randomVariation(prev.metrics.requestsPerMin, 1000)),
        avgResponseTime: Math.round(randomVariation(prev.metrics.avgResponseTime, 50)),
        errorRate: Math.max(0, Math.min(5, randomVariation(prev.metrics.errorRate, 0.5))),
      }

      let systemStatus: "operational" | "degraded" | "down" = "operational"
      if (newMetrics.errorRate > 2 || newMetrics.avgResponseTime > 400) {
        systemStatus = "degraded"
      }
      if (newMetrics.errorRate > 4 || newMetrics.avgResponseTime > 600) {
        systemStatus = "down"
      }

      const newActivities = [...prev.activities]
      if (Math.random() > 0.7) {
        const newActivity = generateActivityMessage()
        newActivities.unshift({
          id: Date.now().toString(),
          ...newActivity,
          timestamp: new Date().toISOString(),
        })
        if (newActivities.length > 5) {
          newActivities.pop()
        }
      }

      const newPerformanceData = [...prev.performanceData.slice(1)]
      const now = new Date()
      newPerformanceData.push({
        time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
        cpu: Math.round(randomVariation(prev.performanceData[prev.performanceData.length - 1].cpu, 15)),
        memory: Math.round(randomVariation(prev.performanceData[prev.performanceData.length - 1].memory, 10)),
        network: Math.round(randomVariation(prev.performanceData[prev.performanceData.length - 1].network, 20)),
      })

      const newTimelineData = [...prev.timelineData.slice(1)]
      const lastTimeline = prev.timelineData[prev.timelineData.length - 1]
      newTimelineData.push({
        time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
        responseTime: Math.round(randomVariation(lastTimeline.responseTime, 40)),
        errorRate: Math.max(0, randomVariation(lastTimeline.errorRate, 0.2)),
        throughput: Math.round(randomVariation(lastTimeline.throughput, 1000)),
        cpu: Math.round(randomVariation(lastTimeline.cpu, 15)),
        memory: Math.round(randomVariation(lastTimeline.memory, 10)),
      })

      return {
        metrics: newMetrics,
        systemStatus,
        activities: newActivities,
        performanceData: newPerformanceData,
        timelineData: newTimelineData,
        lastUpdated: new Date(),
      }
    })

    setTimeout(() => setIsUpdating(false), 500)
  }, [])

  useEffect(() => {
    const interval = setInterval(updateData, updateInterval)
    return () => clearInterval(interval)
  }, [updateData, updateInterval])

  return { data, isUpdating }
}
