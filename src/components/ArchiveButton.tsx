"use client";
import { Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setIsArchive, useWordFormStore } from "@/features/wordFormData";
import { type ComponentProps } from "react";

type Props = {
  word: string;
  variant?: ComponentProps<typeof Button>["variant"];
  showText?: boolean;
};

export function ArchiveButton({ word, variant, showText }: Props) {
  const { isArchived } = useWordFormStore(word);
  return (
    <Button
      variant={variant}
      onClick={() => {
        setIsArchive(word, !isArchived);
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
