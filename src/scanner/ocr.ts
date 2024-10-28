import { ocrSpace, type OcrSpaceResponse } from "ocr-space-api-wrapper";
import {
  access,
  writeFile,
  readFile,
  constants,
  mkdir,
} from "node:fs/promises";
import { CACHE_PATH, OCR_SPACE_API_KEY } from "./constants";
import { join } from "path";

const cachePath = join(CACHE_PATH, "ocr-result.json");
type OCRCache = Record<string, OcrSpaceResponse>;
let cachedOCRResult: OCRCache;

async function initOCRCache() {
  if (cachedOCRResult) {
    return;
  }

  try {
    await access(CACHE_PATH, constants.R_OK | constants.W_OK);
  } catch (error) {
    await mkdir(CACHE_PATH);
  }

  try {
    const text = await readFile(cachePath, "utf-8");
    cachedOCRResult = JSON.parse(text) as OCRCache;
  } catch (error) {
    await writeFile(cachePath, "{}");
    cachedOCRResult = {};
  }
}

async function saveOCRCache(path: string, value: OcrSpaceResponse) {
  if (cachedOCRResult[path]) {
    return;
  }

  try {
    cachedOCRResult[path] = value;
    await writeFile(cachePath, JSON.stringify(cachedOCRResult));
  } catch (error) {
    console.debug(error);
  }
}

export async function fetchOCRResult(path: string) {
  const payload = await ocrSpace(path, {
    ocrUrl: "https://apipro1.ocr.space/parse/image",
    apiKey: OCR_SPACE_API_KEY,
    language: "ger",
    filetype: "jpg",
    OCREngine: "2",
    scale: true,
    detectOrientation: false,
    isTable: false,
    isOverlayRequired: true,
    isCreateSearchablePdf: false,
    isSearchablePdfHideTextLayer: false,
  });

  const { OCRExitCode, ErrorMessage } = payload;

  if (OCRExitCode !== 1) {
    throw new Error(ErrorMessage);
  }
  return payload;
}

export async function parseImageByOCR(path: string) {
  await initOCRCache();

  let result = cachedOCRResult[path];
  if (result === undefined) {
    result = await fetchOCRResult(path);
    await saveOCRCache(path, result);
  }

  return {
    text: result.ParsedResults[0].ParsedText,
    overlay: result.ParsedResults[0].TextOverlay,
  };
}
