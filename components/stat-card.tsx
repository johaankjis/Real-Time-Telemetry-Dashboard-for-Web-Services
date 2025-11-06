import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  subtitle?: string
}

export function StatCard({ title, value, icon: Icon, trend, subtitle }: StatCardProps) {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-card-foreground">{value}</p>
            {trend && (
              <span className={`text-sm font-medium ${trend.isPositive ? "text-accent" : "text-destructive"}`}>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  )
}
