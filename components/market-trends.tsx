"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts"
import Image from "next/image"

// More realistic price data
const priceData = [
  { month: "Jan", Delhi: 12500, Gurgaon: 11000, Noida: 9500 },
  { month: "Feb", Delhi: 12700, Gurgaon: 11200, Noida: 9600 },
  { month: "Mar", Delhi: 13000, Gurgaon: 11500, Noida: 9800 },
  { month: "Apr", Delhi: 13200, Gurgaon: 11700, Noida: 10000 },
  { month: "May", Delhi: 13500, Gurgaon: 12000, Noida: 10200 },
  { month: "Jun", Delhi: 13800, Gurgaon: 12300, Noida: 10500 },
  { month: "Jul", Delhi: 14000, Gurgaon: 12500, Noida: 10700 },
  { month: "Aug", Delhi: 14200, Gurgaon: 12700, Noida: 10900 },
  { month: "Sep", Delhi: 14500, Gurgaon: 13000, Noida: 11200 },
  { month: "Oct", Delhi: 14800, Gurgaon: 13300, Noida: 11500 },
  { month: "Nov", Delhi: 15000, Gurgaon: 13500, Noida: 11700 },
  { month: "Dec", Delhi: 15200, Gurgaon: 13800, Noida: 12000 },
]

const salesData = [
  { quarter: "Q1", "2022": 1200, "2023": 1500 },
  { quarter: "Q2", "2022": 1400, "2023": 1700 },
  { quarter: "Q3", "2022": 1100, "2023": 1600 },
  { quarter: "Q4", "2022": 1300, "2023": 1900 },
]

const inventoryData = [
  { category: "1 BHK", value: 25 },
  { category: "2 BHK", value: 40 },
  { category: "3 BHK", value: 30 },
  { category: "4+ BHK", value: 15 },
]

// New data for affordability index
const affordabilityData = [
  { year: "2018", index: 65 },
  { year: "2019", index: 68 },
  { year: "2020", index: 72 },
  { year: "2021", index: 69 },
  { year: "2022", index: 64 },
  { year: "2023", index: 60 },
]

// Forecast data
const forecastData = [
  { month: "Jan '23", actual: 15200, forecast: 15200 },
  { month: "Feb '23", actual: 15400, forecast: 15400 },
  { month: "Mar '23", actual: 15600, forecast: 15600 },
  { month: "Apr '23", actual: 15800, forecast: 15800 },
  { month: "May '23", actual: 16000, forecast: 16000 },
  { month: "Jun '23", actual: 16200, forecast: 16200 },
  { month: "Jul '23", actual: 16400, forecast: 16400 },
  { month: "Aug '23", actual: 16600, forecast: 16600 },
  { month: "Sep '23", actual: 16800, forecast: 16800 },
  { month: "Oct '23", actual: 17000, forecast: 17000 },
  { month: "Nov '23", actual: 17200, forecast: 17200 },
  { month: "Dec '23", actual: 17400, forecast: 17400 },
  { month: "Jan '24", actual: null, forecast: 17600 },
  { month: "Feb '24", actual: null, forecast: 17800 },
  { month: "Mar '24", actual: null, forecast: 18000 },
  { month: "Apr '24", actual: null, forecast: 18200 },
  { month: "May '24", actual: null, forecast: 18400 },
  { month: "Jun '24", actual: null, forecast: 18600 },
]

export function MarketTrends() {
  const [timeframe, setTimeframe] = useState("yearly")

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
          alt="Real Estate Background"
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>Delhi Real Estate Market Trends</CardTitle>
            <CardDescription>Average price per sq.ft in ₹</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <Tabs defaultValue="price">
          <TabsList className="mb-4">
            <TabsTrigger value="price">Price Trends</TabsTrigger>
            <TabsTrigger value="forecast">Price Forecast</TabsTrigger>
            <TabsTrigger value="sales">Sales Volume</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="price">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Delhi" stroke="#ff6b6b" strokeWidth={2} />
                  <Line type="monotone" dataKey="Gurgaon" stroke="#4ecdc4" strokeWidth={2} />
                  <Line type="monotone" dataKey="Noida" stroke="#f9d94c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="forecast">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[15000, 19000]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine x="Dec '23" stroke="#888" strokeDasharray="3 3" label="Current" />
                  <Line
                    type="monotone"
                    name="Historical Price"
                    dataKey="actual"
                    stroke="#4ecdc4"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    name="Forecast"
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
            <div className="text-center mt-4 text-sm text-gray-500">
              <p>AI-powered price forecast for the next 6 months</p>
              <p className="font-medium text-green-600">Projected growth: +7.2%</p>
            </div>
          </TabsContent>

          <TabsContent value="sales">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="2022" fill="#4ecdc4" />
                  <Bar dataKey="2023" fill="#ff6b6b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inventoryData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" fill="#f9d94c" stroke="#f9d94c" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
