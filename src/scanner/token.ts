import stopwords from "stopwords-de";
import { filterSet } from "./filterSet";

const stopwordsSet = new Set(stopwords);

export function tokenizeText(text: string): string[] {
  const validWordRegex = /^[A-Za-zÄÖÜäöüß]{2,}$/;
  return text
    .split(/[\n ]/)
    .map((token) => token.replaceAll(/[,\(\)\!\.]/gi, ""))
    .filter(
      (token) =>
        validWordRegex.test(token) &&
        !stopwordsSet.has(token) &&
        !filterSet.has(token.toLowerCase())
    );
}
