"use client";
import { forwardRef, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { REGION } from "@/data";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/utils";
import { Textarea } from "@/components/ui/textarea";
import { saveFormData } from "./formData";
import { saveWord, WordFormData } from "@/features/wordFormData";

type Props = {
  className?: string;
  formData: WordFormData;
  word: string;
  onHoverChange?: (word: string | undefined) => void;
};

// used to enforce tailwindcss JIT to generate the required classes
[
  "border-[var(--region-1)]",
  "border-[var(--region-2)]",
  "border-[var(--region-3)]",
  "border-[var(--region-4)]",
  "border-[var(--region-5)]",
  "border-[var(--region-6)]",
  "border-[var(--region-7)]",
  "border-[var(--region-8)]",
  "data-[state=on]:bg-[var(--region-1)]",
  "data-[state=on]:bg-[var(--region-2)]",
  "data-[state=on]:bg-[var(--region-3)]",
  "data-[state=on]:bg-[var(--region-4)]",
  "data-[state=on]:bg-[var(--region-5)]",
  "data-[state=on]:bg-[var(--region-6)]",
  "data-[state=on]:bg-[var(--region-7)]",
  "data-[state=on]:bg-[var(--region-8)]",
];

export const WordForm = forwardRef<HTMLFormElement, Props>(function (
  { className, formData, word, onHoverChange },
  ref
) {
  const { note, selectedRegions } = formData;
  const hoverNodeRef = useRef<string | undefined>();

  return (
    <Card className={cn("h-full ml-[45px] pt-6", className)}>
      <CardContent>
        <form ref={ref}>
          <div className="grid items-center gap-3">
            <ToggleGroup
              className="flex-wrap justify-start"
              type="multiple"
              value={selectedRegions}
              onValueChange={(value) => {
                saveWord(word, { ...formData, selectedRegions: value });
              }}
            >
              {REGION.map(({ id, color }) => (
                <ToggleGroupItem
                  className={`border-[${color}] border data-[state=on]:text-white data-[state=on]:bg-[${color}]`}
                  key={id}
                  value={id}
                  aria-label={id}
                  onMouseEnter={() => {
                    hoverNodeRef.current = id;
                    onHoverChange?.(id);
                  }}
                  onMouseLeave={() => {
                    hoverNodeRef.current = undefined;
                    onHoverChange?.(undefined);
                  }}
                >
                  {id}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note">Note</Label>
              <Textarea
                name="note"
                value={note}
                placeholder="Put your note here."
                onChange={() => {
                  const formElement = (ref as any).current as HTMLFormElement;
                  saveFormData(formElement, word);
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
});
