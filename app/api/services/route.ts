import { NextResponse } from "next/server"
import { calculateServiceHealth } from "@/lib/mock-data"

export async function GET() {
  const services = calculateServiceHealth()
  return NextResponse.json({ data: services })
}
