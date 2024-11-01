import { atlasTexts } from "./atlasData";
import type { AtlasResult } from "./types";

export function searchText(word: string) {
  const result: AtlasResult[] = [];
  atlasTexts.forEach((line, lineIndex) => {
    const index = line.indexOf(word);
    if (index !== -1) {
      const lineTokens = line.split(" ");
      const wordIndex = lineTokens.findIndex((token) => token === word);

      result.push({
        line,
        index: lineIndex,
        matchLevel: wordIndex === -1 ? 1 : 0,
      });
    }
  });

  return result;
}
