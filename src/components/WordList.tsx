import { type Word } from "@/scanner";
import { ArchiveButton } from "./ArchiveButton";
import { WordButton } from "./WordDialog/WordButton";
import { cn } from "@/utils";

type Props = {
  className?: string;
  bookName: string;
  sectionName: string;
  words: Word[];
};

export function WordList({ className, bookName, sectionName, words }: Props) {
  return (
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
        {words.map(({ word, atlasResults }) => (
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
              />
              <ArchiveButton word={word} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
