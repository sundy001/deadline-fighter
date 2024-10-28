"use server";
import { REGION } from "@/data";
import { parse } from "node-html-parser";

export async function getRegionalMap(word: string) {
  const response = await fetch(
    `https://www.dwds.de/r/svg/thumbnail/?corpus=regional&q=${word}&what=areale&mode=map`
  );

  if (response.status !== 200) {
    throw new Error("fail to fetch");
  }

  const svgText = await response.text();
  const parsed = parse(svgText);
  parsed
    .querySelectorAll(
      "#query,#source,#date,#scale,#credits\\.rede,#credits\\.lameli,#credits\\.bfs"
    )
    .forEach((el) => el.remove());

  REGION.forEach(({ svgId, color }) => {
    parsed
      .querySelectorAll(`#${svgId} rect`)
      .forEach((el) => el.setAttribute("fill", color));
  });

  return parsed.innerHTML;
}
