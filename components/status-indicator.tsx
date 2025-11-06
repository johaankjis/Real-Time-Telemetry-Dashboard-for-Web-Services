"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface StatusIndicatorProps {
  status: "operational" | "degraded" | "down"
}

const statusConfig = {
  operational: {
    icon: CheckCircle,
    label: "All Systems Operational",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  degraded: {
    icon: AlertTriangle,
    label: "Degraded Performance",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  down: {
    icon: XCircle,
    label: "System Down",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className={`${config.borderColor} ${config.bgColor}`}>
      <CardContent className="flex items-center gap-3 p-4">
        <Icon className={`h-5 w-5 ${config.color}`} />
        <div className="flex-1">
          <h3 className="font-semibold">{config.label}</h3>
          <p className="text-sm text-muted-foreground">Last checked: {new Date().toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
