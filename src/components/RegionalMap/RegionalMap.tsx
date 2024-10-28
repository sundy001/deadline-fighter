"use client";
import { useEffect, useRef, useState } from "react";
import { getRegionalMap } from "./getRegionalMap";
import { Skeleton } from "@/components/ui/skeleton";
import { REGION } from "@/data";

type Props = {
  className?: string;
  word: string;
  highlight?: string;
};

export function RegionalMap({ className, word, highlight }: Props) {
  const [svg, setSvg] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const mapSVG = await getRegionalMap(word);
      setSvg(mapSVG);
    })();
  }, [word]);

  useEffect(() => {
    REGION.forEach(({ id, svgId }) => {
      const rectElement = mapRef.current?.querySelector(`#${svgId} rect`);
      if (!highlight || (highlight && id === highlight)) {
        rectElement?.setAttribute("fill-opacity", "0.8");
        rectElement?.setAttribute("stroke-opacity", "0.8");
      } else {
        rectElement?.setAttribute("fill-opacity", "0.2");
        rectElement?.setAttribute("stroke-opacity", "0.2");
      }
    });
  }, [highlight]);

  return (
    <div className={className}>
      {svg === null ? (
        <Skeleton className="object-contain object-center aspect-[257/354]" />
      ) : (
        <div
          className="object-contain object-center aspect-[257/354]"
          ref={mapRef}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
