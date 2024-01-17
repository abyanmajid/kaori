"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  {
    average: 300,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 300,
    today: 980,
  },
  {
    
    average: 300,
    today: 390,
  },
  {
    average: 300,
    today: 480,
  },
  {
    average: 300,
    today: 380,
  },
  {
    average: 300,
    today: 430,
  },
]

export default function LineChartExample() {
  return (
        <div className="h-[250px] mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Today
                            </span>
                            <span className="font-bold">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <Line
                type="monotone"
                stroke="red"
                strokeWidth={2}
                dataKey="average"
                activeDot={{
                  r: 6,
                }}
                style={
                  {
                    opacity: 0.25,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="today"
                stroke="red"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
  )
}