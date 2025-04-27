"use client";

import type React from "react";
import { Flex, FlexCol, FlexGroup, FlexRow } from "@/components/ui/flex";
import { DollarSign, Lock, FileText, Sparkles } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import type {
  ValueType,
  NameType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";
import PricingEstimateGraph from "./pricing-estimate-graph";
import { HoverButton } from "../hover-button";

// Define chart data structure for stacking
interface StackedChartData {
  id: string; // Unique ID for keys ('chatgpt', 'claude', etc.)
  service: string;
  basePrice: number; // Base tier price (or max price for OnlyPrompt visualization)
  tier2Increment?: number; // Additional cost for the higher tier
  priceRange?: [number, number]; // Only for OnlyPrompt
  tier1Name?: string; // e.g., 'Plus', 'Pro'
  tier2Name?: string; // e.g., 'Team', 'Scale'
}

// Filter out Perplexity
const chartDataAll: StackedChartData[] = [
  {
    id: "chatgpt",
    service: "ChatGPT",
    tier1Name: "Plus",
    basePrice: 20,
    tier2Name: "Team",
    tier2Increment: 180, // 200 total
  },
  {
    id: "claude",
    service: "Claude",
    tier1Name: "Pro",
    basePrice: 20,
    tier2Name: "Scale",
    tier2Increment: 80, // 100 total
  },
  {
    id: "onlyprompt",
    service: "OnlyPrompt",
    tier1Name: "Usage", // Represent as a single tier
    basePrice: 10, // Visual height represents max price
    priceRange: [5, 10],
  },
];

// Base Colors and Darker Shades for Stacks
const BASE_COLORS: { [key: string]: string } = {
  chatgpt: "#3b82f6", // Blue
  claude: "#a855f7", // Purple
  onlyprompt: "#f97316", // Orange
};

const DARKER_COLORS: { [key: string]: string } = {
  chatgpt: "#2563eb", // Darker Blue
  claude: "#7e22ce", // Darker Purple
};

// Define a more specific type for the tooltip payload item
interface TooltipPayloadItem {
  payload: StackedChartData; // Expecting our data structure here
  value: ValueType;
  name: NameType;
  dataKey: string;
  color?: string; // Optional properties that might be present
  fill?: string;
  stroke?: string;
  // ... other potential properties from Recharts payload
}

// Custom Tooltip component - Refined logic for segment-specific info
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[]; // Use the more specific payload item type
  label?: string | number; // label is the service name from XAxis
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  // Find the full data entry for the service using the label
  const serviceData = chartDataAll.find(item => item.service === label);

  if (active && payload && payload.length && serviceData) {
    // payload[0] relates to the specific segment being hovered
    const segmentPayload = payload[0];
    const hoveredDataKey = segmentPayload.dataKey as keyof StackedChartData; // 'basePrice' or 'tier2Increment'
    const segmentValue = segmentPayload.value as number; // The value of the hovered segment

    // Don't show tooltip for segments with zero/undefined value (like tier2Increment for OnlyPrompt)
    if (segmentValue === undefined || segmentValue === null || segmentValue === 0) {
        return null;
    }

    let priceDisplay: string;
    let tierDisplay: string;

    if (serviceData.service === "OnlyPrompt") {
      // OnlyPrompt Case (should only trigger when hovering its bar)
      priceDisplay = `$${serviceData.priceRange?.[0]} - $${serviceData.priceRange?.[1]}`;
      tierDisplay = serviceData.tier1Name || "Usage-Based";
    } else if (hoveredDataKey === 'basePrice') {
        // Hovering Base Segment
        priceDisplay = `$${serviceData.basePrice}`;
        tierDisplay = serviceData.tier1Name || "Base";
    } else if (hoveredDataKey === 'tier2Increment' && serviceData.tier2Increment !== undefined) {
        // Hovering Tier 2 Increment Segment
        priceDisplay = `+$${serviceData.tier2Increment}`; // Show the increment value
        tierDisplay = serviceData.tier2Name || "Higher Tier";
    } else {
        // Fallback: Should not happen with current data/logic, but good practice
        console.warn("Unexpected tooltip state:", { label, hoveredDataKey, serviceData });
        return null;
    }

    return (
      <div className="bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded border border-gray-700 shadow-lg min-w-[150px]">
        <p className="font-semibold text-base mb-1">{`${serviceData.service}`}</p>
        <p className="text-sm text-gray-300">{`Tier: ${tierDisplay}`}</p>
        <p className="text-lg font-medium mt-1">{`Cost: ${priceDisplay}/mo`}</p>
      </div>
    );
  }

  return null;
};

