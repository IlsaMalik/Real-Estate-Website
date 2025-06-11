import * as React from "react"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("relative", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("relative", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipContentProps {
  payload: any[]
  label: string
}

function ChartTooltipContent({ payload, label }: ChartTooltipContentProps) {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-sm">
      <div className="mb-2 text-sm font-medium">{label}</div>
      <ul className="grid gap-1">
        {payload.map((item, index) => (
          <li key={index} className="grid grid-cols-[100px_1fr] items-center gap-2 text-xs">
            <span className="font-semibold">{item.dataKey}:</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props} />
  },
)
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps {
  name: string
  color: string
}

function ChartLegendItem({ name, color }: ChartLegendItemProps) {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span>{name}</span>
    </div>
  )
}

// Add ChartTooltip component
const ChartTooltip = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return <div ref={ref} {...props} />
})
ChartTooltip.displayName = "ChartTooltip"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }
