"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  const isPositive = trend === "up"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {isPositive ? <ArrowUp className="h-3 w-3 text-green-500" /> : <ArrowDown className="h-3 w-3 text-red-500" />}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>{change}</span>
          <span>from last hour</span>
        </div>
      </CardContent>
    </Card>
  )
}
