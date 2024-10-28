"use client";
import { ReactNode, useState } from "react";
import { getAtlasHTML } from "@/features/atlas/getAtlasHTML";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  link: string;
  children: ReactNode;
};

export function AtlasPreviewButton({ children, link }: Props) {
  const [atlasHTML, setAtlasHTML] = useState<string>();

  return (
    <Popover>
      <PopoverTrigger
        className="flex justify-start text-left flex-grow hover:bg-gray-100 rounded p-2"
        onClick={async () => {
          const html = await getAtlasHTML(link);
          if (!html) {
            console.error(`Failed to fetch atlas HTML from ${link}`);
          }
          setAtlasHTML(html);
        }}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-96 h-96 overflow-scroll" side="right">
        <div
          onClick={(event) => {
            event.preventDefault();
            const element = event.target as HTMLElement;
            if (element.tagName === "IMG") {
              const src = element.getAttribute("src")!;
              open(src, "_blank");
            }
          }}
          dangerouslySetInnerHTML={{ __html: atlasHTML! }}
        ></div>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}
