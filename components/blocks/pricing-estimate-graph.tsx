"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import type {
  ValueType,
  NameType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";

// Define data structure for the horizontal stacked bar chart
interface PricingChartData {
  id: string; // e.g., 'chatgpt'
  service: string;
  tier1Name: string;
  tier1Price: number; // Base tier price / OnlyPrompt max price
  tier2Name?: string;
  tier2Price?: number; // Absolute price of the higher tier
  tier2Increment?: number; // Calculated increment for stacking
  priceRange?: [number, number]; // For OnlyPrompt display
}

// Prepare data: Calculate increments for stacking
const rawData: Omit<PricingChartData, 'tier2Increment'>[] = [
  {
    id: "chatgpt",
    service: "ChatGPT",
    tier1Name: "Plus",
    tier1Price: 20,
    tier2Name: "Team",
    tier2Price: 200,
  },
  {
    id: "claude",
    service: "Claude",
    tier1Name: "Pro",
    tier1Price: 20,
    tier2Name: "Scale",
    tier2Price: 100,
  },
  {
    id: "onlyprompt",
    service: "OnlyPrompt",
    tier1Name: "Usage",
    tier1Price: 10, // Represents the max $10 for the bar height
    priceRange: [5, 10],
  },
];

const chartData: PricingChartData[] = rawData.map((item) => ({
  ...item,
  // Calculate the increment needed for the second stacked bar
  tier2Increment: item.tier2Price ? item.tier2Price - item.tier1Price : undefined,
}));

// Colors for Tiers (Updated)
const TIER1_COLOR = "#f87171"; // Mild Red (red-400)
const TIER2_COLOR = "#dc2626"; // Darker Red (red-600)
const ONLYPROMPT_COLOR = "#22c55e"; // Green (green-500)

// Base color map (only OnlyPrompt needed if Tier1 is always red)
const BASE_COLORS: { [key: string]: string } = {
  chatgpt: TIER1_COLOR,
  claude: TIER1_COLOR,
  onlyprompt: ONLYPROMPT_COLOR,
};
// Darker color map (only needed for services with Tier 2)
const DARKER_COLORS: { [key: string]: string } = {
  chatgpt: TIER2_COLOR,
  claude: TIER2_COLOR,
};

// Custom Tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: PricingChartData; // The data for the whole bar
    value: ValueType; // Value of the specific segment hovered
    name: NameType; // Name of the dataKey ('tier1Price' or 'tier2Increment')
    // ... other potential props
  }>;
  label?: string | number; // The service name (Y-axis label)
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Full data for the service bar
    const segmentName = payload[0].name; // 'tier1Price' or 'tier2Increment'

    let tierDisplay = "";
    let priceDisplay = "";

    if (data.service === "OnlyPrompt") {
        tierDisplay = "Usage-Based";
        priceDisplay = `$${data.priceRange?.[0]} - $${data.priceRange?.[1]} / mo`;
    } else if (segmentName === 'tier1Price') {
        tierDisplay = data.tier1Name || "Base";
        priceDisplay = `$${data.tier1Price} / mo`;
    } else if (segmentName === 'tier2Increment' && data.tier2Increment !== undefined) {
        tierDisplay = data.tier2Name || "Higher Tier";
        priceDisplay = `$${data.tier2Price} / mo (+$${data.tier2Increment})`; // Show total and increment
    } else {
        return null; // Don't show for empty segments
    }


    return (
      <div className="bg-gray-900/80 backdrop-blur-sm text-white p-3 border border-gray-700 shadow-lg min-w-[150px]">
        <p className="font-semibold text-base mb-1">{`${data.service}`}</p>
        <p className="text-sm text-gray-300">{`Tier: ${tierDisplay}`}</p>
        <p className="text-lg font-medium mt-1">{`Cost: ${priceDisplay}`}</p>
      </div>
    );
  }
  return null;
};

// Define a simple type for our custom legend payload items
interface LegendItem {
    value: string;
    type: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye'; // Use literal types allowed by Recharts
    id: string;
    color: string;
}

