import { cn } from "@/utils";
import { default as NextLink } from "next/link";
import { ComponentProps } from "react";

type NextLinkProps = ComponentProps<typeof NextLink>;
type Props = {
  className?: string;
} & NextLinkProps;

export function Link({ className, children, ...rest }: Props) {
  return (
    <NextLink
      className={cn("transition-colors hover:text-primary", className)}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
