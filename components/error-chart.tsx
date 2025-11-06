"use client"

import { Card } from "@/components/ui/card"
import type { TimeSeriesData } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ErrorChartProps {
  data: TimeSeriesData[]
}

export function ErrorChart({ data }: ErrorChartProps) {
  const chartData = data.map((d) => ({
    time: new Date(d.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    errors: Math.round(d.value * 100) / 100,
  }))

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Error Rate</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
            label={{ value: "%", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
          <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
