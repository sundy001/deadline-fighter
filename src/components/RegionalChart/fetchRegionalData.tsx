"use server";

const Cookie = "dwds_session=d03d94dadd43fe301d9f2ecd6644b497077e1dca";

type YearMap = Record<number, { raw: number; val: number }>;

type RegionMap = Record<string, YearMap>;

type RegionalData = {
  data: [RegionMap];
};

export async function getRegionalData(word: string) {
  const response = await fetch(
    `https://www.dwds.de/r/plot/plot?q1=${word}&corpus=regional&view=2&q2=&q3=&q4=&genres=1&norm=abs&smooth=line&slice=1&window=0&wbase=0&genres=1&xrange=1993%3A2024&prune=0`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en,zh-TW;q=0.9,zh;q=0.8",
        Cookie,
      },
      method: "GET",
    }
  );

  if (response.status !== 200) {
    throw new Error("fail to fetch");
  }

  const {
    data: [data],
  } = (await response.json()) as RegionalData;

  const chartData: Record<string, number>[] = [];
  for (const [region] of Object.entries(data)) {
    for (const [year, { raw }] of Object.entries(data[region])) {
      const yearData = chartData.find((d) => d.year === parseInt(year));
      if (yearData) {
        yearData[region] = raw;
      } else {
        chartData.push({
          year: parseInt(year),
          [region]: raw,
        });
      }
    }
  }

  return chartData;
}
