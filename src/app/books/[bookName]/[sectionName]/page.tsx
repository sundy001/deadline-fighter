import { loadSection, loadWords } from "@/scanner";
import { notFound } from "next/navigation";
import { BookBreadcrumb } from "../BookBreadcrumb";
import { WordList } from "@/components/WordList";

type Props = {
  params: Promise<{ bookName: string; sectionName: string }>;
};

export default async function SectionPage({ params }: Props) {
  const { bookName: encodedBookName, sectionName: encodedSectionName } =
    await params;
  const sectionName = decodeURIComponent(encodedSectionName);
  const bookName = decodeURIComponent(encodedBookName);
  const section = loadSection(bookName, sectionName);
  if (section === undefined) {
    notFound();
  }

  const words = await loadWords(bookName, sectionName);

  return (
    <div className="p-4">
      <BookBreadcrumb bookName={bookName} sectionName={sectionName} />
      <WordList
        className="mt-4"
        words={words}
        bookName={bookName}
        sectionName={sectionName}
      />
    </div>
  );
}
