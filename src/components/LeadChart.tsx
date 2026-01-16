"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Yahan hum light aur pleasing colors define kar rahe hain
const chartConfig = {
  value: {
    label: "Leads",
    color: "#6366f1", // Indigo-500 (Professional Light Blue/Purple)
  },
} satisfies ChartConfig;

export default function LeadChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-slate-800">Leads Distribution</CardTitle>
        <CardDescription>Visual representation of leads across different stages</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            {/* Horizontal lines ko aur light kar diya */}
            <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
            
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <YAxis 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <ChartTooltip 
              cursor={{ fill: '#f1f5f9' }} // Hover karne par light gray background
              content={<ChartTooltipContent hideLabel />} 
            />

            <Bar 
              dataKey="value" 
              fill="var(--color-value)" 
              radius={[6, 6, 0, 0]} // Round corners for soft look
              barSize={45}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}