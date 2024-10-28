import { loadReport } from "@/scanner";
import { BookSideBar } from "./BookSidebar";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ bookName: string }>;
  children: ReactNode;
};

export default async function BookLayout({ children, params }: Props) {
  const { bookName: encodedBookName } = await params;
  const bookName = decodeURIComponent(encodedBookName);

  const report = await loadReport();
  const book = report.books.find(({ name }) => name === bookName);
  if (book === undefined) {
    notFound();
  }

  const sections = book.sections.map(({ name }) => name);

  return (
    <div className="flex">
      <BookSideBar name={bookName} sections={sections} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
