import {
  access,
  constants,
  mkdir,
  readdir,
  readFile,
  stat,
  writeFile,
} from "node:fs/promises";
import convert from "heic-convert";
import { join, parse, sep } from "path";
import { HEIC_PATH } from "./constants";

async function getPath(filePath: string) {
  const { name, dir } = parse(filePath);
  const dirTokens = dir.split(sep);
  const length = dirTokens.length;
  const jpgTokens = [
    "public",
    "jpg",
    dirTokens[length - 2],
    dirTokens[length - 1],
  ];
  const sectionDir = join(...jpgTokens);

  return {
    sectionDir,
    jpgPath: join(sectionDir, `${name}.jpg`),
  };
}

export async function HEIC2JPG(filePath: string): Promise<string> {
  const { sectionDir, jpgPath } = await getPath(filePath);

  // create directory if it doesn't exist
  try {
    await access(sectionDir, constants.R_OK);
  } catch (error) {
    await mkdir(sectionDir, { recursive: true });
  }

  // check if jpg file already exists, otherwise convert HEIC to JPG
  try {
    await access(jpgPath, constants.R_OK);
    return jpgPath;
  } catch (error) {
    const inputBuffer = await readFile(filePath);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: "JPEG", // output format
      quality: 0.1, // the jpeg compression quality, between 0 and 1
    });

    // write jpg file to file system for debugging purposes
    writeFile(jpgPath, outputBuffer);

    return jpgPath;
  }
}

export async function getAllDirs(path: string) {
  const dirs = [];

  const fileList = await readdir(path);
  for (const file of fileList) {
    const filePath = join(path, file);
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      dirs.push(file);
    }
  }

  return dirs;
}

export async function getAllBookNames() {
  return getAllDirs(HEIC_PATH);
}

export async function getAllSectionNames(bookName: string) {
  return getAllDirs(join(HEIC_PATH, bookName));
}

export async function getAllFilesInSection(bookName: string, pageName: string) {
  const path = join(HEIC_PATH, bookName, pageName);
  const files = [];
  const fileList = await readdir(path);
  for (const file of fileList) {
    const filePath = join(path, file);

    // only process HEIC files
    const { name, ext } = parse(filePath);
    const stats = await stat(filePath);
    if (stats.isFile() && ext === ".HEIC") {
      files.push({ name, path: filePath });
    } else {
      console.warn(`Skipping ${filePath}`);
    }
  }

  return files;
}
