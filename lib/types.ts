// Telemetry data types
export interface TelemetryMetric {
  id: string
  timestamp: Date
  service_name: string
  endpoint: string
  method: string
  status_code: number
  latency_ms: number
  error_message?: string
}

export interface ServiceHealth {
  service_name: string
  status: "healthy" | "degraded" | "down"
  uptime_percentage: number
  avg_latency_ms: number
  error_rate: number
  last_check: Date
}

export interface Alert {
  id: string
  name: string
  condition: string
  threshold: number
  severity: "critical" | "warning" | "info"
  enabled: boolean
  triggered: boolean
  last_triggered?: Date
}

export interface TimeSeriesData {
  timestamp: Date
  value: number
}

export interface DashboardStats {
  total_requests: number
  avg_latency_ms: number
  error_rate: number
  active_services: number
}
