import { type NextRequest, NextResponse } from "next/server"
import { telemetryData } from "@/lib/mock-data"
import type { TimeSeriesData } from "@/lib/types"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const metric = searchParams.get("metric") || "latency"
  const interval = Number.parseInt(searchParams.get("interval") || "60") // seconds

  const now = Date.now()
  const last30Minutes = telemetryData.filter((m) => now - m.timestamp.getTime() < 30 * 60 * 1000)

  // Group by time intervals
  const buckets = new Map<number, number[]>()

  last30Minutes.forEach((m) => {
    const bucketTime = Math.floor(m.timestamp.getTime() / (interval * 1000)) * (interval * 1000)

    if (!buckets.has(bucketTime)) {
      buckets.set(bucketTime, [])
    }

    if (metric === "latency") {
      buckets.get(bucketTime)!.push(m.latency_ms)
    } else if (metric === "errors") {
      buckets.get(bucketTime)!.push(m.status_code >= 400 ? 1 : 0)
    } else if (metric === "requests") {
      buckets.get(bucketTime)!.push(1)
    }
  })

  // Calculate averages/sums
  const timeseries: TimeSeriesData[] = Array.from(buckets.entries())
    .map(([timestamp, values]) => ({
      timestamp: new Date(timestamp),
      value: metric === "requests" ? values.length : values.reduce((a, b) => a + b, 0) / values.length,
    }))
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  return NextResponse.json({ data: timeseries })
}
