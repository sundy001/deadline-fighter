"use client";
import { ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setIsArchive } from "@/features/localStorage/localStorage";

type Props = {
  word: string;
  refresh: () => void;
};

export function UnarchiveButton({ word, refresh }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        setIsArchive(word, false);
        refresh();
      }}
    >
      <ArchiveRestore className="h-5 w-5" />
    </Button>
  );
}
