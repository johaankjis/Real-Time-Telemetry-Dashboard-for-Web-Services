"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

interface Activity {
  id: string
  type: "info" | "warning" | "error" | "success"
  message: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

const iconMap = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="mt-0.5">{iconMap[activity.type]}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-relaxed">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
