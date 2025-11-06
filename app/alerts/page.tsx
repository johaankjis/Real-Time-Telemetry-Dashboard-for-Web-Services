"use client"

import { useEffect, useState } from "react"
import { AlertPanel } from "@/components/alert-panel"
import type { Alert } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/alerts")
      const data = await res.json()
      setAlerts(data.data)
    } catch (error) {
      console.error("[v0] Error fetching alerts:", error)
    }
  }

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      await fetch("/api/alerts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      })
      await fetchAlerts()
    } catch (error) {
      console.error("[v0] Error updating alert:", error)
    }
  }

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alert Configuration</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage alert rules and notifications</p>
          </div>
        </div>

        <AlertPanel alerts={alerts} onToggle={handleToggle} />
      </div>
    </div>
  )
}
