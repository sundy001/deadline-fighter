"use server";

import { searchText } from "./atlas";
import {
  getAllFilesInSection,
  HEIC2JPG,
  getAllBookNames,
  getAllSectionNames,
} from "./files";
import { parseImageByOCR } from "./ocr";
import { tokenizeText } from "./token";
import { writeFile } from "node:fs/promises";
import type { BookReport, From, Report, SectionReport, Word } from "./types";
import { REPORT_PATH } from "./constants";
import { clearCache } from "./report";

export async function generateReport() {
  const wordsMap = new Map<string, { word: string; from: Set<string> }>();
  const books: BookReport[] = [];

  const bookNames = await getAllBookNames();
  for (const bookName of bookNames) {
    const bookReport: BookReport = { name: bookName, sections: [] };
    const sectionNames = await getAllSectionNames(bookName);

    // section
    for (const sectionName of sectionNames) {
      const sectionReport: SectionReport = {
        name: sectionName,
        pages: [],
      };

      const files = await getAllFilesInSection(bookName, sectionName);

      // file
      for (const { name: pageName, path: pagePath } of files) {
        try {
          const jpgPath = await HEIC2JPG(pagePath);
          const { text, overlay } = await parseImageByOCR(jpgPath);

          // push page report to section report
          sectionReport.pages.push({
            name: pageName,
            overlay,
          });

          tokenizeText(text).forEach((word) => {
            const fromKey = JSON.stringify({
              book: bookName,
              section: sectionName,
              page: pageName,
            });

            if (wordsMap.has(word)) {
              const context = wordsMap.get(word)!;
              if (!context?.from.has(fromKey)) {
                context?.from.add(fromKey);
              }
            } else {
              wordsMap.set(word, {
                word,
                from: new Set([fromKey]),
              });
            }
          });
        } catch (error) {
          console.error(error);
        }
      }

      bookReport.sections.push(sectionReport);
    }

    books.push(bookReport);
  }

  const words: Record<string, Word> = {};

  [...wordsMap.values()].forEach(({ word, from }) => {
    const atlasResults = searchText(word);

    if (atlasResults.length > 0) {
      words[word] = {
        word,
        from: [...from.values()].map((key) => JSON.parse(key) as From),
        atlasResults,
      };
    }
  });

  const report: Report = { books, words };

  await writeFile(REPORT_PATH, JSON.stringify(report));
  clearCache();

  return {
    numberOfBooks: report.books.length,
    numberOfWords: Object.keys(words).length,
  };
}
