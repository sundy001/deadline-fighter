"use server";
import { parse } from "node-html-parser";

export const getAtlasHTML = async (url: string) => {
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);
  return root.querySelector(".entry-content")?.innerHTML;
};
