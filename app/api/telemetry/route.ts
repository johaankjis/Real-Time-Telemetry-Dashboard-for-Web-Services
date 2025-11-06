import { type NextRequest, NextResponse } from "next/server"
import { telemetryData, initializeMockData } from "@/lib/mock-data"

// Initialize mock data on first load
if (telemetryData.length === 0) {
  initializeMockData()
}

// POST /api/telemetry - Ingest telemetry data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const metric = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      service_name: body.service_name,
      endpoint: body.endpoint,
      method: body.method,
      status_code: body.status_code,
      latency_ms: body.latency_ms,
      error_message: body.error_message,
    }

    telemetryData.push(metric)

    // Keep only last 1000 metrics
    if (telemetryData.length > 1000) {
      telemetryData.shift()
    }

    return NextResponse.json({ success: true, metric }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

// GET /api/telemetry - Query telemetry data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const service = searchParams.get("service")
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const since = searchParams.get("since")

  let filtered = [...telemetryData]

  if (service) {
    filtered = filtered.filter((m) => m.service_name === service)
  }

  if (since) {
    const sinceDate = new Date(since)
    filtered = filtered.filter((m) => m.timestamp >= sinceDate)
  }

  // Sort by timestamp descending
  filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  // Apply limit
  filtered = filtered.slice(0, limit)

  return NextResponse.json({ data: filtered, count: filtered.length })
}
