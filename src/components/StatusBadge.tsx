import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";

const STATUS_CLASS_MAP: Record<string, string> = {
  Unprocessed: "bg-gray-500",
  Labeled: "bg-green-500",
  Archived: "bg-red-500",
};

type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  return (
    <Badge className={cn("text-white", STATUS_CLASS_MAP[status])}>
      {status}
    </Badge>
  );
}
