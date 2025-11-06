import { NextResponse } from "next/server"
import { telemetryData } from "@/lib/mock-data"
import type { DashboardStats } from "@/lib/types"

export async function GET() {
  const now = Date.now()
  const last5Minutes = telemetryData.filter((m) => now - m.timestamp.getTime() < 5 * 60 * 1000)

  const totalRequests = last5Minutes.length
  const errors = last5Minutes.filter((m) => m.status_code >= 400).length
  const avgLatency = last5Minutes.reduce((sum, m) => sum + m.latency_ms, 0) / totalRequests || 0
  const errorRate = (errors / totalRequests) * 100 || 0

  const services = new Set(last5Minutes.map((m) => m.service_name))

  const stats: DashboardStats = {
    total_requests: totalRequests,
    avg_latency_ms: Math.round(avgLatency),
    error_rate: Math.round(errorRate * 100) / 100,
    active_services: services.size,
  }

  return NextResponse.json(stats)
}
