"use client";
import { forwardRef, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { REGION } from "@/data";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/utils";
import { Textarea } from "@/components/ui/textarea";
import { loadWord } from "@/features/localStorage";
import { saveFormData } from "./formData";
import { WordFormData } from "@/features/localStorage/localStorage";

type Props = {
  className?: string;
  word: string;
  formData: WordFormData;
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
];

export const WordForm = forwardRef<HTMLFormElement, Props>(function (
  { className, word, formData, onHoverChange },
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
              defaultValue={selectedRegions}
            >
              {REGION.map(({ id, color }) => (
                <ToggleGroupItem
                  className={`border-[${color}] border`}
                  key={id}
                  value={id}
                  aria-label={id}
                  onClick={() => {
                    setTimeout(() => {
                      const formElement = (ref as any)
                        .current as HTMLFormElement;
                      saveFormData(formElement, word);
                    }, 0);
                  }}
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
                defaultValue={note}
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