// Props for the component, including target refs
interface FutureOfAIProps {
  waitlistTargetRef: React.RefObject<HTMLElement>;
  pricingTargetRef: React.RefObject<HTMLElement>;
}

export default function FutureOfAI({ waitlistTargetRef, pricingTargetRef }: FutureOfAIProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 text-center">
      <Flex>
        <FlexGroup
          vertical={true}
          wrap={true}
          gap="4"
          gapX="2"
          gapY="6"
          justify="center"
          align="center"
        >
          <FlexRow>
            <p className="text-gray-400 italic uppercase">
              The Future of AI Chat
            </p>
          </FlexRow>
          <FlexRow>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase mb-8">
              Fair, Transparent, Never Overpriced
            </h3>
          </FlexRow>
        </FlexGroup>
      </Flex>
      <p className="max-w-3xl mx-auto text-lg text-gray-400 mb-12 font-sans">
        AI shouldn't feel like a{" "}
        <strong className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-red-400">
          gimmick
        </strong>{" "}
        or a{" "}
        <strong className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">
          gamble
        </strong>
        . Chatbots promise productivity. Most deliver sticker shock. Why pay
        monthly for{" "}
        <strong className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-blue-400">
          ChatGPT, Claude, Gemini, or any other AI
        </strong>{" "}
        you barely use? Why let your messages be anything other than{" "}
        <strong className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-purple-400">
          private, affordable, and under your control?
        </strong>
      </p>

      <div className="flex flex-col md:flex-row gap-12 items-start justify-center mb-12">
        {/* Left side: Value Propositions */}
        <div className="md:w-1/2 text-left">
          <h3 className="text-2xl font-semibold mb-6 uppercase bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400">
            Where OnlyPrompt Comes in
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-lg uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">
                  Pay Only For What You Use
                </strong>
                <br /> No bloated subscriptions. Your pricing adapts to your
                needs, not the other way around.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-lg uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-blue-400">
                  Total Privacy
                </strong>
                <br /> Your chats stay <em>your</em> chats—no reselling, no
                snooping, no compromise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-lg uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-purple-400">
                  Transparent, Honest Billing
                </strong>
                <br /> We show you <em>exactly</em> how your cost is calculated.
                No surprises, ever.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
              <span>
                <strong className="text-lg uppercase font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-yellow-400">
                  Fair By Design
                </strong>
                <br /> No "pro" upsells. World-class AI for everyone.
              </span>
            </li>
          </ul>
        </div>

        {/* Right side: Replace old chart with the new component */}
        <div className="md:w-1/2 w-full mt-8 md:mt-0 flex flex-col items-center">
          <PricingEstimateGraph />
        </div>
      </div>

      <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
        See the Difference—In Your Wallet and Your Workflow. While old-school
        chatbots charge you coffee money every week, OnlyPrompt keeps your AI
        bill smaller than your daily caffeine fix—
        <em>without sacrificing intelligence, privacy, or features</em>.
      </p>

      {/* Mini CTA */}
      <div className="py-6 px-12 w-1/2 mx-auto bg-muted/30 border border-border/50 inline-block">
        <h4 className="text-xl font-semibold mb-4">
          Ready for chat that's smart, secure, and sensibly priced?
        </h4>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <HoverButton
            className="px-6 py-2 bg-green-400 hover:bg-green-500 rounded-md text-black font-semibold transition-colors uppercase inline-block text-center"
            onClick={() => {
              if (waitlistTargetRef?.current) {
                waitlistTargetRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Join the waitlist
          </HoverButton>
          <HoverButton
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-semibold transition-colors uppercase inline-block text-center"
            onClick={() => {
              if (pricingTargetRef?.current) {
                pricingTargetRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore pricing
          </HoverButton>
        </div>
      </div>
    </div>
  );
}
