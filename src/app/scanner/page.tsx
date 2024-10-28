"use client";

import { Button } from "@/components/ui/button";
import { generateReport } from "@/scanner/generateReport";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export default function ScanPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  return (
    <div className="px-3 py-4">
      <Button
        disabled={isLoading}
        onClick={async () => {
          try {
            setIsLoading(true);
            const { numberOfBooks, numberOfWords } = await generateReport();
            setMessage(
              `Scan completed. Found ${numberOfBooks} books and ${numberOfWords} words.`
            );
          } catch (error) {
            setMessage("Error: " + error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {isLoading && <LoaderIcon className="animate-spin h-5 w-5" />}
        Scan Image
      </Button>
      <div className="mt-4">{message}</div>
    </div>
  );
}
