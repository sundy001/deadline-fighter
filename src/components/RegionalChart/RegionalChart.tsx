"use client";
import {
  CartesianGrid,
  LegendProps,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getRegionalData } from "./fetchRegionalData";
import { REGION } from "@/data";
import { cn } from "@/utils";

const chartConfig = REGION.map(({ id }) => ({
  label: id,
  color: id,
})) as unknown as ChartConfig;

type Props = {
  word: string;
  highlight?: string;
};

function CustomLayout({ payload, onClick }: LegendProps) {
  return !payload?.length ? null : (
    <div className="flex gap-3 ml-[35px]">
      {payload.map((item, index) => (
        <button
          className="flex gap-1 items-center"
          key={item.value}
          onClick={onClick ? (event) => onClick(item, index, event) : undefined}
        >
          <div className="w-2 h-2" style={{ background: item.color }}></div>{" "}
          {item.value}
        </button>
      ))}
    </div>
  );
}

export function RegionalChart({ word, highlight }: Props) {
  const [chartData, setChartData] = useState<Record<string, number>[]>([]);

  useEffect(() => {
    (async () => {
      setChartData([]);
      const regionalData = await getRegionalData(word);
      setChartData(regionalData);
    })();
  }, [word]);

  return (
    <ChartContainer className="min-h-[200px]" config={chartConfig}>
      <LineChart
        title="Regional Graph"
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="year" tickLine={false} axisLine={false} />
        <YAxis width={35} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<CustomLayout />} />
        {REGION.map(({ id, color }) => (
          <Line
            className={cn({ "opacity-20": highlight && id !== highlight })}
            key={id}
            dataKey={id}
            type="linear"
            stroke={color}
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
