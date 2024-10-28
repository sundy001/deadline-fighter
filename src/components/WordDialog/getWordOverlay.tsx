"use server";
import { loadPage, loadWord } from "@/scanner";
import { notFound } from "next/navigation";

export const getWordOverlay = async (
  word: string,
  bookName: string,
  sectionName: string
) => {
  const wordObject = await loadWord(word);
  if (wordObject === undefined) {
    notFound();
  }

  const references = wordObject.from.filter(
    ({ book, section }) => book === bookName && section === sectionName
  );

  if (references.length === 0) {
    notFound();
  }

  const pages = [];
  for (const { book, section, page } of references) {
    const pageObject = await loadPage(book, section, page);
    if (pageObject === undefined) {
      notFound();
    }
    pages.push(pageObject);
  }

  return pages;
};
