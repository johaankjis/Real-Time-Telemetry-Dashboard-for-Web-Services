import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ServiceHealth } from "@/lib/types"
import { Activity, AlertCircle, CheckCircle } from "lucide-react"

interface ServiceStatusProps {
  services: ServiceHealth[]
}

export function ServiceStatus({ services }: ServiceStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "down":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-accent/10 text-accent border-accent/20"
      case "degraded":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "down":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Service Health</h3>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.service_name} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {getStatusIcon(service.status)}
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{service.service_name}</p>
                <p className="text-xs text-muted-foreground">
                  {service.avg_latency_ms.toFixed(0)}ms avg • {service.uptime_percentage.toFixed(1)}% uptime
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(service.status)} variant="outline">
              {service.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
