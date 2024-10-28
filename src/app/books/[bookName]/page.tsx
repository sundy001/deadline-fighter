import { loadBook } from "@/scanner";
import { notFound } from "next/navigation";
import { BookBreadcrumb } from "./BookBreadcrumb";

type Props = {
  params: { bookName: string };
};

export default async function BookDetailPage({ params }: Props) {
  const { bookName: encodedBookName } = await params;
  const bookName = decodeURIComponent(encodedBookName);

  const book = await loadBook(bookName);
  if (book === undefined) {
    notFound();
  }
  const { name } = book;

  return (
    <div className="p-4">
      <BookBreadcrumb bookName={name} />
    </div>
  );
}
