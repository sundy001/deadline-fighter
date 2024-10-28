"use client";
import { Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadWord, setIsArchive } from "@/features/localStorage/localStorage";
import { type ComponentProps } from "react";

type Props = {
  word: string;
  variant?: ComponentProps<typeof Button>["variant"];
  showText?: boolean;
  refresh: () => void;
};

export function ArchiveButton({ word, variant, showText, refresh }: Props) {
  const { isArchived } = loadWord(word);
  return (
    <Button
      variant={variant}
      onClick={() => {
        setIsArchive(word, !isArchived);
        refresh();
      }}
    >
      {isArchived ? (
        <>
          {showText && "Unarchive"}
          <ArchiveRestore className="h-5 w-5" />
        </>
      ) : (
        <>
          {showText && "Archive"}
          <Archive className="h-5 w-5" />
        </>
      )}
    </Button>
  );
}
