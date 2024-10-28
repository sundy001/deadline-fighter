"use client";
import Highlighter from "react-highlight-words";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/utils";
import { AtlasPreviewButton } from "./AtlasPreviewButton";
import { type AtlasResult } from "@/scanner";
import { atlasLinks } from "@/features/atlasData";

type Props = {
  className?: string;
  atlasResult: AtlasResult[];
  word: string;
  selectedIndexes: number[];
  setSelectedIndexes: Dispatch<SetStateAction<number[]>>;
};

export function AtlasSearchResult({ className, atlasResult, word }: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {atlasResult.map(({ line }, index) => (
        <AtlasPreviewButton key={index} link={atlasLinks[index]}>
          <Highlighter
            highlightClassName="bg-yellow-200"
            searchWords={[word]}
            autoEscape={true}
            textToHighlight={line}
          />
        </AtlasPreviewButton>
      ))}
    </div>
  );
}
