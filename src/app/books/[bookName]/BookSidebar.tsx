"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Waypoints } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  name: string;
  sections: string[];
};

export function BookSideBar({ name, sections }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="p-2 border-r w-64 h-[calc(100svh-4rem-1px)]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full text-left">
            <Waypoints className="h-5 w-5" />
            <div className="flex-grow">Section</div>
            {isOpen ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-5 pl-2 border-l">
          {sections.map((sectionName) => (
            <Button
              key={sectionName}
              variant="ghost"
              className="w-full text-left"
              onClick={() => {
                router.push(`/books/${name}/${sectionName}`);
              }}
            >
              <div className="flex-grow">{sectionName}</div>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
