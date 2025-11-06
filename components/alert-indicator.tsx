"use client"

import { useEffect, useState } from "react"
import type { Alert } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import Link from "next/link"

export function AlertIndicator() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [triggeredCount, setTriggeredCount] = useState(0)

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/alerts")
      const data = await res.json()
      setAlerts(data.data)
      setTriggeredCount(data.data.filter((a: Alert) => a.triggered && a.enabled).length)
    } catch (error) {
      console.error("[v0] Error fetching alerts:", error)
    }
  }

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link href="/alerts">
      <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-secondary/50 transition-colors cursor-pointer">
        <Bell className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-card-foreground">Alerts</span>
        {triggeredCount > 0 && (
          <Badge variant="destructive" className="h-5 min-w-5 flex items-center justify-center p-1">
            {triggeredCount}
          </Badge>
        )}
      </div>
    </Link>
  )
}
