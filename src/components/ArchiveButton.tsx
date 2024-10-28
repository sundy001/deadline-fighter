"use client";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { archiveWord } from "@/features/localStorage/localStorage";

type Props = {
  word: string;
};

export function ArchiveButton({ word }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        archiveWord(word);
      }}
    >
      <Archive className="h-5 w-5" />
    </Button>
  );
}
