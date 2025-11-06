"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"

interface SystemPerformanceTimelineProps {
  data: Array<{
    time: string
    responseTime: number
    errorRate: number
    throughput: number
    cpu: number
    memory: number
  }>
}

type MetricType = "responseTime" | "errorRate" | "throughput" | "resources"

export function SystemPerformanceTimeline({ data }: SystemPerformanceTimelineProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("responseTime")

  const metricConfig = {
    responseTime: {
      title: "Response Time",
      description: "Average API response time over the last 24 hours",
      lines: [{ key: "responseTime", name: "Response Time (ms)", color: "hsl(var(--chart-1))" }],
    },
    errorRate: {
      title: "Error Rate",
      description: "System error rate percentage over time",
      lines: [{ key: "errorRate", name: "Error Rate (%)", color: "hsl(var(--chart-4))" }],
    },
    throughput: {
      title: "Throughput",
      description: "Requests processed per minute",
      lines: [{ key: "throughput", name: "Requests/min", color: "hsl(var(--chart-2))" }],
    },
    resources: {
      title: "System Resources",
      description: "CPU and memory utilization over time",
      lines: [
        { key: "cpu", name: "CPU %", color: "hsl(var(--chart-1))" },
        { key: "memory", name: "Memory %", color: "hsl(var(--chart-3))" },
      ],
    },
  }

  const config = metricConfig[selectedMetric]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric("responseTime")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedMetric === "responseTime"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Response
            </button>
            <button
              onClick={() => setSelectedMetric("errorRate")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedMetric === "errorRate"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Errors
            </button>
            <button
              onClick={() => setSelectedMetric("throughput")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedMetric === "throughput"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Throughput
            </button>
            <button
              onClick={() => setSelectedMetric("resources")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedMetric === "resources"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Resources
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend />
            {config.lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                name={line.name}
                dot={false}
                animationDuration={300}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
