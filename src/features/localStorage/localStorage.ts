"use client";
import { compress, decompress } from "lz-string";

export type WordFormData = {
  note: string;
  selectedRegions: string[];
  isArchived: boolean;
};

type StorageData = Record<string, WordFormData>;

const STORAGE_KEY = "words";

let dataCache: StorageData | undefined;
export function loadWords() {
  if (dataCache) {
    return dataCache;
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (data === null) {
    dataCache = {};
  } else {
    try {
      dataCache = JSON.parse(decompress(data)) as StorageData;
    } catch (e) {
      console.error(e);
      dataCache = {};
    }
  }

  return dataCache;
}

export function loadWord(word: string) {
  return (
    loadWords()?.[word] ?? { note: "", selectedRegions: [], isArchived: false }
  );
}

export function saveWord(word: string, data: WordFormData) {
  const words = loadWords();
  words[word] = data;

  localStorage.setItem(STORAGE_KEY, compress(JSON.stringify(words)));
}

export function archiveWord(word: string) {
  const words = loadWords();
  if (words[word]) {
    words[word].isArchived = true;
  } else {
    words[word] = { note: "", selectedRegions: [], isArchived: true };
  }

  localStorage.setItem(STORAGE_KEY, compress(JSON.stringify(words)));
}