// Custom Legend Payload using the simple type (Updated Colors/Descriptions)
const legendPayload: LegendItem[] = [
    { value: 'Base Tier', type: 'square', id: 'tier1', color: TIER1_COLOR },
    { value: 'Higher Tier', type: 'square', id: 'tier2', color: TIER2_COLOR },
    { value: 'OnlyPrompt (Usage)', type: 'square', id: 'onlyprompt', color: ONLYPROMPT_COLOR },
];

export default function PricingEstimateGraph() {
  return (
    <div className="w-full bg-gray-950 p-6 border border-white/10 text-white font-sans">
       <h3 className="text-lg font-semibold mb-1 text-gray-300">Estimated Monthly AI Costs</h3>
       <p className="text-sm text-gray-500 mb-6">Comparison of typical subscription tiers.</p>
      <div style={{ width: '100%', height: 250 }}> {/* Adjust height as needed */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{
              top: 0,
              right: 30, // Space for potential labels
              left: 20,  // Space for Y-axis labels
              bottom: 20, // Space for legend
            }}
            barSize={35} // Adjust bar thickness
          >
            <CartesianGrid
               stroke="#37415150"
               horizontal={true}
               vertical={true}
            />
            {/* Configure X-axis (Price) */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a0a0a0", fontSize: 10 }}
              ticks={[20, 100, 200, 300]} // Keep specified ticks (user removed 0)
              domain={[0, 300]}
              tickFormatter={(value) => `$${value}`}
              orientation="top"
              interval={0}
            />
            <YAxis
              type="category"
              dataKey="service"
              axisLine={false}
              tickLine={false}
              // Use a function for the tick prop to apply conditional styling
              tick={({ x, y, payload }) => {
                const serviceName = payload.value;
                const isOnlyPrompt = serviceName === 'OnlyPrompt';
                const defaultClasses = "fill-[#d1d5db]"; // Default fill class
                const defaultFontSize = 14;
                const onlyPromptClasses = "font-bold fill-[#05df72]"; // Use fill class here too

                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dx={-10} // Keep original offset
                      dy={defaultFontSize / 3} // Adjust vertical alignment
                      textAnchor="end"
                      fontSize={defaultFontSize}
                      className={isOnlyPrompt ? onlyPromptClasses : defaultClasses}
                    >
                      {serviceName}
                    </text>
                  </g>
                );
              }}
              width={100} // Adjust width for service names
            />
            {/* Tooltip component removed */}

            {/* Legend using the custom-typed payload */}
            <Legend verticalAlign="top" height={24} payload={legendPayload} iconSize={10} wrapperStyle={{ fontSize: '12px' }}/>

            {/* Base Tier / OnlyPrompt Bar */}
            <Bar dataKey="tier1Price" stackId="a" >
                 {chartData.map((entry) => (
                    <Cell key={`cell-tier1-${entry.id}`} fill={BASE_COLORS[entry.id]} />
                 ))}
                 {/* Label for the total value at the end of the bar */}
                 <LabelList
                     dataKey="tier2Price" // Show total price of highest tier
                     position="right"
                     offset={10}
                     fill="#e5e7eb"
                     fontSize={12}
                     formatter={(value: number, entry: PricingChartData) => {
                         if (!entry) {
                             return null;
                         }
                         if (entry.service === 'OnlyPrompt') return `$${entry.tier1Price}`; // Show max price for OnlyPrompt
                         if (entry.tier2Price) return `$${entry.tier2Price}`; // Show total for stacked
                         return `$${entry.tier1Price}`; // Show base if no tier2
                     }}
                 />
            </Bar>

            {/* Tier 2 Increment Bar */}
            <Bar dataKey="tier2Increment" stackId="a" >
                 {chartData.map((entry) => (
                    <Cell key={`cell-tier2-${entry.id}`} fill={entry.tier2Increment ? DARKER_COLORS[entry.id] : 'transparent'} />
                 ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 