import type { TelemetryMetric, ServiceHealth, Alert } from "./types"

// In-memory storage for telemetry data
export const telemetryData: TelemetryMetric[] = []
export const alerts: Alert[] = [
  {
    id: "1",
    name: "High Latency Alert",
    condition: "avg_latency > 500ms",
    threshold: 500,
    severity: "warning",
    enabled: true,
    triggered: false,
  },
  {
    id: "2",
    name: "Error Rate Alert",
    condition: "error_rate > 5%",
    threshold: 5,
    severity: "critical",
    enabled: true,
    triggered: false,
  },
  {
    id: "3",
    name: "Service Down Alert",
    condition: "uptime < 95%",
    threshold: 95,
    severity: "critical",
    enabled: true,
    triggered: false,
  },
]

// Generate mock telemetry data
export function generateMockTelemetry(): TelemetryMetric {
  const services = ["api-gateway", "auth-service", "payment-service", "user-service"]
  const endpoints = ["/api/users", "/api/orders", "/api/products", "/api/auth"]
  const methods = ["GET", "POST", "PUT", "DELETE"]
  const statusCodes = [200, 201, 400, 404, 500, 503]

  const service = services[Math.floor(Math.random() * services.length)]
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)]
  const method = methods[Math.floor(Math.random() * methods.length)]
  const statusCode = statusCodes[Math.floor(Math.random() * statusCodes.length)]
  const latency = Math.floor(Math.random() * 1000) + 50

  return {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: new Date(),
    service_name: service,
    endpoint,
    method,
    status_code: statusCode,
    latency_ms: latency,
    error_message: statusCode >= 400 ? `Error ${statusCode}` : undefined,
  }
}

// Initialize with some historical data
export function initializeMockData() {
  const now = Date.now()
  for (let i = 0; i < 100; i++) {
    const metric = generateMockTelemetry()
    metric.timestamp = new Date(now - (100 - i) * 60000) // Last 100 minutes
    telemetryData.push(metric)
  }
}

// Calculate service health
export function calculateServiceHealth(): ServiceHealth[] {
  const services = ["api-gateway", "auth-service", "payment-service", "user-service"]

  return services.map((service) => {
    const serviceMetrics = telemetryData.filter((m) => m.service_name === service)
    const totalRequests = serviceMetrics.length
    const errors = serviceMetrics.filter((m) => m.status_code >= 400).length
    const avgLatency = serviceMetrics.reduce((sum, m) => sum + m.latency_ms, 0) / totalRequests || 0
    const errorRate = (errors / totalRequests) * 100 || 0
    const uptime = 100 - errorRate

    let status: "healthy" | "degraded" | "down" = "healthy"
    if (uptime < 95) status = "down"
    else if (uptime < 99 || avgLatency > 500) status = "degraded"

    return {
      service_name: service,
      status,
      uptime_percentage: uptime,
      avg_latency_ms: avgLatency,
      error_rate: errorRate,
      last_check: new Date(),
    }
  })
}
