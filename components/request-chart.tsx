"use client"

import { Card } from "@/components/ui/card"
import type { TimeSeriesData } from "@/lib/types"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RequestChartProps {
  data: TimeSeriesData[]
}

export function RequestChart({ data }: RequestChartProps) {
  const chartData = data.map((d) => ({
    time: new Date(d.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    requests: Math.round(d.value),
  }))

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Request Throughput</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
            label={{ value: "req/min", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
          <Area type="monotone" dataKey="requests" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
