"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data for price trends
const priceData = [
  { month: "Jan", price: 12500 },
  { month: "Feb", price: 12700 },
  { month: "Mar", price: 13000 },
  { month: "Apr", price: 13200 },
  { month: "May", price: 13500 },
  { month: "Jun", price: 13800 },
  { month: "Jul", price: 14000 },
  { month: "Aug", price: 14200 },
  { month: "Sep", price: 14500 },
  { month: "Oct", price: 14800 },
  { month: "Nov", price: 15000 },
  { month: "Dec", price: 15200 },
]

// Sample data for forecast
const forecastData = [
  { month: "Jan", actual: 15200, forecast: 15200 },
  { month: "Feb", actual: 15400, forecast: 15400 },
  { month: "Mar", actual: 15600, forecast: 15600 },
  { month: "Apr", actual: null, forecast: 15800 },
  { month: "May", actual: null, forecast: 16000 },
  { month: "Jun", actual: null, forecast: 16200 },
]

export function MarketTrendsMini() {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-medium">Price Trend & Forecast</h4>
        <span className="text-xs text-green-500">+8.2% YoY</span>
      </div>
      <div className="h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis
              domain={[15000, 16500]}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
            />
            <Tooltip
              formatter={(value) => [`₹${value}`, "Price per sq.ft"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#4ecdc4"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#ff6b6b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#4ecdc4] rounded-full mr-1"></div>
          <span>Actual</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#ff6b6b] rounded-full mr-1"></div>
          <span>Forecast</span>
        </div>
      </div>
    </div>
  )
}
