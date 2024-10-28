"use client";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setIsArchive } from "@/features/localStorage/localStorage";

type Props = {
  word: string;
  refresh: () => void;
};

export function ArchiveButton({ word, refresh }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        setIsArchive(word, true);
        refresh();
      }}
    >
      <Archive className="h-5 w-5" />
    </Button>
  );
}
