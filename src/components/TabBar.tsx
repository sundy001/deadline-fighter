import { cn } from "@/utils";
import { useState } from "react";

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  items: string[];
};

export function TabBar({ className, value, onChange, items }: Props) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full",
        className
      )}
    >
      {items.map((item) => (
        <button
          onClick={() => {
            onChange(item);
          }}
          key={item}
          data-state={value === item ? "active" : "inactive"}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
