import { useEffect, useState } from "react";
import { OCRResultViewer } from "./OCRResultViewer";
import { getWordOverlay } from "../WordDialog/getWordOverlay";
import { type PageReport } from "@/scanner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  word: string;
  bookName: string;
  sectionName: string;
  onRequestClose: () => void;
};
export function OCRResultDialog({
  word,
  bookName,
  sectionName,
  onRequestClose,
}: Props) {
  const [pages, setPages] = useState<PageReport[]>();
  useEffect(() => {
    (async () => {
      const pages = await getWordOverlay(word, bookName, sectionName);
      setPages(pages);
    })();
  }, []);
  if (pages === undefined) {
    return null;
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onRequestClose();
        }
      }}
    >
      <DialogContent className="max-w-[70rem]">
        <DialogHeader>
          <DialogTitle>{word} OCR Result Viewer</DialogTitle>
          <DialogDescription className="hidden">
            word found in which page
          </DialogDescription>
        </DialogHeader>
        <OCRResultViewer
          bookName={bookName}
          sectionName={sectionName}
          pages={pages}
          word={word}
        />
      </DialogContent>
    </Dialog>
  );
}
