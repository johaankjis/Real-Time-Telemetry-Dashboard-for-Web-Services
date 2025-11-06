"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PerformanceChartProps {
  data: Array<{
    time: string
    cpu: number
    memory: number
    network: number
  }>
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" />
            <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="hsl(var(--chart-1))" strokeWidth={2} name="CPU %" dot={false} />
            <Line
              type="monotone"
              dataKey="memory"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Memory %"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="network"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Network %"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
