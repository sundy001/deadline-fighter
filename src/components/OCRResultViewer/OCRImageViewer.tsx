import { type WordOverlay } from "@/scanner";
import Image from "next/image";

export type Props = {
  name: string;
  wordOverlays: WordOverlay[];
};

const IMAGE_WIDTH = 3024;
const IMAGE_HEIGHT = 4032;

export function OCRImageViewer({ name, wordOverlays }: Props) {
  return (
    <div>
      <div className="w-full relative aspect-[3024/4032]">
        <Image
          alt="OCR result"
          width={3024}
          height={4032}
          src={`/${name}.jpg`}
        />
        {wordOverlays.map(({ Left, Top, Height, Width }) => (
          <div
            key={`${Left}-${Top}`}
            className="bg-yellow-300 bg-opacity-50"
            style={{
              position: "absolute",
              left: `${(Left / IMAGE_WIDTH) * 100}%`,
              top: `${(Top / IMAGE_HEIGHT) * 100}%`,
              width: `${(Width / IMAGE_WIDTH) * 100}%`,
              height: `${(Height / IMAGE_HEIGHT) * 100}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
