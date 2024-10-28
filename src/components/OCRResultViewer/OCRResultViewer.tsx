import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type PageReport, WordOverlay } from "@/scanner";
import { OCRImageViewer } from "./OCRImageViewer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

type Props = {
  bookName: string;
  sectionName: string;
  pages: PageReport[];
  word?: string;
};

export function OCRResultViewer({ bookName, sectionName, pages, word }: Props) {
  const cleanupPages = pages.map(({ name, overlay }) => {
    const wordOverlays: WordOverlay[] = [];
    for (const line of overlay.Lines) {
      for (const wordOverlay of line.Words) {
        if (wordOverlay.WordText === word) {
          wordOverlays.push(wordOverlay);
        }
      }
    }

    return {
      name,
      wordOverlays,
    };
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {cleanupPages.map(({ name, wordOverlays }, index) => (
            <CarouselItem key={index}>
              <div className="h-[calc(100svh-20rem)] overflow-auto">
                <OCRImageViewer name={name} wordOverlays={wordOverlays} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-4 mt-4">
        {cleanupPages.map(({ name, wordOverlays }, index) => (
          <Button
            key={name}
            variant="ghost"
            className={cn("w-32 relative  h-auto", {
              "bg-gray-200": index === current,
            })}
            onClick={() => {
              api?.scrollTo(index);
            }}
          >
            <Image
              key={name}
              alt={`${name} preview`}
              width={3024}
              height={4032}
              src={`/jpg/${bookName}/${sectionName}/${name}.jpg`}
            />
            <Badge className="absolute bottom-1 right-1">
              {wordOverlays.length}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
