"use client"

import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

const chartData = [
  { month: "Jan", expense: 180, products: 90 },
  { month: "Feb", expense: 260, products: 120 },
  { month: "Mar", expense: 220, products: 110 },
  { month: "Apr", expense: 140, products: 150 },
  { month: "May", expense: 280, products: 170 },

]

export default function ChartArea() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense vs Products Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <Tooltip />

            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="url(#colorExpense)"
            />
            <Area
              type="monotone"
              dataKey="products"
              stroke="#3b82f6"
              fill="url(#colorProducts)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
