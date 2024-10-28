"use client";
import { type Word } from "@/scanner";
import { ArchiveButton } from "@/components/ArchiveButton";
import { WordButton } from "./WordDialog/WordButton";
import { cn } from "@/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { loadWord } from "@/features/localStorage";

type Props = {
  className?: string;
  bookName: string;
  sectionName: string;
  words: Word[];
};

export function WordList({ className, bookName, sectionName, words }: Props) {
  const [isArchive, setIsArchive] = useState(false);
  const [, seRefresh] = useState({});
  const refresh = () => seRefresh({});

  const filteredWords = words.filter(
    ({ word }) => loadWord(word)?.isArchived === isArchive
  );
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="is-archive"
          checked={isArchive}
          onCheckedChange={(value) => {
            setIsArchive(value);
          }}
        />
        <Label htmlFor="is-archive">Active / Archive</Label>
      </div>
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
            <th scope="col" className="px-6 py-1">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredWords.map(({ word, atlasResults }) => (
            <tr
              key={word}
              className="odd:bg-white odd:dark:bg-gray-900 hover:bg-gray-50 border-b dark:border-gray-700"
            >
              <td className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {word}
              </td>
              <td className="px-6 py-1">
                <WordButton
                  atlasResult={atlasResults}
                  bookName={bookName}
                  sectionName={sectionName}
                  word={word}
                  refresh={refresh}
                  nextWord={() => {}}
                  previousWord={() => {}}
                />
                <ArchiveButton word={word} variant="ghost" refresh={refresh} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
