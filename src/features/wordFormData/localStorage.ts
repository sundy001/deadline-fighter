"use client";
import { compress, decompress } from "lz-string";

export type WordFormData = {
  note: string;
  selectedRegions: string[];
  isArchived: boolean;
};

export type StorageData = Record<string, WordFormData>;

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
  save(words);
}

export function setIsArchive(word: string, value: boolean) {
  const words = loadWords();
  if (words[word]) {
    words[word].isArchived = value;
  } else {
    words[word] = { note: "", selectedRegions: [], isArchived: value };
  }

  save(words);
}

type Listener = () => void;
let listeners: Listener[] = [];
export function subscribe(listener: Listener) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getSnapshot() {
  return loadWords();
}

function save(data: StorageData) {
  localStorage.setItem(STORAGE_KEY, compress(JSON.stringify(data)));
  dataCache = { ...data };
  emitChange();
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
