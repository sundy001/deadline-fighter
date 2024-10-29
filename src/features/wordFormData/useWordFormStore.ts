import { useSyncExternalStore } from "react";
import {
  StorageData,
  WordFormData,
  getSnapshot,
  subscribe,
} from "./localStorage";

export function useWordFormStore(): StorageData;
export function useWordFormStore(word: string): WordFormData;
export function useWordFormStore(word?: string) {
  const wordForm = useSyncExternalStore(subscribe, getSnapshot);
  if (!word) {
    return wordForm;
  } else {
    return (
      wordForm?.[word] ?? { note: "", selectedRegions: [], isArchived: false }
    );
  }
}
