"use client";
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
import { saveWord } from "@/features/localStorage";

type Props = {
  atlasResult: AtlasResult[];
  bookName: string;
  sectionName: string;
  word: string;
  onRequestClose: () => void;
};

export function WordDialog({
  onRequestClose,
  atlasResult,
  bookName,
  sectionName,
  word,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [hoverRegion, setHoverRegion] = useState<string | undefined>();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isOCRDialogOpen, setIsOCRDialogOpen] = useState(false);

  function getFormData() {
    const formData = new FormData(formRef.current!);
    const note = formData.get("note") as string;
    const selectedRegions = [
      ...formRef.current!.querySelectorAll('button[data-state="on"]'),
    ].map((element) => element.textContent!);
    return { note, selectedRegions };
  }

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
            <Button
              variant="secondary"
              onClick={() => {
                const { note, selectedRegions } = getFormData();
                saveWord(word, { note, selectedRegions, isArchived: true });
                onRequestClose();
              }}
            >
              Archive
            </Button>
            <Button
              onClick={() => {
                const { note, selectedRegions } = getFormData();
                saveWord(word, { note, selectedRegions, isArchived: false });
                onRequestClose();
              }}
            >
              Confirm
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
