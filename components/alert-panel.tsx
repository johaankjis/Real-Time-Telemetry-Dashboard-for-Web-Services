"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import type { Alert } from "@/lib/types"
import { AlertCircle, AlertTriangle, Info, Bell } from "lucide-react"

interface AlertPanelProps {
  alerts: Alert[]
  onToggle: (id: string, enabled: boolean) => void
}

export function AlertPanel({ alerts, onToggle }: AlertPanelProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "info":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Alert Rules</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {alerts.filter((a) => a.enabled).length} Active
        </Badge>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start justify-between p-4 rounded-lg border ${
              alert.triggered ? "bg-destructive/5 border-destructive/20" : "bg-secondary/50 border-border"
            }`}
          >
            <div className="flex items-start gap-3 flex-1">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-card-foreground">{alert.name}</p>
                  <Badge className={getSeverityColor(alert.severity)} variant="outline">
                    {alert.severity}
                  </Badge>
                  {alert.triggered && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      Triggered
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{alert.condition}</p>
                {alert.last_triggered && (
                  <p className="text-xs text-muted-foreground">
                    Last triggered: {new Date(alert.last_triggered).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <Switch checked={alert.enabled} onCheckedChange={(checked) => onToggle(alert.id, checked)} />
          </div>
        ))}
      </div>
    </Card>
  )
}
