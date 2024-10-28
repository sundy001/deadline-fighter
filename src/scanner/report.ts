import { readFile } from "fs/promises";
import { join } from "path";
import { Report } from "./types";

let report: Report | undefined;
export async function clearCache() {
  report = undefined;
}

export async function loadReport() {
  if (report) {
    return report;
  }
  try {
    const reportText = await readFile(
      join(process.cwd(), "report.json"),
      "utf8"
    );
    report = JSON.parse(reportText) as Report;
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      throw new Error(error);
    }

    report = { books: [], words: {} };
  }
  return report;
}

export async function loadBooks() {
  const report = await loadReport();
  return report.books;
}

export async function loadBook(bookName: string) {
  const report = await loadReport();
  return report.books.find(({ name }) => name === bookName);
}

export async function loadSection(bookName: string, sectionName: string) {
  const book = await loadBook(bookName);
  if (!book) {
    return undefined;
  }

  return book.sections.find(({ name }) => name === sectionName);
}

export async function loadPage(
  bookName: string,
  sectionName: string,
  pageName: string
) {
  const section = await loadSection(bookName, sectionName);
  if (!section) {
    return undefined;
  }

  return section.pages.find(({ name }) => name === pageName);
}

export async function loadWords(bookName: string, sectionName: string) {
  const report = await loadReport();
  return Object.values(report.words).filter(({ from }) =>
    from.some(
      ({ book, section }) => book === bookName && section === sectionName
    )
  );
}

export async function loadWord(word: string) {
  const report = await loadReport();
  return report.words[word];
}
