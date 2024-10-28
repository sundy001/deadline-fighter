"use client";
import { ArchiveButton } from "@/components/ArchiveButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtlasSearchResult } from "./AtlasSearchResult";
import { OCRResultDialog } from "../OCRResultViewer";
import { RegionalChart } from "../RegionalChart";
import { WordForm } from "./WordForm";
import { RegionalMap } from "../RegionalMap";
import { type AtlasResult } from "@/scanner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { loadWord } from "@/features/localStorage/localStorage";

type Props = {
  atlasResult: AtlasResult[];
  bookName: string;
  sectionName: string;
  word: string;
  onRequestClose: () => void;
  nextWord: () => void;
  previousWord: () => void;
};

export function WordDialog({
  atlasResult,
  bookName,
  sectionName,
  word,
  onRequestClose,
  nextWord,
  previousWord,
}: Props) {
  const formData = loadWord(word);
  const formRef = useRef<HTMLFormElement>(null);
  const [hoverRegion, setHoverRegion] = useState<string | undefined>();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isOCRDialogOpen, setIsOCRDialogOpen] = useState(false);

  return (
    <>
      <Dialog
        open={true}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            onRequestClose();
          }
        }}
      >
        <DialogContent className="flex flex-col h-full w-full max-w-[calc(100svw-8rem)] max-h-fit">
          <DialogHeader>
            <DialogTitle>{word}</DialogTitle>
            <DialogDescription className="hidden">
              word found in Atlas database
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Tabs
              className="flex-[1_1_33%] max-w-[435px] h-full flex flex-col"
              defaultValue="account"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="atlas">Atlas</TabsTrigger>
                <TabsTrigger value="note">Note</TabsTrigger>
              </TabsList>
              <TabsContent
                className="flex-grow h-1 max-h-full overflow-auto"
                value="atlas"
              >
                <AtlasSearchResult
                  atlasResult={atlasResult}
                  word={word}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                />
              </TabsContent>
              <TabsContent value="note"></TabsContent>
            </Tabs>
            <RegionalMap
              className="flex-[1_1_33%] max-w-[548px]"
              word={word}
              highlight={hoverRegion}
            />
            <div className="flex-auto flex flex-col gap-5">
              <div className="flex-shrink">
                <RegionalChart word={word} highlight={hoverRegion} />
              </div>
              <WordForm
                ref={formRef}
                word={word}
                formData={formData}
                onHoverChange={(word) => {
                  setHoverRegion(word);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setIsOCRDialogOpen(true);
              }}
            >
              Check Page
            </Button>
            <ArchiveButton
              word={word}
              variant="secondary"
              showText={true}
              refresh={() => {}}
            />
            <Button
              variant="secondary"
              onClick={() => {
                previousWord();
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                nextWord();
              }}
            >
              <ChevronRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isOCRDialogOpen && (
        <OCRResultDialog
          onRequestClose={() => {
            setIsOCRDialogOpen(false);
          }}
          bookName={bookName}
          sectionName={sectionName}
          word={word}
        />
      )}
    </>
  );
}
