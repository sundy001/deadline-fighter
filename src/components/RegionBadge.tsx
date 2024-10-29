import { Badge } from "@/components/ui/badge";
import { REGION } from "@/data";

type Props = {
  regionId: string;
};

[
  "bg-[var(--region-1)]",
  "bg-[var(--region-2)]",
  "bg-[var(--region-3)]",
  "bg-[var(--region-4)]",
  "bg-[var(--region-5)]",
  "bg-[var(--region-6)]",
  "bg-[var(--region-7)]",
  "bg-[var(--region-8)]",
];

export function RegionBadge({ regionId }: Props) {
  const region = REGION.find(({ id }) => id === regionId);
  return <Badge className={`bg-[${region?.color}]`}>{regionId}</Badge>;
}
