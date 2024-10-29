"use client";
import { type Word } from "@/scanner";
import { ArchiveButton } from "@/components/ArchiveButton";
import { cn } from "@/utils";
import { useMemo, useRef, useState } from "react";
import { useWordFormStore } from "@/features/wordFormData";
import { TabBar } from "@/components/TabBar";
import { WordDialog } from "@/components/WordDialog";
import { RegionBadge } from "./RegionBadge";
import { StatusBadge } from "./StatusBadge";

type Props = {
  className?: string;
  bookName: string;
  sectionName: string;
  words: Word[];
};

enum WordStatus {
  Unprocessed = "Unprocessed",
  Labeled = "Labeled",
  Archived = "Archived",
}

type WordWithStatus = Word & { status: WordStatus };

export function WordList({ className, bookName, sectionName, words }: Props) {
  const wordForm = useWordFormStore();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedWord, setSelectedWord] = useState<WordWithStatus>();
  const savedWordsRef = useRef<WordWithStatus[] | undefined>();
  const selectedWordIndex = savedWordsRef?.current?.indexOf(selectedWord!)!;

  const wordsWithStatus: WordWithStatus[] = useMemo(
    () =>
      words.map((word) => {
        let status: WordStatus;
        if (wordForm[word.word]?.isArchived) {
          status = WordStatus.Archived;
        } else if (wordForm[word.word]?.selectedRegions.length > 0) {
          status = WordStatus.Labeled;
        } else {
          status = WordStatus.Unprocessed;
        }
        return { ...word, status };
      }),
    [wordForm]
  );

  const filteredWords = useMemo(
    () =>
      wordsWithStatus.filter(
        (word) => activeTab === "All" || word.status === activeTab
      ),
    [activeTab, wordsWithStatus]
  );

  return (
    <>
      <TabBar
        className="mb-4  grid-cols-4"
        items={["All", "Unprocessed", "Labeled", "Archived"]}
        value={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
        }}
      />
      <table
        className={cn(
          "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
          className
        )}
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-9">
            <th scope="col" className="px-6 py-1">
              Word
            </th>
            {activeTab === "All" && (
              <th scope="col" className="px-6 py-1">
                Status
              </th>
            )}
            {activeTab === "Labeled" && (
              <th scope="col" className="px-6 py-1">
                Region
              </th>
            )}
            <th scope="col" className="px-6 py-1">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((word, index) => {
            return (
              <tr
                key={word.word}
                className="odd:bg-white odd:dark:bg-gray-900 hover:bg-gray-50 border-b dark:border-gray-700"
              >
                <td
                  className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${word.word}`}
                  onClick={() => {
                    setSelectedWord(word);
                    savedWordsRef.current = filteredWords;
                  }}
                >
                  {word.word}
                </td>
                {activeTab === "All" && (
                  <td className="px-6 py-1 w-20">
                    <StatusBadge status={word.status} />
                  </td>
                )}
                {activeTab === "Labeled" && (
                  <td className="px-6 py-1">
                    <div className="flex gap-2 items-center">
                      {wordForm[word.word]?.selectedRegions.map((region) => (
                        <RegionBadge key={region} regionId={region} />
                      ))}
                    </div>
                  </td>
                )}
                <td className="px-6 py-1 w-36">
                  <ArchiveButton word={word.word} variant="ghost" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedWord && (
        <WordDialog
          atlasResult={selectedWord.atlasResults}
          bookName={bookName}
          sectionName={sectionName}
          word={selectedWord.word}
          nextWord={() => {
            const nextWord = savedWordsRef.current?.[selectedWordIndex + 1];
            if (nextWord) {
              setSelectedWord(nextWord);
            }
          }}
          previousWord={() => {
            const previousWord = savedWordsRef.current?.[selectedWordIndex - 1];
            if (previousWord) {
              setSelectedWord(previousWord);
            }
          }}
          onRequestClose={() => {
            setSelectedWord(undefined);
          }}
        />
      )}
    </>
  );
}
