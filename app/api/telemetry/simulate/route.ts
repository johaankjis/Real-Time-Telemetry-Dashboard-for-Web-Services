import { NextResponse } from "next/server"
import { telemetryData, generateMockTelemetry } from "@/lib/mock-data"

// POST /api/telemetry/simulate - Generate mock telemetry data
export async function POST() {
  const metric = generateMockTelemetry()
  telemetryData.push(metric)

  // Keep only last 1000 metrics
  if (telemetryData.length > 1000) {
    telemetryData.shift()
  }

  return NextResponse.json({ success: true, metric })
}
