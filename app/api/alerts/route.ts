import { type NextRequest, NextResponse } from "next/server"
import { alerts } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: alerts })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, enabled } = body

    const alert = alerts.find((a) => a.id === id)
    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    alert.enabled = enabled

    return NextResponse.json({ success: true, alert })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
