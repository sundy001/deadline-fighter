"use client";
import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";
import { useEffect, useState } from "react";
import { WordDialog } from "./WordDialog";
import { type AtlasResult } from "@/scanner";

type Props = {
  atlasResult: AtlasResult[];
  bookName: string;
  sectionName: string;
  word: string;
  refresh: () => void;
};

export function WordButton({
  atlasResult,
  bookName,
  sectionName,
  word,
  refresh,
}: Props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      refresh();
    }
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          setOpen(true);
        }}
      >
        <ListCollapse className="h-5 w-5" />
      </Button>
      {open && (
        <WordDialog
          atlasResult={atlasResult}
          bookName={bookName}
          sectionName={sectionName}
          word={word}
          onRequestClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
