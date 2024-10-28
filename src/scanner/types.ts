export type AtlasResult = {
  line: string;
  matchLevel: number; // 0: exact match, 1: fuzzy match
};

export type From = {
  book: string;
  section: string;
  page: string;
};

export type Word = {
  word: string;
  atlasResults: AtlasResult[];
  from: From[];
};

export type WordOverlay = {
  WordText: string;
  Left: number;
  Top: number;
  Height: number;
  Width: number;
};

export type TextOverlay = {
  Lines: { Words: WordOverlay[]; maxHeight: number; minTop: number }[];
  HasOverlay: boolean;
  Message: string;
};

export type PageReport = {
  name: string;
  overlay: TextOverlay;
};

export type SectionReport = {
  name: string;
  pages: PageReport[];
};

export type BookReport = {
  name: string;
  sections: SectionReport[];
};

export type Report = {
  books: BookReport[];
  words: Record<string, Word>;
};
