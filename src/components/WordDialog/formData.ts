import { loadWord, saveWord } from "@/features/localStorage";

export function getFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  const note = formData.get("note") as string;
  const selectedRegions = [
    ...form.querySelectorAll('button[data-state="on"]'),
  ].map((element) => element.textContent!);
  return { note, selectedRegions };
}

export function saveFormData(form: HTMLFormElement, word: string) {
  const { note, selectedRegions } = getFormData(form);
  const wordFormData = loadWord(word);
  saveWord(word, { ...wordFormData, note, selectedRegions });
}
